const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route     GET api/users
// @desc      Register user
// @access    Public
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Name is required').isEmail(),
        check('password',
            'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
    ],
    async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            surname,
            email,
            password,
            address,
            postcode,
            city,
            phone,
            facebook,
            twitter,
            youtube,
            photo
        } = req.body;

        try {
            // See if user exist
            let user = await User.findOne({ email });

            if (user) {
                return sres.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({
                name,
                surname,
                email,
                password,
                address,
                postcode,
                city,
                phone,
                facebook,
                twitter,
                youtube,
                photo
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            // Return jsonwebtoken

            res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }

    });

module.exports = router;