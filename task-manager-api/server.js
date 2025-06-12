/**
 * @file server.js
 * @description This file sets up a simple REST API for a Task Manager using Express.js.
 * It demonstrates basic CRUD operations (Create, Read, Update, Delete) for tasks.
 * This project is suitable for a web development internship to showcase backend skills.
 */

// Import the Express.js framework
const express = require('express');
// Initialize the Express application
const app = express();
// Define the port the server will listen on. Using process.env.PORT for deployment flexibility,
// otherwise defaults to 3000.
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests.
// This is crucial for handling JSON data sent by clients (e.g., when adding a new task).
app.use(express.json());

// In-memory 'database' for tasks.
// In a real-world application, this would be replaced with a persistent database
// like MongoDB, PostgreSQL, MySQL, etc.
let tasks = [
    {
        id: '1',
        title: 'Learn Node.js',
        description: 'Complete a Node.js tutorial and build a basic server.',
        status: 'pending' // Possible statuses: 'pending', 'in-progress', 'completed'
    },
    {
        id: '2',
        title: 'Build REST API',
        description: 'Develop a REST API with CRUD operations using Express.js.',
        status: 'in-progress'
    },
    {
        id: '3',
        title: 'Prepare for Internship',
        description: 'Review common interview questions and technical concepts.',
        status: 'completed'
    }
];

// Helper function to generate a unique ID for new tasks.
// In a production environment, you might use a library like 'uuid'.
function generateUniqueId() {
    return Date.now().toString(); // Simple timestamp-based ID
}

// --- API Endpoints ---

/**
 * @route POST /tasks
 * @description Adds a new task to the list.
 * Expects a JSON body with 'title' and 'description'.
 * 'status' defaults to 'pending'.
 */
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    // Validate incoming data
    if (!title || !description) {
        // If title or description are missing, send a 400 Bad Request error.
        return res.status(400).json({ message: 'Title and description are required for a new task.' });
    }

    // Create a new task object
    const newTask = {
        id: generateUniqueId(), // Assign a unique ID
        title,
        description,
        status: 'pending' // Default status for new tasks
    };

    // Add the new task to our in-memory array
    tasks.push(newTask);

    // Send a 201 Created status and the newly created task object back as a response
    res.status(201).json(newTask);
    console.log('New task added:', newTask);
});

/**
 * @route GET /tasks
 * @description Retrieves all tasks from the list.
 */
app.get('/tasks', (req, res) => {
    // Send a 200 OK status and the entire tasks array as a JSON response.
    res.status(200).json(tasks);
    console.log('All tasks requested.');
});

/**
 * @route GET /tasks/:id
 * @description Retrieves a single task by its ID.
 */
app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id; // Get the task ID from the URL parameters

    // Find the task in the array by its ID
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        // If no task is found with the given ID, send a 404 Not Found error.
        return res.status(404).json({ message: `Task with ID ${taskId} not found.` });
    }

    // If the task is found, send a 200 OK status and the task object.
    res.status(200).json(task);
    console.log(`Task with ID ${taskId} requested.`);
});

/**
 * @route PUT /tasks/:id
 * @description Updates the status (or other fields) of an existing task by its ID.
 * Expects a JSON body with the fields to update (e.g., 'status').
 */
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id; // Get the task ID from the URL parameters
    const { status, title, description } = req.body; // Get the fields to update from the request body

    // Find the index of the task in the array
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        // If the task is not found, send a 404 Not Found error.
        return res.status(404).json({ message: `Task with ID ${taskId} not found.` });
    }

    // Update only the fields that are provided in the request body.
    // This allows for partial updates.
    if (title) tasks[taskIndex].title = title;
    if (description) tasks[taskIndex].description = description;
    // Basic validation for status field
    if (status) {
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (validStatuses.includes(status)) {
            tasks[taskIndex].status = status;
        } else {
            // If the status is invalid, send a 400 Bad Request error.
            return res.status(400).json({ message: 'Invalid status provided. Must be one of: pending, in-progress, completed.' });
        }
    }

    // Send a 200 OK status and the updated task object back as a response.
    res.status(200).json(tasks[taskIndex]);
    console.log(`Task with ID ${taskId} updated.`, tasks[taskIndex]);
});

/**
 * @route DELETE /tasks/:id
 * @description Deletes a task by its ID.
 */
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id; // Get the task ID from the URL parameters

    // Filter out the task with the given ID from the array.
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);

    if (tasks.length === initialLength) {
        // If the length hasn't changed, it means no task was deleted (ID not found).
        return res.status(404).json({ message: `Task with ID ${taskId} not found.` });
    }

    // Send a 204 No Content status for successful deletion (as per REST best practices).
    // No body is typically sent with 204.
    res.status(204).send();
    console.log(`Task with ID ${taskId} deleted.`);
});

// Start the server and listen for incoming requests on the specified port.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('API Endpoints:');
    console.log('  POST /tasks - Add a new task');
    console.log('  GET /tasks - Get all tasks');
    console.log('  GET /tasks/:id - Get a single task by ID');
    console.log('  PUT /tasks/:id - Update a task by ID');
    console.log('  DELETE /tasks/:id - Delete a task by ID');
});
