const Restaurant = require('../Models/Restaurant');

exports.getRestaurantByLocation = (req, res) => {
    const locationId=req.params.locationId;
    Restaurant.find({location_id: locationId})
        .then(response => {
            res.status(200).json({ message: 'Restaurant Fetched Succesfully', restaurants: response });
        })
        .catch(err => console.log(err))
}

exports.filterRestaurant = (req,res) => {
    let { location, mealtype, cuisine, lcost, hcost, page, sort}=req.body;
    page = page ? page : 1;
    sort = sort ? sort : 1;
    const itemsperPage = 2;
    let payload = {};

    if(mealtype){
        payload = {
            mealtype_id : mealtype
        }
    }
    if(location){
        payload = {
            location_id:location
        }
    }
    if(mealtype && location){
        payload = {
            mealtype_id : mealtype,
            location_id : location
        }
    }
    
    if(mealtype && cuisine ){
        payload = {
            mealtype_id : mealtype,
            "cuisine_id.id" : { $in : cuisine}
        }
    }

    if (mealtype && lcost && hcost){
        payload = {
            mealtype_id : mealtype,
            min_price : { $lte : hcost , $gte : lcost}
        }
    }
    if (mealtype && location && cuisine){
        payload = {
            mealtype_id : mealtype,
            location_id : location,
            "cuisine_id.id" : { $in : cuisine}
        }
    }
    if (mealtype && location && lcost && hcost){
        payload = {
            mealtype_id : mealtype,
            location_id : location,
            min_price : { $lte : hcost , $gte : lcost}
        }
    }
    if (mealtype && cuisine && lcost && hcost){
        payload = {
            mealtype_id : mealtype,
            "cuisine_id.id" : { $in : cuisine},
            min_price : { $lte : hcost , $gte : lcost}
        }
    }
    
    Restaurant.find(payload).sort({ min_price : sort})
        .then(response => {
            // Pagination logic 
           const filterResponse=response.slice((page - 1)*itemsperPage, page * itemsperPage);
           
        //const s = page + (page - 1);  // var s to make look it simpler
        //const filteredresponse = response.slice(s-1, s+1);
        var pageCount = [];
        if(response.length %2 != 0){
            response.length = response.length + 1;
        }
        var r = response.length/2;
        var p = 1;
        while(p <=r ){
            pageCount.push(p);
            p++;
        }
        res.status(200).json({ message: 'Restaurants fetched successfully', pageCount ,restaurants : filterResponse  })
        })
        .catch(err => console.log(err))
}

exports.getRestaurantDetailsById = (req , res) =>{
    const restId = req.params.restId;
    console.log(restId);
    Restaurant.findOne({_id:restId})
        .then(response => {
        res.status(200).json({ message: 'Restaurants fetched successfully', restaurants : response })
        })
        .catch(err => console.log(err))
}
