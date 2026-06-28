# 📦 Simple Inventory Management System Backend

A robust, modular, RESTful backend API built using Node.js and Express. It features runtime in-memory array data persistence, integrated request-body field checking middleware validation layers, and custom fallback centralized exception error handling models.

## 🚀 Features Implemented
- **Full REST CRUD:** Individual entry creation, generalized array lookups, item parameter mutation mappings, and array element structural slicing removals.
- **Advanced Parameter Queries:** Handles complex query streams cleanly matching `name` substring parameters, exact `category` tags, or `quantity` ceiling counts.
- **Input Integrity Interceptors:** Custom middleware blocks invalid payloads, returning uniform 400 Bad Request error arrays before mutating system datasets.
- **Centralized Exception Handling:** Single-point error processing architecture translates unexpected backend faults into standard, readable JSON responses.

---

## API Endpoints Reference Matrix

| HTTP Method | API Endpoint Route Path | Purpose / Functionality | Query Params / Body Requirements |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/inventory` | Fetch All Items / Run Queries | Optional: `?name=macbook` \| `?category=electronics` \| `?quantity=10` |
| **GET** | `/api/inventory/:id` | Fetch Single Item by ID | Requires parameter `:id` payload |
| **POST** | `/api/inventory` | Insert New Item into Storage | Requires Body: `{ "name": string, "category": string, "quantity": int, "price": float }` |
| **PUT** | `/api/inventory/:id` | Update Target Item Completely | Requires parameters `:id` + Full Body parameters payload match |
| **DELETE** | `/api/inventory/:id` | Erase Target Item from Array | Requires parameter `:id` payload |
