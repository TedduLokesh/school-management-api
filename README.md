# 🏫 School Management API

A lightweight **Node.js + Express + MySQL** REST API for managing school data — add schools and retrieve them sorted by proximity to any location.

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MySQL 2 |
| Body Parsing | body-parser |
| CORS | cors |

---

##  Project Structure

```
school-management-api/
├── server.js       # Express app & API routes
├── db.js           # MySQL connection setup
├── package.json    # Project metadata & dependencies
└── README.md       # You are here
```

---

##  Database Setup

Create a MySQL database and table before running the server:

```sql
CREATE DATABASE schooldb;

USE schooldb;

CREATE TABLE schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255)  NOT NULL,
  address   VARCHAR(255)  NOT NULL,
  latitude  FLOAT         NOT NULL,
  longitude FLOAT         NOT NULL
);
```

---

##  Installation & Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd school-management-api

# 2. Install dependencies
npm install

# 3. Configure database credentials in db.js
#    Update host, user, password as needed

# 4. Start the server
node server.js
```

Server runs at: **`http://localhost:3000`**

---

##  API Reference

###  Add School

**`POST /addSchool`**

Adds a new school to the database after validating all required fields.

#### Request Body
```json
{
  "name": "Greenwood High School",
  "address": "123 Main Street, Hyderabad",
  "latitude": 17.3850,
  "longitude": 78.4867
}
```

#### Success Response — `200 OK`
```json
{
  "message": "School added successfully",
  "id": 1
}
```

#### Error Response — `400 Bad Request`
```json
{
  "message": "All fields required"
}
```

---

###  List Schools (Sorted by Proximity)

**`GET /listSchools`**

Fetches all schools from the database and returns them sorted by distance from the provided coordinates. Defaults to Hyderabad if no coordinates are provided.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `latitude` | float | `17.3850` | User's current latitude |
| `longitude` | float | `78.4867` | User's current longitude |

#### Example Request
```
GET /listSchools?latitude=17.3850&longitude=78.4867
```

#### Success Response — `200 OK`
```json
[
  {
    "id": 1,
    "name": "Greenwood High School",
    "address": "123 Main Street, Hyderabad",
    "latitude": 17.385,
    "longitude": 78.4867,
    "distance": 0
  },
  {
    "id": 2,
    "name": "Sunrise Academy",
    "address": "45 Lake Road, Secunderabad",
    "latitude": 17.4399,
    "longitude": 78.4983,
    "distance": 0.058
  }
]
```

> **Note:** Results are sorted by `distance` (ascending) — nearest school first.

---

##  Testing with Postman

1. Import the Postman collection (shared separately)
2. Set the base URL variable to `http://localhost:3000`
3. Use the **Add School** request to seed data
4. Use the **List Schools** request with your coordinates to verify sorted results

---

##  Notes

- Distance is currently calculated using **Euclidean distance** on raw lat/lng values (suitable for short ranges). For production use, consider switching to the **Haversine formula** for accurate geographical distances.
- Ensure MySQL service is running before starting the server.
- All four fields (`name`, `address`, `latitude`, `longitude`) are **required** for the Add School endpoint.

---

## 📄 License

ISC © School Management API
