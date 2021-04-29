'use strict'

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts) {
    const { protocol, host, port } = opts
    const address = `${protocol}://${host}:${port}`
    function LinkBuilder(name, entity) {
        if (!entity) throw new Error('entity cant be null')
        if (!entity._id) throw new Error('entity  must have an "_id" property')
        if (!name) throw new Error('name cant be null')
        const id = entity._id
        this.result = {
            ...entity,
            links: []
        }
        this.addLinks = (link) => {
            if (!link) throw new Error('link cant be null')
            if (!link.rel) throw new Error('link.rel cant be null')
            if (!link.method) throw new Error('link.method cant be null')
            if (!link.href) throw new Error('link.href cant be null')
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
    function ArrayLinkBuilder(name, list) {
        if (!list || list.lenght === 0) throw new Error('list cant be null and cant have lenght = 0')
        if (!name) throw new Error('name cant be null')
        this.result = {
            data: list,
            links: []
        }
        this.addLinks = (link) => {
            if (!link) throw new Error('link cant be null')
            if (!link.rel) throw new Error('link.rel cant be null')
            if (!link.method) throw new Error('link.method cant be null')
            if (!link.href) throw new Error('link.href cant be null')
            this.result.links.push(link)
            return this
        }
        this.build = () => {
            return this.result
        }
        this.addSelfLinks = () => {
            const mappedIds = list.map(elem => elem._id ? elem._id : null).filter(e => e !== null)
            mappedIds.forEach(id => {
                this.result.links.push({
                    rel: 'self',
                    method: 'GET',
                    href: `${address}/${name}/${id}`
                })
            });
            return this
        }
    }
    fastify.decorate('LinkBuilder', LinkBuilder)
    fastify.decorate('ArrayLinkBuilder', ArrayLinkBuilder)
})


module.exports.autoConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 3000
}
module.exports.autoPrefix = 'hateoas'

