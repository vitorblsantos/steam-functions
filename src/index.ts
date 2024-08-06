import 'dotenv/config'

import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { onMessagePublished } from 'firebase-functions/v2/pubsub'

import * as admin from 'firebase-admin'
import * as Sentry from '@sentry/google-cloud-serverless'

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

export const SteamSnapshot = onMessagePublished('steam-functions', ControllersSteam.Snapshot)
