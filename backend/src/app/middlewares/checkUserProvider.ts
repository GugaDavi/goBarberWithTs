import { Request, Response, NextFunction } from 'express'

import User from '../models/User'

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const isProvider = await User.findOne({
    where: {
      id: req.userId,
      provider: true
    }
  })

  if (!isProvider) {
    return res.status(401).json({ error: 'User is not a provider' })
  }

  return next()
}
