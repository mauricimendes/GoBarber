import { Router } from 'express'

// SoC: Separation of Concers = Separação de Preocupações
// DTO - Date Transfer Object

// SOLID 
// Single Responsability Priciple
// x
// x
// x
// Dependency Invertion Priciple

import AuthenticateUserService from '../services/AuthenticateUserService'


const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
        email,
        password
    })
    
    delete user.password

    return response.json({ user, token })

})

export default sessionsRouter