'use strict'
const fp = require('fastify-plugin')


async function crud(fastify, opts) {

    async function insertRecord(objToInsert) {
        const { db } = fastify.mongo
        const { schema } = opts
        return new Promise((resolve, reject) => {
            db.collection(schema, onCollection)
            function onCollection(err, col) {
                if (err) return reject(err)
                col.insertOne(objToInsert, (err, data) => {
                    if (err) reject(err)
                    const result = {
                        ...objToInsert,
                        _id: data.insertedId
                    }
                    resolve(result)
                })
            }
        })
    }

    async function insertRecords(listToInsert) {
        const { db } = fastify.mongo
        const { schema } = opts
        return new Promise((resolve, reject) => {
            db.collection(schema, onCollection)
            function onCollection(err, col) {
                if (err) return reject(err)
                col.insertMany(listToInsert, (err, data) => {
                    if (err) reject(err)
                    resolve(data.insertedIds)
                })
            }
        })
    }

    async function getRecord(id) {
        const { db, ObjectId } = fastify.mongo
        const { schema } = opts
        return new Promise((resolve, reject) => {
            db.collection(schema, onCollection)
            function onCollection(err, col) {
                const filterQuery = { _id: new ObjectId(id) }
                if (err) return reject(err)
                col.findOne(filterQuery, (err, data) => {
                    if (err) reject(err)
                    resolve(data)
                })
            }
        })
    }

    async function getRecords(page = 0) {
        const { db } = fastify.mongo
        const { schema, maxResults } = opts
        return new Promise((resolve, reject) => {
            db.collection(schema, onCollection)
            function onCollection(err, col) {
                if (err) return reject(err)
                col.find()
                    .skip(page > 0 ? ( ( page - 1 ) * maxResults ) : 0 )
                    .limit(maxResults).toArray((err, data) => {
                        if (err) reject(err)
                        resolve(data)
                    })
            }
        })
    }

    async function updateRecord(id, objToUpdate) {
        const { db, ObjectId } = fastify.mongo
        const { schema } = opts
        return new Promise((resolve, reject) => {
            db.collection(schema, onCollection)
            function onCollection(err, col) {
                const filterQuery = { _id: new ObjectId(id) }
                if (err) return reject(err)
                col.findOne(filterQuery, (err, data) => {
                    if (err) reject(err)
                    if (!data) reject(new Error('element not found'))
                    const updated = {
                        ...data,
                        ...objToUpdate
                    }
                    col.updateOne(filterQuery, { $set: updated }, (err, result) => {
                        if (err) reject(err)
                        resolve(updated)
                    })
                })
            }
        })
    }

    async function deleteRecord(id) {
        const { db, ObjectId } = fastify.mongo
        const { schema } = opts
        return new Promise((resolve, reject) => {
            db.collection(schema, onCollection)
            function onCollection(err, col) {
                const filterQuery = { _id: new ObjectId(id) }
                if (err) return reject(err)
                col.deleteOne(filterQuery, (err, data) => {
                    if (err) reject(err)
                    resolve(data.result)
                })
            }
        })
    }

    fastify.decorate('CRUD', {
        insertRecord,
        insertRecords,
        getRecord,
        getRecords,
        updateRecord,
        deleteRecord
    })
}
module.exports = fp(crud)
module.exports.autoConfig = { schema: 'example', maxResults: 25 }
module.exports.autoPrefix = 'crud'