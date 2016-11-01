'use strict'

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/boo',
    handler: function (request, reply) {
      reply({ message: 'Welcome to the plot device.' })
    }
  })

  next()
}

exports.register.attributes = {
  name: 'api'
}
