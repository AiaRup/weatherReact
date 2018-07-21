let express = require('express');
// let bodyParser = require('body-parser');
// let mongoose = require('mongoose');


// mongoose.Promise = global.Promise;

// Connect to DB and check the connection
// let connection = process.env.CONNECTION_STRING || 'mongodb://localhost/restaurantDB';
// mongoose.connect(connection, { useMongoClient: true })
//   .then(() => {console.log('Successfully connected to mongoDB');})
//   .catch((error) => console.error(error));

let app = express();

// Middlewares
// app.use(express.static('public'));
// app.use(express.static('node_modules'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// PORT
const SERVER_PORT = process.env.PORT || 3001;
app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));



