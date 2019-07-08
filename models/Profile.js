var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    phone: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    postcode: { type: String, required: false },
    photo: { type: String, required: false },
    curret_job: {
        position: { type: String, required: false },
        from_date: { type: Date, required: false },
        to_date: { type: Date, default: Date.now, required: false }
    },
    holidays: {
        from_date: { type: Date, required: false },
        to_date: { type: Date, required: false }
    },
    short_description: { type: String, required: false },
    long_description: { type: String, required: false },
    social: {
        facebook: { type: String, required: false },
        google: { type: String, required: false },
        linkedin: { type: String, required: false },
        instagram: { type: String, required: false },
        github: { type: String, required: false },
        youtube: { type: String, required: false },
        twitter: { type: String, required: false }
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);