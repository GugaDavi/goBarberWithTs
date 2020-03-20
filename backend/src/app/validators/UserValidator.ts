import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import User from '../models/User'
import { UserSchema } from './types'
import { errorMonitor } from 'events'

class UserValidator {
  public async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<UserSchema> = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().required('Password is required').min(6),
      confirm_password: Yup.string()
        .when('password',
          (password: string, field: Yup.StringSchema) => password && field.required('Confirm Password is Required'))
        .oneOf([Yup.ref('password')], 'Password and Confirm Password not matchs')
    })

    try {
      await schema.validate(req.body)

      return next()
    } catch (e) {
      const error = e as Yup.ValidationError
      return res.status(400).json({ validationError: error.message })
    }
  }

  public async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<UserSchema> = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword: string, field: Yup.StringSchema) =>
        oldPassword ? field.required('oldPassword is Required') : field
      ),
      confirmPassword: Yup.string().when('password', (password: string, field: Yup.StringSchema) =>
        password
          ? field.required('confirmPassword is required')
            .oneOf([Yup.ref('password')], 'password and confirmPassword not matchs')
          : field
      )
    })

    try {
      await schema.validate(req.body)
      return next()
    } catch (e) {
      const error = e as Yup.ValidationError
      return res.status(404).json({ validationError: error.message })
    }
  }
}

export default new UserValidator()
