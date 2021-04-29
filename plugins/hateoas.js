'use strict'

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts) {
    const { protocol, host, port } = opts
    const address = `${protocol}://${host}:${port}`
    function LinkBuilder(name, entity) {
        if(!entity) throw new Error('entity cant be null')
        let id = entity._id ? entity._id : null
        if(entity instanceof Array) id = entity.find( element => element._id ? element._id : null)
        if(id == null) throw new Error('entity or entity child lv1 must have an "_id" property')
        if(!name) throw new Error('name cant be null')
        this.result = {
            ...entity,
            links: []
        }
        this.addLinks = (link) => {
            if(!link) throw new Error('link cant be null')
            if(!link.rel) throw new Error('link.rel cant be null')
            if(!link.method) throw new Error('link.method cant be null')
            if(!link.href) throw new Error('link.href cant be null')
            this.result.links.push(link)
            return this
        }
        this.build = () => {
            return this.result
        }
        this.addCrudLinks = () => {
            this.result.links.push(
               ...[
                    {
                        rel: 'self',
                        method: 'GET',
                        href: `${address}/${name}/${id}`
                    },
                    {
                        rel: 'create',
                        method: 'POST',
                        href: `${address}/${name}`
                    },
                    {
                        rel: 'read',
                        method: 'GET',
                        href: `${address}/${name}`
                    },
                    {
                        rel: 'update',
                        method: 'PUT',
                        href: `${address}/${name}/${id}`
                    },
                    {
                        rel: 'delete',
                        method: 'DELETE',
                        href: `${address}/${name}/${id}`
                    }
                ]
            )
            return this
        }
    }
    fastify.decorate('LinkBuilder', LinkBuilder)
})


module.exports.autoConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 3000
}
module.exports.autoPrefix = 'hateoas'

