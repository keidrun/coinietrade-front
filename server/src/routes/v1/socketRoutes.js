const socketIO = require('socket.io');
const { getAllTickers } = require('../../utils/exchangeApi');

const RESOURCE_NAME = 'socket';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;

const INTERVAL_MSEC = 1000;
const CLEAR_INTERVAL_MSEC = 1000;

module.exports = server => {
  const io = socketIO(server, {
    path: URI,
  });

  io.on('connection', socket => {
    console.log('SERVER: connected to client');

    const dashboardTimer = setInterval(async () => {
      try {
        const response = await getAllTickers();
        socket.emit('update:dashboard', response);
      } catch (error) {
        socket.emit('update:dashboard', {});
      }
    }, INTERVAL_MSEC);

    socket.on('disconnect', () => {
      console.log('SERVER: disconnected from client');
      setTimeout(() => {
        clearInterval(dashboardTimer);
      }, CLEAR_INTERVAL_MSEC);
    });
  });
};
