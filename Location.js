const Location = require('../Models/Location');

exports.getLocations = (req, res) => {
    Location.find()
        .then(response => {
            res.status(200).json({ message: 'Locations Fetched Succesfully', locations: response });
        })
        .catch(err => console.log(err))
}