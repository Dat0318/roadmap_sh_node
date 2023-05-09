# DOCUMENT

https://viblo.asia/s/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-P0lPmrNv5ox

# BASH

- list items

```
curl http://localhost:7000/items -i
```

- item id 1

```
curl http://localhost:7000/items/1 -i
```

- create new item

```
curl -X POST -H 'Content-Type: application/json' -d '{
  "item": {
    "name": "Salad",
    "price": 4.99,
    "description": "Fresh",
    "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
  }
}' http://localhost:7000/items -i
```

- delete an item

```
curl -X DELETE http://localhost:7000/items/2 -i
```

```
curl -X POST -H 'Content-Type: application/json' -d '{
  "item": {
    "name": "Salad",
    "price": 4.99,
    "description": "Fresh",
    "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
  }
}' http://localhost:7000/items -i
```
