import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export const makeAuthenticateUseCase = () => {
  const prismaUserRepository = new PrismaUsersRepository()
  const authenticateUserCase = new AuthenticateUseCase(prismaUserRepository)

  return authenticateUserCase
}
