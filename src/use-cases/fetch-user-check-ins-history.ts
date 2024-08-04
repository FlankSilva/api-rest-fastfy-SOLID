import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories/check-ins-repository';

type FetchUserCheckInsHistoryUseCaseRequest = {
  userId: string;
  page: number;
};

type FetchUserCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[];
};

export class FetchUserCheckInsHistoryUseCaseUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
