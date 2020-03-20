import nodemailer, { SendMailOptions } from 'nodemailer'

import mailConfig from '../config/mail'

class Mail {
  public transporter = nodemailer;

  constructor () {
    const { host, port, secure, auth } = mailConfig

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null
    })
  }

  async sendMail (message: SendMailOptions): Promise<void> {
    return this.sendMail({
      ...mailConfig.default,
      ...message
    })
  }
}

export default new Mail()
