const express = require('express');
const router = express.Router();

// @route     GET api/abilities
// @desc      Test route
// @access    Public
router.get('/', (req, res) => { res.send('Abilitie route') });

module.exports = router;