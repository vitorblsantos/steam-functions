import 'dotenv/config'

import { nodeProfilingIntegration } from '@sentry/profiling-node'

import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as Sentry from '@sentry/google-cloud-serverless'

import { TIMEZONE } from './config/index.config'
import { ControllersSteam } from './controllers/index.controllers'

admin.initializeApp()

Sentry.init({
  dsn: '',
  environment: 'production',
  release: 'steam-functions@1.0.0',
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
})

Sentry.setTag('app-name', 'steam-functions')

exports.SteamSnapshot = functions.pubsub
  .schedule("*/1 * * * *")
  .timeZone(TIMEZONE)
  .onRun(ControllersSteam.Snapshot)
