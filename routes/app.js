var express = require('express');

var app = express();

app.get('/', (req, res) => { res.send('API Running') });

//Defining routes
app.use('/api/abilities', require('./api/abilitie'));
app.use('/api/experiences', require('./api/experience'));
app.use('/api/jobs', require('./api/job'));
app.use('/api/users', require('./api/user'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/profile', require('./api/profile'));

module.exports = app;