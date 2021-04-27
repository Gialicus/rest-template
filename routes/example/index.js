'use strict'

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async function (request, reply) {
      try {
        const result = await fastify.CRUD.getRecord({})
        return result
      } catch (error) {
        return error
      }
    }
  })

}
