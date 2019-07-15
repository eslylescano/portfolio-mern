const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route     GET api/profile/me
// @desc      Get current user profile
// @access    Private
router.get('/me', auth, async(req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user', ['email'], User
        );

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile this user' });
        }

        res.json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error profile');
    }

});


// @route     POST api/profile/
// @desc      Create or update user profile
// @access    Private
router.post('/', auth, [
    check('name', 'Name is required').not().isEmpty()
], async(req, res) => {

    const profileFields = {};
    profileFields.user = req.user.id;
    const {
        name,
        surname,
        date_of_birth,
        phone,
        facebook,
        google,
        linkedin,
        instagram,
        github,
        youtube,
        twitter,
        city,
        address,
        postcode,
        photo,
        short_description,
        long_description,
        position,
        job_from_date,
        job_to_date,
        hol_from_date,
        hol_to_date
    } = req.body;

    if (name) profileFields.name = name;
    if (date_of_birth) profileFields.date_of_birth = date_of_birth;
    if (surname) profileFields.surname = surname;
    if (surname) profileFields.surname = surname;
    if (phone) profileFields.phone = phone;
    if (city) profileFields.city = city;
    if (address) profileFields.address = address;
    if (postcode) profileFields.postcode = postcode;
    if (photo) profileFields.photo = photo;
    if (short_description) profileFields.short_description = short_description;
    if (long_description) profileFields.long_description = long_description;

    //Current job
    profileFields.current_job = {};
    if (position) profileFields.curent_job = position;
    if (job_from_date) profileFields.curent_job = job_from_date;
    if (job_to_date) profileFields.curent_job = job_to_date;

    //holidays
    profileFields.holidays = {};
    if (hol_from_date) profileFields.curent_job = hol_from_date;
    if (hol_to_date) profileFields.curent_job = hol_to_date;

    //Social Media
    profileFields.social = {};
    if (facebook) profileFields.social = facebook;
    if (google) profileFields.social = google;
    if (linkedin) profileFields.social = linkedin;
    if (instagram) profileFields.social = instagram;
    if (github) profileFields.social = github;
    if (youtube) profileFields.social = youtube;
    if (twitter) profileFields.social = twitter;
    try {

        let profile = await Profile.findOne({ user: req.user.id });

        //update
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).populate(
                'user', ['email'], User
            );

            return res.json(profile);
        }

        //create
        profile = new Profile(profileFields).populate(
            'user', ['email'], User
        );

        await profile.save();

        return res.json(profile);


    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});


// @route     Get api/profile
// @desc      Get all profiles
// @access    Public
router.get("/", async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['email'], User);
        res.json(profiles);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route     Get api/profile/user/:user_id
// @desc      Get profile by user ID
// @access    Public
router.get("/user/:user_id", async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['email'], User);
        if (!profile) {
            res.status(400).json({ msg: "Profile not found" });
        }
        res.json(profile);
    } catch (err) {
        if (err.kind == "ObjectId") {
            res.status(400).json({ msg: "Profile not found" });
        }
        console.log(err);
        res.status(500).send('Server Error');
    }
});


// @route     DELETE api/profile/user/:user_id
// @desc      DELETE profile and user
// @access    Private
router.delete("/", auth, async(req, res) => {
    try {
        //@todo - remove users posts

        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        if (err.kind == "ObjectId") {
            res.status(400).json({ msg: "Profile not found" });
        }
        console.log(err);
        res.status(500).send('Server Error');
    }
});




module.exports = router;