import { afterAll, describe, expect, it } from '@jest/globals'

import * as firebaseFunctionsTest from 'firebase-functions-test'

import * as functions from '../src'

const virtualEnv = firebaseFunctionsTest()

describe('SteamSnapshot', () => {
  afterAll(() => {
    virtualEnv.cleanup()
  })

  it('Should execute without errors', async () => {
    const wrapped = virtualEnv.wrap(functions.SteamSnapshot)
    const result = wrapped()
    expect(result).toBeTruthy()
  })
})

