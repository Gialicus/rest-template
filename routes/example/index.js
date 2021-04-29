'use strict'

const { exampleRes, example, exampleArray } = require('../../models/example.js')

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: exampleArray
      }
    },
    handler: async function (request, reply) {
      try {
        const result = await fastify.CRUD.getRecords({})
        return result
      } catch (error) {
        return error
      }
    }
  })
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      response: {
        200: exampleRes
      }
    },
    handler: async function (request, reply) {
      try {
        const {id} = request.params
        const result = await fastify.CRUD.getRecord(id)
        return result
      } catch (error) {
        return error
      }
    }
  })
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: example,
      response: {
        200: exampleRes
      }
    },
    handler: async function (request, reply) {
      try {
        const result = await fastify.CRUD.insertRecord(request.body)
        return result
      } catch (error) {
        return error
      }
    }
  })
  fastify.route({
    method: 'PUT',
    url: '/:id',
    response: {
      200: exampleRes
    },
    handler: async function (request, reply) {
      try {
        const {id} = request.params
        const result = await fastify.CRUD.updateRecord(id,request.body)
        return result
      } catch (error) {
        return error
      }
    }
  })
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    handler: async function (request, reply) {
      try {
        const {id} = request.params
        const result = await fastify.CRUD.deleteRecord(id)
        return result
      } catch (error) {
        return error
      }
    }
  })

}
