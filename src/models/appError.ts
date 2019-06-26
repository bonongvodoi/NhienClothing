export class AppError extends Error {
  constructor(message: string, public status: number, public details?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
  }
}