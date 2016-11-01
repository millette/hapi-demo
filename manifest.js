'use strict'

const Confidence = require('confidence')
const Config = require('./config')

const criteria = {
  env: process.env.NODE_ENV
}

const manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [{
    port: Config.get('/port/web'),
    labels: ['web']
  }],
  registrations: [
    {
      plugin: 'vision'
    },
    {
      plugin: {
        register: './server/api/index'
      },
      options: {
        routes: { prefix: '/api' }
      }
    },
    {
      plugin: {
        register: './server/web/index',
        options: {
          templateCached: Config.get('/cache/web')
        }
      }
    }
  ]
}

const store = new Confidence.Store(manifest)

exports.get = (key) => {
  return store.get(key, criteria)
}

exports.meta = (key) => {
  return store.meta(key, criteria)
}
