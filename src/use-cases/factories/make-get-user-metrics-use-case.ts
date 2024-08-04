import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repotory';
import { GetUserMetricsUseCaseUseCase } from '../get-user-metrics';

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCaseUseCase(checkInsRepository);

  return useCase;
}
