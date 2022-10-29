// ? Set routes to ---> /api? or do we need a "homeRoute" directory?

const router = require('express').Router();

const apiRoutes = require('./api/');

router.use('/api', apiRoutes);

module.exports = router;