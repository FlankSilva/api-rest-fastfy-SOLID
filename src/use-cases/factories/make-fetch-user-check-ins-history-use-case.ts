import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repotory';
import { FetchUserCheckInsHistoryUseCaseUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCaseUseCase(
    checkInsRepository,
  );

  return useCase;
}
