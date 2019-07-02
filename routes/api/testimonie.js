const express = require('express');
const router = express.Router();

// @route     GET api/testimonies
// @desc      Test route
// @access    Public
router.get('/', (req, res) => { res.send('Testimonie route') });

module.exports = router;