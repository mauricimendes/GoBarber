import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatar from './UpdateUserAvatarService'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatar

describe('UpdateUserAvatar', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeStorageProvider = new FakeStorageProvider()
    
        updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider)
    })

    it('should be able to create a new user', async () => {

        const user = await fakeUsersRepository.create({
           name: 'John Doe',
           email: 'johndoe@example.com',
           password: '45445646'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        expect(user.avatar).toBe('avatar.jpg')
    })

    it('should not be able to update avatar from nom existing user', async () => {
        await expect(updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

        const user = await fakeUsersRepository.create({
           name: 'John Doe',
           email: 'johndoe@example.com',
           password: '45445646'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg'
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
        expect(user.avatar).toBe('avatar2.jpg')
    })
})