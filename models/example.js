const S = require('fluent-json-schema')
const example =
    S.object()
        .additionalProperties(false)
        .prop('name', S.string().required())
        .prop('type', S.string().required())

const exampleRes =
    example
        .prop('_id', S.string())
        .prop('links', S.array().items(
            S.object()
                .prop('rel', S.string())
                .prop('method', S.string())
                .prop('href', S.string())
        ))

const exampleArray =
    S.object()
        .prop('data', S.array().items(exampleRes))
        .prop('links', S.array().items(
            S.object()
                .prop('rel', S.string())
                .prop('method', S.string())
                .prop('href', S.string())
        ))


module.exports = {
    example,
    exampleRes,
    exampleArray
}