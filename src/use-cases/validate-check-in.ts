import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { ResourceNotFondError } from './errors/resorce-not-fond-error';
import dayjs from 'dayjs';
import { LateCheckInValidationsError } from './errors/late-check-in-validations-error';

type ValidateCheckInUseCaseRequest = {
  checkInId: string;
};

type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn;
};

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFondError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationsError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
