# Database design

MongoDB collections:

- `users`: one document per account. `role` distinguishes farmer and buyer. Email is unique. Password stores a bcrypt hash only.
- `products`: each listing references its farmer via `farmer` ObjectId. `quantity` is current available stock; `status` is active/hidden. A text index supports product/location/description search.
- `orders`: each order references buyer and farmer and stores an item snapshot (`name`, `quantity`, `unit`, `unitPrice`) so the order remains readable if listing details change.

Relationships:
```text
User (farmer) 1 ---- * Product
User (buyer)  1 ---- * Order
User (farmer) 1 ---- * Order
Product       1 ---- * Order item snapshot
```

Inventory rule: an order request reduces the available quantity. A farmer cancellation restores the quantity. The prototype should be upgraded to use MongoDB transactions/atomic conditional updates before handling concurrent real-world orders.
