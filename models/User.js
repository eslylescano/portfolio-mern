var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    passwrod: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    youtube: { type: String, required: false },
    city: { type: String, required: false },
    photo: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);