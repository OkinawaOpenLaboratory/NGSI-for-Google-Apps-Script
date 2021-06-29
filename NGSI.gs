/**
 * Create NGSI Client instance.
 * 
 * Example
 *    let credential = {
 *      Authorization: "Bearer xxxxxxxxxx"
 *    }
 *    var client = NGSIClient("https://<orion-host>:1026", credential)
 * 
 * @param {string} baseUrl Specify Orion URL.
 * @param {string} credential Specify your credential.
 */
function Client(baseUrl, credential) {
  this.credential = credential;
  return new Orion(baseUrl);
}

/**
 * Orion Class
 * 
 * @param {string} baseUrl Orion url
 */
function Orion(baseUrl) {
  this.orionBaseUrl = baseUrl
}

/**
 * List entities.
 * 
 * Example
 *    var entities = client.listEntities("MyService", "/MyServicePath")
 * 
 * @param {string} fiwareService Specify your Fiware Service.
 * @param {string} fiwareServicePath Specify your Fiware Service Path.
 * @return {map} HTTP response body.
 */
Orion.prototype.listEntities = function(fiwareService, fiwareServicePath) {
  var headers = {
    "Fiware-Service": fiwareService,
    "Fiware-ServicePath": fiwareServicePath
  }
  return getRequest_(this.orionBaseUrl + "/v2/entities", headers);
}

/**
 * Get entity.
 * 
 * Example
 *    var entities = client.getEntity("room1", "MyService", "/MyServicePath")
 * 
 * @param {string} id Specify the ID of the entity to be got.
 * @param {string} fiwareService Specify your Fiware Service.
 * @param {string} fiwareServicePath Specify your Fiware Service Path.
 * @return {map} HTTP response body.
 */
Orion.prototype.getEntity = function(id, fiwareService, fiwareServicePath) {
  var headers = {
    "Fiware-Service": fiwareService,
    "Fiware-ServicePath": fiwareServicePath
  }
  return getRequest_(this.orionBaseUrl + "/v2/entities/" + id, headers);
}

/**
 * Create entity.
 * 
 * Example
 *    var entity = {
 *      id: "room1",
 *      type: "Room",
 *      temperature: {
 *        type: "Number",
 *        value: 28
 *      }
 *    }
 *    client.createEntity(entity, "MyService", "/MyServicePath")
 * 
 * @param {map} entity Normalized entity.
 * @param {string} fiwareService Specify your Fiware Service.
 * @param {string} fiwareServicePath Specify your Fiware Service Path.
 */
Orion.prototype.createEntity = function(entity, fiwareService, fiwareServicePath) {
  var headers = {
    "Fiware-Service": fiwareService,
    "Fiware-ServicePath": fiwareServicePath
  }
  postRequest_(this.orionBaseUrl + "/v2/entities", headers, entity);
}

/**
 * Update entity.
 * 
 * Example
 *    var attributes = temperature: {
 *      type: "Number",
 *      value: 25
 *    }
 *    client.updateEntity(entityId, attributes, "MyService", "/MyServicePath")
 * 
 * @param {string} entityId Specify the ID of the entity to be updated.
 * @param {map} attributes Normalized attributes.
 * @param {string} fiwareService Specify your Fiware Service.
 * @param {string} fiwareServicePath Specify your Fiware Service Path.
 */
Orion.prototype.updateEntity = function(entityId, attributes, fiwareService, fiwareServicePath) {
  var headers = {
    "Fiware-Service": fiwareService,
    "Fiware-ServicePath": fiwareServicePath
  }
  patchRequest_(this.orionBaseUrl + "/v2/entities/" + entityId + "/attrs", headers, attributes);
}

/**
 * Update attribute value.
 * 
 * Example
 *    client.updateAttributeValue("room1", "temperature", 25, "/MyServicePath")
 * 
 * @param {string} entityId Specify the ID of the entity to be updated.
 * @param {string} attrName Specify the attribute name of the entity to be updated.
 * @param {any} attrValue Specify the attribute value of the entity to be updated.
 * @param {string} fiwareService Specify your Fiware Service.
 * @param {string} fiwareServicePath Specify your Fiware Service Path.
 */
Orion.prototype.updateAttributeValue = function(entityId, attrName, attrValue, fiwareService, fiwareServicePath) {
  var headers = {
    "Fiware-Service": fiwareService,
    "Fiware-ServicePath": fiwareServicePath
  }
  putRequest_(this.orionBaseUrl + "/v2/entities/" + entityId + "/attrs/" + attrName + "/value", headers, attrValue);
}

/**
 * Delete entity.
 * 
 * Example
 *    client.deleteEntity("room1", "MyService", "/MyServicePath")
 * 
 * @param {string} id Specify the ID of the entity to be deleted.
 * @param {string} fiwareService Specify your Fiware Service.
 * @param {string} fiwareServicePath Specify your Fiware Service Path.
 */
Orion.prototype.deleteEntity = function(id, fiwareService, fiwareServicePath) {
  var headers = {
    "Fiware-Service": fiwareService,
    "Fiware-ServicePath": fiwareServicePath
  }
  deleteRequest_(this.orionBaseUrl + "/v2/entities/" + id, headers);
}

function getRequest_(url, headers) {
  var headers = Object.assign_(headers, this.credential);
  var options = {
    method: "get",
    headers: headers
  }
  try {
    var response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

function postRequest_(url, headers, payload) {
  var  headers = Object.assign_(headers, this.credential);
  var  options = {
    method: "post",
    headers: headers,
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };
  try {
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    console.log(err);
  }
}

function patchRequest_(url, headers, payload) {
  headers = Object.assign_(headers, this.credential);
  var options = {
    method: "patch",
    headers: headers,
    contentType: "application/json",
    payload: JSON.stringify(payload)
  }
  try {
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    console.log(err);
  }
}

function putRequest_(url, headers, payload) {
  headers = Object.assign_(headers, this.credential);
  var options = {
    method: "put",
    headers: headers,
    contentType: "text/plain",
    payload: JSON.stringify(payload)
  }
  try {
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    console.log(err);
  }
}

function deleteRequest_(url, headers) {
  var headers = Object.assign_(headers, this.credential);
  var options = {
    method: "delete",
    headers: headers
  };
  try {
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    console.log(err);
  }
}

Object.assign_ = function (target, source){
  if (!target || !source)
    throw new Error("Invalid arguments.");
  for (var property in source)
    if (source.hasOwnProperty(property))
      target[property] = source[property];
  return target;
};
