const router = require('express').Router();

const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/comments', commentRoutes);

module.exports = router;