import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { TIMEZONE } from './config/index.config'
import { ControllersSteam } from './controllers/index.controllers'

admin.initializeApp()

exports.SteamSnapshot = functions.pubsub
  .schedule("* */1 * * *")
  .timeZone(TIMEZONE)
  .onRun(ControllersSteam.Snapshot)
