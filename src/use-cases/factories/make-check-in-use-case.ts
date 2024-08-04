import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repotory';
import { CheckInUseCase } from '../checkin';

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
