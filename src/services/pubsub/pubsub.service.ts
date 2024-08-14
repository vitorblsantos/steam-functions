import { PubSub } from '@google-cloud/pubsub'
import { Winston } from '../../config/index.config'
import { getDateFirestoreTimestamp } from '../../utils/index.utils'

import { PubSubError } from './pubsub.errors'

const logger = Winston('steam-controller-snapshot')
const pubsub = new PubSub()

const publish = async ({
  data,
  topic
}: {
  data: object
  topic: string
}): Promise<void> => {
  try {
    const _data = Buffer.from(JSON.stringify(data))
    const _topic = pubsub.topic(topic)

    await _topic.publishMessage({
      data: _data,
      publishTime: getDateFirestoreTimestamp()
    })
  } catch (error) {
    logger.error(`Erro ao publicar a mensagem: ${error}`)
    throw PubSubError.InternalServerError()
  }
}

export const ServicePubSub = {
  publish
}
