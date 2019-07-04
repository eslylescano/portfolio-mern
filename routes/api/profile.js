const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile/me
// @desc      Get current user
// @access    Private
router.get('/me', auth, async(req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'email']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile this user' });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).send('Server error profile');
    }

});

module.exports = router;