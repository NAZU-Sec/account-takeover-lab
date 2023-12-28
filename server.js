// server.js

const app = require('./app/app');
require('dotenv').config();
const http = require('http');

const PORT = process.env.PORT || 3000;

// server
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
