'use strict'

exports.register = function (server, options, next) {
  const list1 = require('../../data/list1.json')
  const list2 = require('../../data/list2.json')
  const pages = [
    'abonnez-vous',
    'accueil',
    'accueil-tous',
    'agenda',
    'allo',
    'apropos',
    'bottin',
    'bye',
    'faq',
    'index',
    'moi',
    'page-ext-1',
    'page-int-1',
    'resultats',
    'section-acteurs',
    'section-actionnaires',
    'section-entreprise',
    'sujet-acericulture',
    'sujet-agriculture',
    'tests'
  ]

  server.views({
    engines: { html: require('lodash-vision') },
    path: 'templates',
    partialsPath: 'templates/partials',
    isCached: options.templateCached
  })

  pages.forEach((page) => {
    server.route({
      method: 'GET',
      path: '/{languageCode}/' + page,
      handler: { view: page }
    })
  })

  server.route({
    method: 'GET',
    path: '/{languageCode}/',
    handler: {
      view: {
        template: 'index',
        context: { items: list1.items, items2: list2.items }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: { view: 'pick-language' }
  })

  server.route({
    method: 'GET',
    path: '/{languageCode}/partials',
    handler: { view: 'partials' }
  })

  server.route({
    method: 'GET',
    path: '/css/{param*}',
    handler: { directory: { path: 'assets/css/' } }
  })

  server.route({
    method: 'GET',
    path: '/js/{param*}',
    handler: { directory: { path: 'assets/js/' } }
  })

  server.route({
    method: 'GET',
    path: '/img/{param*}',
    handler: { directory: { path: 'assets/img/' } }
  })

  next()
}

exports.register.attributes = {
  name: 'web',
  dependencies: ['hapi-i18n', 'vision', 'inert']
}
