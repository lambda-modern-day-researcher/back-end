require('dotenv').config();// reads .env and merges it into process.env.

const server = require('./api/server.js');

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
