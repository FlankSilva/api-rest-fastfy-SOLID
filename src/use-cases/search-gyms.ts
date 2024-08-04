import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';

type SearchGymsUseCaseRequest = {
  query: string;
  page: number;
};

type SearchGymsUseCaseResponse = {
  gyms: Gym[];
};

export class SearchGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return { gyms };
  }
}
