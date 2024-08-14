import { ApplicationError } from '../../errors/index.errors'

export class SteamError extends ApplicationError {
  public static InternalServerError() {
    return new SteamError('@steam-service/internal-server-error', 'Internal server error')
  }

  public toStatusCode = (): number => {
    return 500
  }
}
