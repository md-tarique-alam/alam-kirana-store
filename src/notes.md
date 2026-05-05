# Alam Kirana Store — Notes

## Cart State

* Cart stored using `useState`
* Each item:

```js
{ id, name, price, quantity }
```

---

## Add to Cart

* Check if item exists using `find()`
* If exists → increase quantity
* Else → add item with `quantity = 1`

---

## Increase Quantity

* Use `map()`
* Match item by `id`
* Return updated item
* Return unchanged item for others

---

## Decrease Quantity

* If `quantity > 1` → decrease
* Else → return `null`
* Use `filter()` to remove `null`

---

## Key Concepts

* Use `map()` to update items
* Use `filter()` to remove items
* Always return inside `map()`
* Do not mutate state directly

---

## Current Progress

* Product list
* Add to cart
* Increase / Decrease
* Remove item

---


