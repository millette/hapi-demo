'use strict'

const Lab = require('lab')
const Code = require('code')
const Config = require('../../../config')
const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const HomePlugin = require('../../../server/web/index')

const lab = exports.lab = Lab.script()
let request
let server

lab.beforeEach((done) => {
  const plugins = [Inert, Vision, HomePlugin]
  server = new Hapi.Server()
  server.connection({ port: Config.get('/port/web') })
  server.register(plugins, (err) => {
    if (err) {
      return done(err)
    }

    server.views({
      engines: { html: require('lodash-vision') },
      path: './server/web'
    })

    done()
  })
})

lab.experiment('Home Page View', () => {
  lab.beforeEach((done) => {
    request = {
      method: 'GET',
      url: '/'
    }

    done()
  })

  lab.test('home page renders properly', (done) => {
    server.inject(request, (response) => {
      console.log('WEB:', JSON.stringify(response.result, null, ' '))
      // console.log(Object.keys(response.result))
      Code.expect(response.result).to.match(/activate the plot device/i)
      Code.expect(response.statusCode).to.equal(200)

      done()
    })
  })
})
