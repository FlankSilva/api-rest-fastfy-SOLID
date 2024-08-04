import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';

type FetchNearbyGymsUseCaseRequest = {
  userLatitude: number;
  userLongitude: number;
};

type FetchNearbyGymsUseCaseResponse = {
  gyms: Gym[];
};

export class FetchNearbyGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
