import { firestore } from 'firebase-admin'
import { v4 } from 'uuid'

import { InstanceSteam } from '../../services/index.services'
import { ISteamResponse } from '../../types/steam/steam.types'
import { Winston } from '../../utils/index.utils'

import { SteamError } from './steam.errors'
import { getDateFirestoreTimestamp } from '../../utils/date/date.utils'


export const Snapshot = async () => {
  try {
    const logger = Winston('steam-controller-snapshot')

    logger.info('Iniciando execução')

    const { data, status }: { data: ISteamResponse; status: number } = await InstanceSteam.get('/market/search/render/', {
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
      logger.error('Erro na hora de buscar as informacoes na API')
      throw new SteamError('500', 'internal-server-error')
    }

    for (let counter = 0; counter < data.pagesize; counter++) {
      const _id = v4()
      const item: ISteamResponse = data.results[counter]
      const today = getDateFirestoreTimestamp()

      const oddDocument = {
        _id,
        createdAt: today,
        ...item,
        updateAt: today
      }

      await firestore().collection('steam').doc(_id).set(oddDocument)

      logger.info(`Documento - ${_id} criado`)
    }

  } catch (err: any) {
    throw new SteamError(err.status || '500', err.message || 'internal-server-error')
  }
}
