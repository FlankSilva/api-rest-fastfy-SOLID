import { CheckInsRepository } from '@/repositories/check-ins-repository';

type GetUserMetricsUseCaseRequest = {
  userId: string;
};

type GetUserMetricsUseCaseResponse = {
  checkInsCount: number;
};

export class GetUserMetricsUseCaseUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
