const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const cors = require('cors');

//Middlewarer for parsing json
app.use(express.json());

//Enabling Cors
app.use(cors())

//Registration
app.post('/register', async(req,res)=>{
    try{
        const {username,password} = req.body;
        console.log(req.body);
        const user = new User({username,password});
        await user.save();
        res.status(201).json({message:"Registration Succesful"});
    }
    catch(error){
        res.status(500).json({error:"Registration Failed"});

    }
})

//Login
app.post('/login', async(req,res) =>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({error:'Invalid username or Password'});

        }
        if(user.password !== password){
            return res.status(401).json({error:'Invalid username or password'});

        }
        res.status(200).json({message:'Login succesful'});
    }
    catch(error){
        res.status(500).json({error:'Login failed'});
    }
})

connectDB();

app.listen(port,()=> {
    console.log('Server is listening on Port 8000')
});