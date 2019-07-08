const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post('/', [
        check('email', 'email is required').isEmail(),
        check('password',
            'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
    ],
    async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // See if user exist
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({ email, password });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();


            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'), { expiresIn: 60 * 60 * 10 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });



        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }

    });

module.exports = router;