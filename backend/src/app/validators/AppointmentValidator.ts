import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { AppointmentSchema } from './types'

class AppointmentValidator {
  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<AppointmentSchema> = Yup.object().shape({
      date: Yup.date().required('Date field is Required'),
      provider_id: Yup.number().required('Provider is Required')
    })

    try {
      await schema.validate(req.body)

      return next()
    } catch (e) {
      const error = e as Yup.ValidationError
      return res.status(400).json({
        validationError: error.message
      })
    }
  }
}

export default new AppointmentValidator()
