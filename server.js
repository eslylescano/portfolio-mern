const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect DB
connectDB();

//Init Middelware
app.use(express.json({ extended: false }));


//Routes
app.use('/', require('./routes/app'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));