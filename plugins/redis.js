
const fp = require('fastify-plugin')

async function mongoConnection(fastify, opts) {
    fastify.register(require('fastify-redis'), {
            host: fastify.config.CACHE_HOST,
            port: fastify.config.CACHE_PORT
        })
}
module.exports = fp(mongoConnection)