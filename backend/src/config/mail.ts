interface IMail {
  host: string
  port: number
  secure: false
  auth: IAuthMail
  default: IDefaultMail
}

interface IAuthMail {
  user: string
  pass: string
}

interface IDefaultMail {
  from: string
}

const mailConfig: IMail = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'b90c0f0709343a',
    pass: 'f946c4cca0f6e6'
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>'
  }
}

export default mailConfig
