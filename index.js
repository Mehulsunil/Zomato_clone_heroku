const express = require('express');

const router = express.Router();

const locationController = require('../Controllers/Location');
const mealTypeController = require('../Controllers/Mealtypes');
const restaurantController = require('../Controllers/Restaurant');
const itemController = require('../Controllers/Items');
const loginController = require('../Controllers/Login');
const paymentController = require('../Controllers/Payment');

router.get('/locations', locationController.getLocations);
router.get('/mealtypes', mealTypeController.getMealTypes);
router.get('/restaurantsbylocation/:locationId', restaurantController.getRestaurantByLocation);
router.post('/filter', restaurantController.filterRestaurant);
router.get('/restaurantdetails/:restId', restaurantController.getRestaurantDetailsById);
router.get('/menuItems/:restId', itemController.getMenuItemsByRestaurant);
router.post('/login',loginController.getUserByLogin);
router.post('/signup',loginController.createUserAccount);
router.post('/payment', paymentController.payment);
router.post('/callback', paymentController.callback);
// Login 
// User SignUp 
// payment Gateway Integration
// POST order 
// GET orders by User 

module.exports = router;