const fp = require('fastify-plugin')

async function mongoConnection(fastify,opts) {
    fastify.register(require('fastify-mongodb'), {
        forceClose: true,
        url: fastify.config.DB_URL
    })
}
module.exports =  fp(mongoConnection)