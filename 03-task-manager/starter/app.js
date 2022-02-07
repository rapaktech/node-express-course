require('dotenv').config();
const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const connectDB = require('./db/connect');
const port = process.env.PORT;

// middleware
app.use(express.static('./public'));
app.use(express.json());

// task routes
app.use('/api/v1/tasks', taskRoutes);

const start = async () => {
    try {
        await connectDB();
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.error(error);
    }
}

start();