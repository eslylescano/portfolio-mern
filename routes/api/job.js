const express = require('express');
const router = express.Router();

// @route     GET api/jobs
// @desc      Test route
// @access    Public
router.get('/', (req, res) => { res.send('Job route') });

module.exports = router;