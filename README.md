# NGSI-for-Google-Apps-Script

A NGSI Client Library for using FIWARE Orion from Google Apps Script.

## Install

Search and add the following library ID from Google Apps Script Editor.

Library ID
`1eNNhYswQcIBY4l6kucOOXLnCXhdu2DjJ4sifsOf58OZQGLI7F3zYubME`

## Usage

```javascript
function main() {
  // Setup your credential.
  var credential = {
    Authorization: "Bearer <Your-Token>"
  }

  var client = NGSI.Client("<Orion-URL>", credential);

  var fiwareService = ""
  var fiwareServicePath = "/"

  // List entities.
  var entities = client.listEntities(fiwareService, fiwareServicePath);
  console.log(entities);

  // Create entity.
  var entity = {id: "room1",
                type: "Room",
                temperature: {type: "Number", value: 25}}
  client.createEntity(entity, fiwareService, fiwareServicePath);

  // Get entity.
  var entity = client.getEntity("room1", fiwareService, fiwareServicePath);
  console.log(entity);

  // Update attribute value.
  client.updateAttributeValue("room1", "temperature", 20, fiwareService, fiwareServicePath);

  // Delete entity.
  client.deleteEntity("room1", fiwareService, fiwareServicePath);
}
```
