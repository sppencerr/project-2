const router = require('express').Router();
const routesMain = require('./routesMain');
const apiRoutes = require('./api/');
router.use('/', routesMain);
router.use('/api', apiRoutes);

module.exports = router;