import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated'
import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

// SoC: Separation of Concers = Separação de Preocupações
// DTO - Date Transfer Object

// SOLID 
// Single Responsability Principle - V
// Open closed Principle -  X
// Liskov Substituion Principle - V 
// Interface Segregation Principle - X
// Dependency Invertion Principle - V


const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()


appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    }
}), appointmentsController.create)
appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter