const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

//this file basically defines the middleware that the routes will access.
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;