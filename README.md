
# Task Manager REST API

## Description

This project implements a simple RESTful API for managing tasks. It allows users to add, retrieve, update, and delete tasks, showcasing fundamental CRUD operations. Designed with **Express.js** and **Node.js**, this API serves as a solid foundation for backend task management systems.

---

## Concepts Covered

- **Express.js**: Minimalist web framework for building APIs.
- **REST API Principles**: Proper use of HTTP methods (GET, POST, PUT, DELETE) and status codes.
- **CRUD Operations**: Create, Read, Update, Delete functionality.
- **JSON Handling**: Receiving and responding with JSON.
- **Routing**: Clean, RESTful endpoint definitions.
- **Middleware**: Using `express.json()` to parse JSON request bodies.
- **In-Memory Data Storage**: Temporary data storage using JavaScript arrays.

---

## Features

- Add new tasks with title, description, and default `pending` status.
- Retrieve all tasks.
- Retrieve a task by its unique ID.
- Update task details (status, title, description).
- Delete a task by ID.

---

## Technologies Used

- **Node.js** – JavaScript runtime.
- **Express.js** – Web framework for building RESTful APIs.
- **Postman** – Recommended tool for testing APIs.

---

## Setup Instructions

### Step 1: Create Project Folder
```bash
mkdir task-manager-api
cd task-manager-api
````

### Step 2: Initialize Node.js Project

```bash
npm init -y
```

### Step 3: Install Express

```bash
npm install express
```

### Step 4: Create `server.js`

Create a file named `server.js` in the root of your project and paste your API code there.

---

## How to Run the Server

Start the server with Node.js:

```bash
node server.js
```

Once running, the API will be available at:

```
http://localhost:3000
```

---

## API Endpoints

### Base URL

```
http://localhost:3000
```

---

### 1. Add New Task

**Endpoint:** `POST /tasks`
**Description:** Creates a new task.

**Request Body (JSON):**

```json
{
  "title": "My New Task",
  "description": "Details about my new task."
}
```

**Success Response:** `201 Created`

```json
{
  "id": "1718037300000",
  "title": "My New Task",
  "description": "Details about my new task.",
  "status": "pending"
}
```

**Error Response:** `400 Bad Request` if title or description is missing.

---

### 2. Get All Tasks

**Endpoint:** `GET /tasks`
**Description:** Retrieves all tasks.

**Success Response:** `200 OK`

```json
[
  { "id": "1", "title": "Learn Node.js", "description": "...", "status": "pending" },
  { "id": "2", "title": "Build REST API", "description": "...", "status": "in-progress" }
]
```

---

### 3. Get Task by ID

**Endpoint:** `GET /tasks/:id`
**Description:** Retrieves a task by ID.

**Example:** `GET /tasks/1`

**Success Response:** `200 OK`

```json
{
  "id": "1",
  "title": "Learn Node.js",
  "description": "Understand core concepts of Node.js",
  "status": "pending"
}
```

**Error Response:** `404 Not Found` if ID is not found.

---

### 4. Update Task

**Endpoint:** `PUT /tasks/:id`
**Description:** Updates task status, title, or description.

**Example:** `PUT /tasks/2`

**Request Body (JSON):**

```json
{
  "status": "completed",
  "description": "Finished the REST API development."
}
```

**Success Response:** `200 OK` with updated task object.

**Error Responses:**

* `404 Not Found` if task ID doesn't exist.
* `400 Bad Request` for invalid input (e.g., empty fields).

---

### 5. Delete Task

**Endpoint:** `DELETE /tasks/:id`
**Description:** Deletes task by ID.

**Example:** `DELETE /tasks/3`

**Success Response:** `204 No Content`

**Error Response:** `404 Not Found` if ID doesn't exist.

---

## Testing with Postman

1. **Download Postman:** [www.postman.com/downloads](https://www.postman.com/downloads/)
2. **Run the Server:** `node server.js`
3. **Send Requests:** Use appropriate HTTP methods (GET, POST, PUT, DELETE) and URLs like:

   * `http://localhost:3000/tasks`
   * `http://localhost:3000/tasks/:id`
4. **Headers:** Set `Content-Type: application/json` for POST and PUT requests.
5. **Body:** Use raw JSON data for request body inputs.

---

## Created By

**Shivam Satapara**

```
