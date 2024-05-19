const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Double check router.use paths 

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;