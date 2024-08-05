export abstract class ApplicationError extends Error {
  public code: string

  constructor(
    code: string = '@common/internal-server-error',
    message: string = 'Internal server error.'
  ) {
    super(message)
    this.code = code
  }

  abstract toStatusCode(): number

  public toJSON(): { code: string, message: string } {
    return {
      code: this.code,
      message: this.message,
    }
  }
}
