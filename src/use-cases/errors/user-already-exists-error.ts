export class UserAlrearyExixtsError extends Error {
  constructor() {
    super('E-mail already exists');
  }
}
