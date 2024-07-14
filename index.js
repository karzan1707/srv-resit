// index.js
const express = require('express');
const app = express();
const port = 3000;
const dataRoutes = require('./routes/dataRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in dataRoutes.js
app.use('/', dataRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
