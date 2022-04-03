/* eslint-disable prettier/prettier */
import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from "App/Validators/RegisterValidator";
import Route from '@ioc:Adonis/Core/Route';
import EmailValidation from 'App/Mailers/EmailValidation';
import { UserStatus } from 'App/Enums/UserStatus';

export default class AuthController {
  /**
   *
   * @param view
   */
  public showLoginForm({view}: HttpContextContract) {
    return view.render('auth/login')
  }

  /**
   *
   * @param auth
   * @param request
   * @param response
   */
  public async login({auth, request, response}: HttpContextContract) {
    const {email, password} = request.only(['email', 'password'])

    await auth.attempt(email, password)
    return response.redirect().toRoute('/')

  }

  /**
   *
   * @param view
   */
  public showRegisterForm({view}: HttpContextContract) {
    return view.render('auth/register')
  }

  /**
   *
   * @param auth
   * @param request
   * @param response
   */
  public async register({auth, request, response}: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)
    await auth.login(user)

const url = Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: user.id,
      },
      { expiresIn: '1h' }
    )

    new EmailValidation(user, `${Env.get('APP_URL')}${url}`).sendLater()
    return response.redirect().toRoute('/')
  }

  /**
   *
   * @param auth
   * @param response
   */
  public async logout({auth, response}: HttpContextContract) {
    await auth.logout()

    return response.redirect().toRoute('/')
  }

  /**
   *
   * @param auth
   * @param params
   * @param request
   * @param response
   * @param session
   */
  public async validateUser({ auth, params, request, response, session }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('error', `Ce lien n'est pas valide`)
      return response.redirect().toPath('/')
    }

    const id = params.id
    const user = await User.findOrFail(id)
    user.status = UserStatus.Active
    await user.save()
    await auth.login(user)

    return response.redirect('/')
  }
}
