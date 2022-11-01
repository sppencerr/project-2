const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepageRoutes');
const mainRoutes = require('./mainRoutes');

router.use('/api', apiRoutes);
router.use('/', homepageRoutes);
router.use('/dashboard', mainRoutes);


module.exports = router;