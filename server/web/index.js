'use strict'

exports.register = function (server, options, next) {
  console.log('OPTIONS:', options)
  server.views({
    engines: { html: require('lodash-vision') },
    path: 'templates',
    partialsPath: 'templates/partials',
    isCached: options.templateCached
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: { view: 'index' }
  })

  next()
}

exports.register.attributes = {
  name: 'web',
  dependencies: 'vision'
}
