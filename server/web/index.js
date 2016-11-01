'use strict'

exports.register = function (server, options, next) {
  const list1 = require('../../data/list1.json')
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
      path: '/' + page,
      handler: { view: page }
    })
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: {
        template: 'index',
        context: list1
      }
    }
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
  dependencies: ['vision', 'inert']
}
