const MealType = require('../Models/Mealtype');

exports.getMealTypes = (req, res) => {
    MealType.find()
        .sort({ mealtype_id: 1 })
        .then(response => {
            res.status(200).json({ message: 'MealTypes Fetched Succesfully', mealtypes: response });
        })
        .catch(err => console.log(err))
}