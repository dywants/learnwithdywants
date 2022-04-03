/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('pages/home')

Route.get('users/:id/verification', 'AuthController.validateUser')
Route.get('login', 'AuthController.showLoginForm')
Route.post('login', 'AuthController.login')
Route.delete('logout', 'AuthController.logout')
Route.get('register', 'AuthController.showRegisterForm')
Route.post('register', 'AuthController.register')

Route.get('oauth/:provider/redirect', 'SocialAuthsController.redirect').where('provider', /github/)
Route.get('oauth/:provider/callback', 'SocialAuthsController.callback').where('provider', /github/)