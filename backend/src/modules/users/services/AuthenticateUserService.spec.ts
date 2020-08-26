import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService

describe('CreateUser', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to authenticate', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '45445646'
        })

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '45445646'
        })

        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user)
    })

    it('should not be able to authenticate with non existing user', async () => {
        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '45445646'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '45445646'
        })

        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'wron-password'
        })).rejects.toBeInstanceOf(AppError)
    })
})