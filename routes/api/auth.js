const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }

});

// @route     POST api/auth
// @desc      Login user
// @access    Public
router.post('/', [
        check('email', 'Please enter a valid Email').isEmail(),
        check('password', 'Please enter a valid password').exists()
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

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }


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