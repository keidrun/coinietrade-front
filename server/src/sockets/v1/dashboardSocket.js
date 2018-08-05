const { getAllTickers } = require('../../utils/exchangeApi');

const INTERVAL_MSEC = 1000;
const CLEAR_INTERVAL_MSEC = 1000;

const dashboardSocket = io => {
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

module.exports = dashboardSocket;
