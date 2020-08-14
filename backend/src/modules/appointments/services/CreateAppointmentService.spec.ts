import AppError from '@shared/errors/AppError'

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeNotificationsRepository: FakeNotificationsRepository
let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {

    beforeEach(() => {
        fakeNotificationsRepository = new FakeNotificationsRepository()
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository, 
            fakeNotificationsRepository
        )
    })

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: '564654',
            provider_id: '112154654566'
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('112154654566')
    })

    it('should be able to create two appointment on the same time', async () => {
        const appointmentDate = new Date(2020, 7, 18, 14)

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '152465',
            provider_id: '112154654566'
        })

        expect(createAppointment.execute({
                date: appointmentDate,
                provider_id: '112154654566',
                user_id: '152465'
            })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: '54651',
                provider_id: '468546'   
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                user_id: '468546',
                provider_id: '468546'   
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                user_id: '468546',
                provider_id: '43242368546'   
            })
        ).rejects.toBeInstanceOf(AppError)

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 18),
                user_id: '468546',
                provider_id: '46324238546'   
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})