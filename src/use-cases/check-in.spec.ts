import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './checkin';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-errors';
import { MaxDistanceError } from './errors/max-distance-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.9316302,
      longitude: -47.136222,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9316302,
      userLongitude: -47.136222,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9316302,
      userLongitude: -47.136222,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.9316302,
        userLongitude: -47.136222,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9316302,
      userLongitude: -47.136222,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9316302,
      userLongitude: -47.136222,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.912106),
      longitude: new Decimal(-47.098461),
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.9316302,
        userLongitude: -47.136222,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
