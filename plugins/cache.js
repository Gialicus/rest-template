'use strict'

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts) {
  function setCache(key,value) {
      const {redis} = fastify
      redis.set(key, value)
  }
  async function getCache(key) {
      const {redis} = fastify
      return new Promise((resolve,rejects) => {
        redis.get(key, (err,data) => {
            if(err) rejects(err)
            resolve(data)
        })
      })
  }
  fastify.decorate('setCache', setCache)
  fastify.decorate('getCache', getCache)
})