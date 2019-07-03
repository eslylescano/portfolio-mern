const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//const db = "mongodb://localhost/portfolio-mean";
const connectDB = async() => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        //close the app if fails
        process.exit(1);
    }
}

module.exports = connectDB;