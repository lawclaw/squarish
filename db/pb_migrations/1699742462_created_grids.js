/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qnjmxnohwa5e7mv",
    "created": "2023-11-11 22:41:02.014Z",
    "updated": "2023-11-11 22:41:02.014Z",
    "name": "grids",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ijzhewk5",
        "name": "grid",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qnjmxnohwa5e7mv");

  return dao.deleteCollection(collection);
})
