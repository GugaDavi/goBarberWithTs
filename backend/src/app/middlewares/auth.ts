// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded: DecodedInterface = jwt.verify(token, authConfig.secret) as DecodedInterface

    req.userId = decoded.id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token Invalid' })
  }
}

interface DecodedInterface {
  id: number;
  name: string;
  email: string;
}
