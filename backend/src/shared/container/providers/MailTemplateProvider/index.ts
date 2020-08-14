import { container } from 'tsyringe'

import IMailTemplateProvider from './models/IMailTemplateProvider'

import HandlebarsMailTempletaProvider from './implementations/HandlebarsMailTempletaProvider'

const providers = {
    handlebars: HandlebarsMailTempletaProvider
}

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    providers.handlebars
)