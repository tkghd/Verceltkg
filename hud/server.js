
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3200;

io.on('connection', (socket) => {
  console.log('HUD Client Connected');
  socket.emit('status', { module: 'HUD', state: 'ACTIVE' });
});

httpServer.listen(PORT, () => {
  console.log(`💠 HUD Server running on port ${PORT}`);
});
