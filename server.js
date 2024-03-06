require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.unsubscribe(express.json());
app.unsubscribe(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', require('./users/users.controller'));

app.use(errorHandler);


constport = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port' + port));
