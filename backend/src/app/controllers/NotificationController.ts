import { Request, Response } from 'express'

import Notification from '../schemas/Notification'

class NotificationController {
  async index (req: Request, res: Response): Promise<Response> {
    const notifications = await Notification.find({
      user: req.userId
    }).sort({ createdAt: 'desc' })
      .limit(20)

    return res.json({ notifications: notifications })
  }

  async update (req: Request, res: Response): Promise<Response> {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true, new: true })

    return res.json({ updatedNotification: notification })
  }
}

export default new NotificationController()
