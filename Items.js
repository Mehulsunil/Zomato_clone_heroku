const Items = require('../Models/Items');

exports.getMenuItemsByRestaurant = (req , res)=>{
    const restId = req.params.restId;

    Items.find({restaurantId : restId})
    .then(response => {
        res.status(200).json({ message: 'Menu Items Fetched Succesfully', items: response });
    })
    .catch(err => console.log(err))
}