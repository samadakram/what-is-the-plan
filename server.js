const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 4000;


// Middleware
app.use(bodyParser.json());

// API routes
app.use('/api', require('./routes/authRoutes'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});