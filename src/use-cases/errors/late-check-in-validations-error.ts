export class LateCheckInValidationsError extends Error {
  constructor() {
    super('The check-in can only be validated 20 minutes of its creation.');
  }
}
