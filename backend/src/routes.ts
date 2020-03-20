import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

// Controllers

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import ProviderController from './app/controllers/ProviderController'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'
import NotificationSchema from './app/controllers/NotificationController'

// Middlewares

import AuthMiddleware from './app/middlewares/auth'
import CheckUserProvider from './app/middlewares/checkUserProvider'

// Validators

import UserValidator from './app/validators/UserValidator'
import AppointmentValidator from './app/validators/AppointmentValidator'

const routes = Router()
const upload = multer(multerConfig)

routes.post('/sessions', SessionController.store)
routes.post('/users', UserValidator.store, UserController.store)

routes.use(AuthMiddleware)

routes.get('/users', UserController.index)
routes.put('/users', UserValidator.update, UserController.update)

routes.post('/files', upload.single('file'), FileController.store)

routes.get('/providers', ProviderController.index)

routes.get('/appointments', AppointmentController.index)
routes.post('/appointments', AppointmentValidator.store, AppointmentController.store)
routes.delete('/appointments/:id', AppointmentController.delete)

routes.get('/schedule', CheckUserProvider, ScheduleController.index)

routes.get('/notifications', CheckUserProvider, NotificationSchema.index)
routes.put('/notifications/:id', CheckUserProvider, NotificationSchema.update)

export default routes
