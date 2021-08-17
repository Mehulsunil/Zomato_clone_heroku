
const Login = require('../Models/Login');
exports.getUserByLogin = (req, res) => {
    const {email,password,firstname,lastname}=req.body;
    User=({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
    })
        Login.find(User)
        .then(response => {
            res.status(200).json({ message: response!=null?"Welcome":"wrong Credintails,please try with correct details"});
        })
        .catch(err => console.log(err))
}
exports.createUserAccount=(req,res)=>{
    const{firstname,lastname,email,password}=req.body;
    
    newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    };
    Login.findOne(newUser)
.then(response =>{response!=null?res.status(200).json({message :`Error!!! user with an email of ${response.email} already`})
:Login.insertMany(newUser)
    .then(response =>{
        res.status(200).json({message:'Successfully created an account:',response});
    })
.catch(err => console.log(err))
})
.catch(err => console.log(err))
}
