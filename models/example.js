const S = require('fluent-json-schema')
const linkSchema = require('./links')
const example =
    S.object()
        .additionalProperties(false)
        .prop('name', S.string().required())
        .prop('type', S.string().required())

const Mono =
    example
        .prop('_id', S.string())

const MonoRes =
    Mono
        .prop('links', S.array().items(linkSchema))

const ArrayRes =
    S.object()
        .prop('data', S.array().items(Mono))
        .prop('links', S.array().items(linkSchema))


module.exports = {
    example,
    MonoRes,
    ArrayRes
}