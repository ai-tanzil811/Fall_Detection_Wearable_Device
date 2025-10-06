import dotenv from 'dotenv';
import http from 'node:http';
import { Server as IOServer } from 'socket.io';
import initMongo from './loaders/db.js';
import buildExpress from './loaders/express.js';
import config from './config.js';

// Connect Mongo first
dotenv.config();
await initMongo(config.mongoUri);

// HTTP + Socket.IO
const server = http.createServer();
const io = new IOServer(server, {
  cors: { origin: config.dashboardOrigin, credentials: true },
});

// Express app (mounted onto same server)
const app = buildExpress(io);
server.on('request', app);

// Socket handlers
io.on('connection', (socket) => {
  socket.on('joinDevice', (deviceId) => socket.join(deviceId));
});

const port = config.port || 8080;

// Handle server errors (e.g., port already in use)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${port} is already in use.`);
    console.error('\nTo fix this issue, try one of the following:\n');
    console.error('1. Kill the process using the port:');
    console.error(`   lsof -ti :${port} | xargs kill -9`);
    console.error('\n2. Or change the PORT in your .env file:');
    console.error('   PORT=8081\n');
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

server.listen(port, () => console.log(`Server started on port :${port}`));
