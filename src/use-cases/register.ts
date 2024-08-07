import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { UserAlrearyExixtsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

type RegisterUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

type RegisterUseCaseResponse = {
  user: User;
};

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlrearyExixtsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
