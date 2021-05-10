const S = require('fluent-json-schema')
const linkSchema = require('./links')
const entity =
    S.object()
        .additionalProperties(false)
        .prop('name', S.string().required())
        .prop('type', S.string().required())

const EntityWithId =
    entity
        .prop('_id', S.string())

const EntityWithLinks =
    EntityWithId
        .prop('links', S.array().items(linkSchema))

const ArrayWhitLinks =
    S.object()
        .prop('data', S.array().items(EntityWithId))
        .prop('links', S.array().items(linkSchema))


module.exports = {
    entity,
    EntityWithLinks,
    ArrayWhitLinks
}