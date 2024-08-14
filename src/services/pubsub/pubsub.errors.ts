import { ApplicationError } from '../../errors/index.errors'

export class PubSubError extends ApplicationError {
  public static InternalServerError() {
    return new PubSubError('@pubsub-service/internal-server-error', 'Internal server error')
  }

  public toStatusCode = (): number => {
    return 500
  }
}
