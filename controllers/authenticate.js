const db = require('../models');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
require('dotenv').config();



const secretKey = process.env.ACCESS_TOKEN;

// Teacher Login api
const loginTeacher = async (req, res)=>{
    let {username, password } = req.body;

    try{ 
    let isAvailable = await db.teachers.findOne({
        where:{username : username}
    })

    if(!isAvailable) 
       return res.status(401).send({ error: 'Username doesnot exist'})
   
    let isMatchPassword = bcrypt.compareSync(password, isAvailable.password);

    if(!isMatchPassword) 
       return res.status(401).send({ error: 'Invalid Username and Password'})
    
    const payload = {username: username, role: "teacher"}
    //generate Token
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
    const role =  "teacher";

    //store token in session table
    await db.sessions.create({
        userId: username,
        jwt: token,
        status: 'Active'
    })

    const expirationTime = new Date(Date.now() + 5 * 60 * 60 * 1000);

    res.cookie('token', token, { expires: expirationTime });
    res.cookie('role', role , { expires: expirationTime });

    const payloads = {
        title: "View Panel",
        css: "viewPanel.css"
    }
    // res.render('teacher/viewPanel', payloads);

    res.status(200).send({message: "Login Successfully"});

   

   }

    catch(error){
        res.status(500).send({ error: 'Internal Server Error...'});
    }


}
// Teacher SignUp api
const signupTeacher = async (req, res)=>{

    let {username, name, password} = req.body;


    let isAvailable = await db.teachers.findOne({
        where:{username : username}
    })
   
    if(isAvailable) return res.status(401).send({ error: 'Username Already exist'})
     console.log(username, isAvailable)
    //encrypt
    var passwordHash = bcrypt.hashSync(password, salt);

    let data = {
        username : username,
        name : name,
        password: passwordHash
    }

    const teacher = await db.teachers.create(data);

    const payload = {username: username, role: "teacher"}
    //generate Token
    var token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
    const role = "teacher";

    //store token in session table
    await db.sessions.create({
        userId: username,
        jwt: token,
        status: 'Active'
    })

    const expirationTime = new Date(Date.now() + 5 * 60 * 60 * 1000);

    res.cookie('token', token, { expires: expirationTime });
    res.cookie('role', role , { expires: expirationTime });

    const payloads = {
        title: "View Panel",
        css: "viewPanel.css"
    }

    // res.render('teacher/viewPanel', payloads);
    res.status(200).send({message: "Teacher created successfully"});

}


//student
const loginStudent = async (req, res)=>{
    let {roll_number, date_of_birth } = req.body;

    console.log(roll_number,date_of_birth, "ff")

    try{
        
        const isAvailable = await db.users.findOne({
            where: {roll_number: roll_number,
            date_of_birth: date_of_birth}
        }) 
    
        if(!isAvailable) return res.status(401).send({ error: 'Invalid Roll Number and Date of Birth'});

        const payload = {roll_number: roll_number, role: "student"}
        //generate Token
        var token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
        const role = "student";

        //store token in session table
        await db.sessions.create({
            userId: roll_number,
            jwt: token,
            status: 'Active'
        })
        
        const expirationTime = new Date(Date.now() + 5 * 60 * 60 * 1000);

        // Set the cookie with a 5-hour expiration time
        console.log(secretKey);
        res.cookie('token', token, { expires: expirationTime });
        res.cookie('roll_number',roll_number , { expires: expirationTime});
        res.cookie('date_of_birth',date_of_birth , { expires: expirationTime });
        res.cookie('role', role , { expires: expirationTime });
        
        res.status(200).send({message: "Login Successfully"});
    

        }
        catch(error){
            res.status(500).send({ error: 'Internal Server Error...'});
        }

}


module.exports = {
    loginTeacher,
    signupTeacher,
    loginStudent
}
