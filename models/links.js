const S = require('fluent-json-schema')

const linkSchema =
    S.object()
        .prop('rel', S.string())
        .prop('method', S.string())
        .prop('href', S.string())

module.exports = linkSchema