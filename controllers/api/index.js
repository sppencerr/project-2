const router = require('express').Router();


// const apiRoutes = require('./api');
const noteRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
//  "homeRoutes" should be "../homepageRoutes?"
const homepageRoutes = require('../homepageRoutes');

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
// router.use('/comments', commentRoutes);

// router.use('./api', apiRoutes);


module.exports = router;