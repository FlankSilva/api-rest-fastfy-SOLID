import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFondError } from './errors/resorce-not-fond-error';

type GetUserProfileUseCaseRequest = {
  userId: string;
};

type GetUserProfileUseCaseResponse = {
  user: User;
};

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFondError();
    }

    return { user };
  }
}
