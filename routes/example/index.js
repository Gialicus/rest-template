'use strict'

const { MonoRes, example, ArrayRes } = require('../../models/example.js')

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: ArrayRes
      }
    },
    handler: async function (request, reply) {
      try {
        const { page } = request.query
        const result = await fastify.CRUD.getRecords(page)
        const linked = new fastify.ArrayLinkBuilder(result)
          .addSelfLinks()
          .addLinks({
            rel: 'nextPage', 
            method: 'GET', 
            href: `${process.env.HAL_ADDRESS}/${process.env.HAL_ENTITY}?page=${(page && parseInt(page) > 1) ? parseInt(page) + 1 : 2}`
          })
          .addLinks({
            rel: 'prevPage', 
            method: 'GET', 
            href: `${process.env.HAL_ADDRESS}/${process.env.HAL_ENTITY}?page=${(page && parseInt(page) > 1) ? parseInt(page) - 1 : 1}`
          })
          .build()
        return linked
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
        200: MonoRes
      }
    },
    onRequest: async function (request, reply) {
      const { id } = request.params
      const cached = await fastify.getCache(id)
      if (cached) {
        reply.send(JSON.parse(cached))
      }
    },
    handler: async function (request, reply) {
      try {
        const { id } = request.params
        const serviceResult = await fastify.CRUD.getRecord(id)
        const linked = new fastify.LinkBuilder(serviceResult)
        const result = linked.addCrudLinks().build()
        fastify.setCache(id, JSON.stringify(result))
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
        200: MonoRes
      }
    },
    handler: async function (request, reply) {
      try {
        const result = await fastify.CRUD.insertRecord(request.body)
        const linked = new fastify.LinkBuilder(result)
        linked.addCrudLinks()
        return linked.build()
      } catch (error) {
        return error
      }
    }
  })
  fastify.route({
    method: 'PUT',
    url: '/:id',
    response: {
      200: MonoRes
    },
    handler: async function (request, reply) {
      try {
        const { id } = request.params
        const result = await fastify.CRUD.updateRecord(id, request.body)
        const linked = new fastify.LinkBuilder(result)
        linked.addCrudLinks()
        return linked.build()
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
        const { id } = request.params
        const result = await fastify.CRUD.deleteRecord(id)
        return result
      } catch (error) {
        return error
      }
    }
  })

}
