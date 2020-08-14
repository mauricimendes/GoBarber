import AppError from '@shared/errors/AppError'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgotoPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeMailProvider = new FakeMailProvider()
        fakeUserTokensRepository = new FakeUserTokensRepository()
    
        
        sendForgotoPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository, 
            fakeMailProvider,
            fakeUserTokensRepository
        )
    })

    it('shold be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
        
        await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotoPasswordEmail.execute({
            email: 'johndoe@example.com'
        })

        expect(sendMail).toHaveBeenCalled()
    })

    it('should not be able to recover a non-existing user password', async () => {
        await expect(sendForgotoPasswordEmail.execute({
            email: 'johndoe@example.com'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotoPasswordEmail.execute({
            email: 'johndoe@example.com'
        })

        expect(generateToken).toHaveBeenCalledWith(user.id)
    })
})