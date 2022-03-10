// require your server and launch it
const server = require('./api/server');

const PORT = 9000 || process.env;

server.listen(PORT, () => {
  console.log(`*** LISTENING ON PORT ${PORT} ***`)
});
