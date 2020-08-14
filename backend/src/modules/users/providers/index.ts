import { container } from 'tsyringe'

import IHashProvider from './HashProvider/models/IHashProvider'
import BCryptHashProvier from './HashProvider/implementations/BCryptHashProvider'

container.registerSingleton<IHashProvider>(
    'HashProvider',
    BCryptHashProvier
)