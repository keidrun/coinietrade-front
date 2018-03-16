const socketIO = require('socket.io');
const { getAllTickers } = require('../utils/exchangeApi');

const INTERVAL_MSEC = 1000;
const CLEAR_INTERVAL_MSEC = 1000;

module.exports = server => {
  const io = socketIO(server, {
    path: '/socket'
  });

  io.on('connection', socket => {
    console.log('SERVER: connected to client');

    const dashboardTimer = setInterval(async () => {
      try {
        const res = await getAllTickers();
        socket.emit('update:dashboard', res);
      } catch (err) {
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
