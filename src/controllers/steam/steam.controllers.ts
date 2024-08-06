import { firestore } from 'firebase-admin'
import { v4 } from 'uuid'

import * as Sentry from '@sentry/google-cloud-serverless'

import { Winston } from '../../config/index.config'
import { ServiceSteam } from '../../services/index.services'
import { ISteamData, ISteamResponse } from '../../types/steam/steam.types'
import { getDateFirestoreTimestamp } from '../../utils/date/date.utils'

import { SteamError } from './steam.errors'

export const Snapshot = async () => await Sentry.withScope(async () => {
  const logger = Winston('steam-controller-snapshot')
  logger.info('Iniciando execução')

  try {
    const { data, status }: { data: ISteamData; status: number } = await ServiceSteam.get('/market/search/render/', {
      params: {
        start: 0,
        count: 100,
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

    for (let counter = 0; counter < data.pagesize; counter++) {
      const _id = v4()
      const response: ISteamResponse = data.results[counter]
      const today = getDateFirestoreTimestamp()

      const document: ISteamData = {
        _id,
        _metadata: {
          createdAt: today,
          updateAt: today
        },
        ...response,
      }

      await firestore().collection('steam').doc(_id).set(document)

      logger.info(`Documento - ${_id} criado`)
    }

  } catch (err) {
    throw new SteamError('500', `Exception ocurred while executing SteamSnapshot: ${JSON.stringify(err)}`)
  }
})

