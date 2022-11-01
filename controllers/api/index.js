const router = require('express').Router();


const apiRoutes = require('./api');
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/comments', commentRoutes);

router.use('./api', apiRoutes);


module.exports = router;