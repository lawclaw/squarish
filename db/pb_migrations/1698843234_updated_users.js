/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1jflp35qk2wmktg")

  collection.createRule = "@request.data.username != username"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1jflp35qk2wmktg")

  collection.createRule = "@request.data.username != @collection.users.username"

  return dao.saveCollection(collection)
})
