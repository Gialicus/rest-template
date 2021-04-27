const S = require('fluent-json-schema')

const exampleRes =
    S.object()
        .prop('_id', S.string())
        .prop('name', S.string())
        .prop('type', S.string())

module.exports = exampleRes