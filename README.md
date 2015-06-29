![Header Image](https://raw.githubusercontent.com/hungrilla/media/master/PNGs/steak.png)

REST Endpoints for Hungrilla Database. ![Build Status](https://travis-ci.org/hungrilla/steak.svg?branch=develop) ![Dependencies Status](https://david-dm.org/hungrilla/steak.svg)

### Getting Started

```bash
# Clone this repository
$ git clone https://github.com/hungrilla/steak
# Fetch submodules
$ git submodule foreach git pull
# Install dependencies
$ npm install
# Execute script
$ npm start
```

### Controllers and endpoints

As for now, server has following controllers and endpoints:

Controller | Endpoint | Description
-----------|----------|------------
restaurant.create | POST /restaurant | Inserts a restaurant
restaurant.list | GET /restaurant  | Get a listing of restaurants
restaurant.read | GET /restaurant/:uuid | Get details about a restaurant
restaurant.update | PUT /restaurant/:uuid | Update a restaurant
restaurant.delete | DELETE /restaurant/:uuid | Delete a restaurant
menu.create | POST /menu | Inserts a menu
menu.list | GET /menu  | Get a listing of menus
menu.read | GET /menu/:uuid | Get details about a menu
menu.update | PUT /menu/:uuid | Update a menu
menu.delete | DELETE /menu/:uuid | Delete a menu

## RESTful API

Listing resources support filtering, searching, sorting, and pagination as described below.

### Filtering

Add query parameters named after fields to limit results.

```bash
$ curl http://localhost/api/v1/menu?name=Fried+Pomphret

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "uuid": "036b7880-39de-4824-be71-faee4904ceec",
    "restaurantId": "ad426ce2-56b8-43fa-a220-a493ae04f4b2",
    "name": "Fried Pomphret",
    "description": "",
    "type": "Chinese",
    "serves": "Serves 3 - 4",
    "price": "Rs 650",
    "createdAt": "2015-06-05T21:12:16.000Z",
    "updatedAt": "2015-06-05T21:12:16.000Z"
  }
]
```

### Search

Use the `q` parameter to perform a substring search across all fields.

```bash
$ curl http://localhost/api/v1/restaurant?q=Ginsoy

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "uuid": "7a5446ce-bcbb-43c2-83ef-e669e1705020",
    "url": "/karachi/ginsoy-extreme-chinese-smchs",
    "name": "Ginsoy - Extreme Chinese, SMCHS",
    "rating": 4,
    "type": "Chinese",
    "createdAt": "2015-06-05T21:09:47.000Z",
    "updatedAt": "2015-06-05T21:09:47.000Z"
  },
  {
    "uuid": "99a0cbe3-2f48-47ce-9f65-9a7b2f61ebc4",
    "url": "/karachi/ginsoy-extreme-chinese-khayaban-e-shahbaz",
    "name": "Ginsoy - Extreme Chinese",
    "rating": 4,
    "type": "Chinese",
    "createdAt": "2015-06-05T21:09:47.000Z",
    "updatedAt": "2015-06-05T21:09:47.000Z"
  },
  {
    "uuid": "caa19815-5506-4168-a1c4-a68d1b05f7d2",
    "url": "/karachi/ginsoy-extreme-chinese-north-nazimabad",
    "name": "Ginsoy Extreme Chinese, North Nazimabad",
    "rating": 3,
    "type": "Chinese",
    "createdAt": "2015-06-05T21:09:46.000Z",
    "updatedAt": "2015-06-05T21:09:46.000Z"
  }
]
```

Search behavior can be customized to change the parameter used for searching, as well as which attributes are included in the search, like so:

```javascript
var resource = epilogue.resource({
    model: model,
    endpoints: ['/restaurant', '/restaurant/:uuid'],
    search: {
      attributes: ['name', 'type']
    }
  });
```

This is restricting substring searches to the `name` & `type` attributes of the model. It can be changed alongwith a `param` string can be passed, so instead of using `q` you can use the given string as search parameter.


### Sorting

Specify the `sort` parameter to sort results.  Values are field names, optionally preceded by a `-` to indicate descending order.  Multiple sort values may be separated by `,`.

```bash
$ curl http://localhost/api/v1/restaurant?sort=name

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "uuid": "7ce29e0a-83a9-46fb-bdb6-ebdce4883928",
    "url": "/karachi/1-pound-fish-defense",
    "name": "1 Pound Fish",
    "rating": 3,
    "type": "BBQ, Seafood",
    "createdAt": "2015-06-05T21:09:47.000Z",
    "updatedAt": "2015-06-05T21:09:47.000Z"
  },
  {
    "uuid": "38588920-f109-4357-9dd5-55c200f3804d",
    "url": "/karachi/14th-street-pizza",
    "name": "14th Street Pizza, Karachi",
    "rating": 4,
    "type": "Pizza",
    "createdAt": "2015-06-05T21:09:47.000Z",
    "updatedAt": "2015-06-05T21:09:47.000Z"
  }
]
```

Sort behavior can be customized to change the parameter used for sorting, as well as which attributes are allowed to be used for sorting like so:

```javascript
  var resource = epilogue.resource({
    model: model,
    endpoints: ['/menu', '/menu/:uuid'],
    sort: {
      attributes: ['name', 'type', 'price']
    }
  });
```

This is restricting sorting to only the `name`, `type` & `price` attributes of the model.


By default all attributes defined on the model are allowed to be sorted on (Thanks, Epilogue <3). Sorting on a attribute not allowed will cause a 400 error to be returned with errors in the format:

```bash
$ curl http://localhost/users?sortby=invalid,-otherinvalid,valid

HTTP/1.1 400 BAD REQUEST
Content-Type: application/json

{
  "message": "Sorting not allowed on given attributes",
  "errors": ["invalid", "otherinvalid"]
}
```

### Pagination

List routes support pagination via `offset` or `page` and `count` query parameters.  Find metadata about pagination and number of results in the `Content-Range` response header. Pagination defaults to a default of 100 results per page, and a maximum of 1000 results per page.

```bash
# get the third page of results
$ curl http://localhost/api/v1/restaurant?offset=300&count=100

HTTP/1.1 200 OK
Content-Type: application/json
Content-Range: items 200-299/3230

[
  { "name": "Subway, Clifton Block 8", ... },
  ...
]
```

Alternatively, you can specify that pagination is disabled for a given resource by passing false to the pagination property like so:

```javascript
  var resource = epilogue.resource({
    model: model,
    endpoints: ['/menu', '/menu/:uuid'],
    pagination: false
  });
```
### Contributers:
- Umayr Shahid <umayrr@hotmail.co.uk>

### TODOs:
- [ ] Add some TODOs.
