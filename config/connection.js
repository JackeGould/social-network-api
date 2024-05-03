const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialNetworkDB';

connect(connectionString);

module.exports = connection;