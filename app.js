'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-env'), {
    schema: S.object()
      .prop('NODE_ENV', S.string().required())
      .prop('DB_URL', S.string())
      .valueOf()
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
