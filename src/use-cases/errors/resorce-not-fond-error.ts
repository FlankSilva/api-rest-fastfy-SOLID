export class ResourceNotFondError extends Error {
  constructor() {
    super('Resource not found');
  }
}
