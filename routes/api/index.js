const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// add prefix of './pizzas


router.use('/pizzas', pizzaRoutes);

module.exports = router;