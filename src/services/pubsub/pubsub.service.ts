import { PubSub } from '@google-cloud/pubsub';
import { getDateFirestoreTimestamp } from '../../utils/date/date.utils';

const pubsub = new PubSub()

const publish = async ({
  data,
  topic
}: { data: object; topic: string }): Promise<void> => {
  const _data = Buffer.from(JSON.stringify(data))
  const _topic = pubsub.topic(topic)

  try {
    await _topic.publishMessage({
      data: _data,
      publishTime: getDateFirestoreTimestamp()
    })
  } catch (error) {
    console.error(`Erro ao publicar a mensagem: ${error}`);
  }
}

export const ServicePubSub = {
  publish
}
