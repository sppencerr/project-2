const router = require('express').Router();

const apiRoutes = require('./api');
// const userRoutes = require('./userRoutes');
// const postRoutes = require('./postRoutes');
const homeRoutes = require('./homeRoutes');
const catRoutes = require('./catRoutes');

// router.use('/users', userRoutes);
// router.use('/projects', postRoutes);
router.use('./api', apiRoutes);
router.use('./cats',catRoutes);


module.exports = router;