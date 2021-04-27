'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-swagger'),{
    routePrefix: '/documentation',
    exposeRoute: fastify.config.NODE_ENV !== 'production',
    swagger: {
      info: {
        title: 'Base API Rest with Fastify',
        description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:4000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  })
})