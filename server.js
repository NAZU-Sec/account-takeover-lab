// server.js

const app = require('./app/app');
const http = require('http');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// server
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
