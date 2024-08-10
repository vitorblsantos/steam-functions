import {  } from 'firebase-admin'
import { v4 } from 'uuid'

import * as Sentry from '@sentry/google-cloud-serverless'

import { Winston } from '../../config/index.config'
import { ServicePubSub, ServiceSteam } from '../../services/index.services'
import { ISteamResponse } from '../../types/steam/steam.types'
import { getDateFirestoreTimestamp } from '../../utils/date/date.utils'

import { SteamError } from './steam.errors'

export const Snapshot = async () => await Sentry.withScope(async () => {
  const logger = Winston('steam-controller-snapshot')
  logger.info('Iniciando execução')

  try {
    const { data, status }: { data: ISteamResponse; status: number } = await ServiceSteam.get('/market/search/render/', {
      params: {
        start: 0,
        count: 1,
        sort_column: 'popular',
        sort_dir: 'desc',
        appid: '730',
        norender: 1
      }
    })

    if (status !== 200) {
      logger.error('Erro na hora de buscar as informações na API')
      throw new SteamError('500', 'Erro na hora de buscar as informações na API')
    }

    const promises = data.results.map(el => {
      const _id = v4()
      const today = getDateFirestoreTimestamp()

      const document = {
        _id,
        _metadata: {
          createdAt: today,
          updateAt: today
        },
        ...el,
      }

      return ServicePubSub.publish({ data: document, topic: 'steam-functions' })
    })

    return await Promise.all(promises)
  } catch (err) {
    throw new SteamError('500', `Exception ocurred while executing SteamSnapshot: ${JSON.stringify(err)}`)
  }
})

