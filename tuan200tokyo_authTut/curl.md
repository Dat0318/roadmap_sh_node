GET LOCALHOST

```
cURL -X GET http://localhost:3000/
```

GET LOCALHOST -v (verbose)

```
cURL -X GET http://localhost:3000/ -v
curl -X GET http://localhost:3000 -b cookie-file.txt -v

```

POST LOGIN

```
curl -X POST http://localhost:3000/login -b cookie-file.txt -H 'Content-Type:application/json' -d '{"email":"test@test.com", "password":"password"}'
```

POST LOGIN WITH PASSPORT LOCAL

```
curl -X POST http://localhost:3001/login -b cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test@test.com", "password":"password"}'

curl -X GET http://localhost:3001/authrequired -b cookie-file.txt -L
```
