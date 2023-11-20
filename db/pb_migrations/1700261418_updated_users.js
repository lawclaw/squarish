/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nchpzu6dhzzcvmd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "srllgo2i",
    "name": "lastChanged",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nchpzu6dhzzcvmd")

  // remove
  collection.schema.removeField("srllgo2i")

  return dao.saveCollection(collection)
})
