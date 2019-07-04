var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    surname: { type: String, required: false },
    phone: { type: String, required: false },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    youtube: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    postcode: { type: String, required: false },
    photo: { type: String, required: false }
});

module.exports = mongoose.model('Profile', ProfileSchema);