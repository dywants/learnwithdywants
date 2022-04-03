import mjml from 'mjml'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import View from '@ioc:Adonis/Core/View'

export default class EmailValidation extends BaseMailer {
  /**
   * @param user
   * @param url
   */
  constructor(private user: User, private url: string) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "EmailValidation.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    const html = mjml(
      await View.render('emails.emailValidation', { user: this.user, url: this.url })
    ).html

    message
      .subject('[learnwithdywants.com] Validation de votre compte')
      .from('no-reply@learnwithdywants.com')
      .to(this.user.email)
      .html(html)
  }
}
