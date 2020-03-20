import { Request, Response } from 'express'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'

import User from '../models/User'
import Appointment from '../models/Appointment'
import File from '../models/File'
import Notification from '../schemas/Notification'

import Mail from '../../lib/Mail'
import { model } from 'mongoose'

class AppointmentController {
  async index (req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null
      },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date'],
      order: ['date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url']
            }
          ]
        }
      ]
    })

    return res.json({ appointments: appointments })
  }

  async store (req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body

    if (provider_id === req.userId) {
      return res.status(400).json({ error: 'You can not make appointment with your self' })
    }

    const providerExist = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    })

    // Check if there is a provider and if it is really a provider

    if (!providerExist) {
      return res.status(401).json({ error: 'Sended provider not is provider' })
    }

    // Check for past dates

    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' })
    }

    // Check for availability

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    })

    if (checkAvailability) {
      return res.status(400).json({ error: 'Appointment date is not available' })
    }

    const user = await User.findByPk(req.userId)
    const formatedDate = format(hourStart, "MMMM dd 'at' HH'h'")

    await Notification.create({
      content: `New appointment for ${user?.name} for ${formatedDate}`,
      user: provider_id
    })

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart
    })
    return res.json({ createdAppointment: appointment })
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        }
      ]
    })

    if (appointment?.user_id !== req.userId) {
      return res.status(401).json({ error: 'You do not have permission to cancel this appointment' })
    }

    const dateRange = subHours(appointment.date, 2)

    if (isBefore(dateRange, new Date())) {
      return res.status(401).json({ error: 'You can only cancel appointments 2 hours in advence' })
    }

    appointment.canceled_at = new Date()

    await appointment.save()

    return res.json({ canceledAppointment: appointment })
  }
}

export default new AppointmentController()
