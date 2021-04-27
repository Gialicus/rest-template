'use strict'
const fp = require('fastify-plugin')


async function crud(fastify,opts) {
    
    async function insertRecord(objToInsert) {
        const {db} = fastify.mongo
        const {schema} = opts
        return new Promise((resolve,reject) => {
            db.collection(schema, onCollection)
            function onCollection (err, col) {
              if (err) return reject(err)
              col.insertOne(objToInsert, (err,data) => {
                  if (err) reject(err)
                  resolve(data.insertedId)
              })
            }
        })
    }

    async function insertRecords(listToInsert) {
        const {db} = fastify.mongo
        const {schema} = opts
        return new Promise((resolve,reject) => {
            db.collection(schema, onCollection)
            function onCollection (err, col) {
              if (err) return reject(err)
              col.insertMany(listToInsert, (err,data) => {
                  if (err) reject(err)
                  resolve(data.insertedIds)
              })
            }
        })
    }

    async function getRecord(filter) {
        const {db} = fastify.mongo
        const {schema} = opts
        return new Promise((resolve,reject) => {
            db.collection(schema, onCollection)
            function onCollection (err, col) {
              if (err) return reject(err)
              col.findOne(filter, (err,data) => {
                  if (err) reject(err)
                  resolve(data)
              })
            }
        })
    }

    async function getRecords(filter) {
        const {db} = fastify.mongo
        const {schema} = opts
        return new Promise((resolve,reject) => {
            db.collection(schema, onCollection)
            function onCollection (err, col) {
              if (err) return reject(err)
              col.find(filter).toArray((err,data) => {
                  if (err) reject(err)
                  resolve(data)
              })
            }
        })
    }

    fastify.decorate('CRUD',{
        insertRecord,
        insertRecords,
        getRecord,
        getRecords
    })
}
module.exports = fp(crud)
module.exports.autoConfig = { schema: 'example'}
module.exports.autoPrefix = 'crud'