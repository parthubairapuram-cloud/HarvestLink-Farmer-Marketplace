# HarvestLink REST API

Base URL locally: `http://localhost:3000`. Production: replace with your Vercel URL.

| Method | Path | Auth | Success |
|---|---|---|---|
| POST | `/api/auth/register` | Public | 201 |
| POST | `/api/auth/login` | Public | 200 |
| POST | `/api/auth/logout` | Session | Redirect |
| GET | `/api/products` | Public | 200 |
| POST | `/api/products` | Farmer | 201 |
| PATCH | `/api/products/:id` | Admin | 200 |\n| POST | `/api/orders` | Buyer | 201 |
| PATCH | `/api/orders/:id` | Owning farmer | 200 |

## Register
```json
{"name":"Ravi Kumar","email":"ravi@example.com","password":"minimum8chars","role":"farmer","location":"Nandyal","farmName":"Green Fields"}
```
Role must be `farmer` or `buyer`. Password is hashed with bcrypt before storage.

## Create listing (farmer)
```json
{"name":"Tomatoes","category":"Vegetables","description":"Fresh harvest","unit":"kg","quantity":40,"price":30,"location":"Nandyal","availabilityDate":"2026-10-30","pickup":true,"delivery":false}
```

## Place order (buyer)
```json
{"productId":"<product-id>","quantity":3,"fulfillment":"pickup","note":"Optional"}
```
Stock is validated on the server and decremented when the request is created. The response includes the created order.

## Update order (farmer)
```json
{"status":"accepted"}
```
Allowed transitions: requested → accepted/cancelled; accepted → ready/cancelled; ready → completed. Invalid transitions return 409.

## Error responses
Responses use JSON such as `{"error":"Only buyer accounts can place orders."}`. Typical codes: 400 validation error, 401 unauthenticated, 403 role forbidden, 404 missing resource, 409 conflict/stock or invalid state transition, 500 server error.
