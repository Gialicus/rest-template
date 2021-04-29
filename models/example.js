const S = require('fluent-json-schema')
const example =
    S.object()
        .additionalProperties(false)
        .prop('name', S.string().required())
        .prop('type', S.string().required())

const exampleRes =
    example
        .prop('_id', S.string())

const exampleArray =
    S.array().items(exampleRes)


module.exports = {
    example,
    exampleRes,
    exampleArray
}