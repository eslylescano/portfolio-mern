const express = require('express');
const router = express.Router();

// @route     GET api/experiences
// @desc      Test route
// @access    Public
router.get('/', (req, res) => { res.send('Experience route') });

module.exports = router;