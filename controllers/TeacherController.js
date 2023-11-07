
const db = require('../models');


const user = db.users;

// get all-students api
const getAllStudent = async(req,res)=>{
    
    const data = await user.findAll();
    // if(!data) data = {message: "No Student Found"}
    res.status(200).send(data);
}

// add student api
const addStudent = async(req, res)=>{

    if(!req.body.roll_number)
       return res.send({error: "Please Fill the Roll Number"});
    else if(!req.body.name)
       return res.send({error: "Please Fill the name"});
    else if(!req.body.date_of_birth)
       return res.send({error: "Please Fill the Date of Birth"});
    else if(!req.body.score )
       return res.send({error: "Please Fill the score"});
    let data = {
        roll_number: req.body.roll_number,
        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        score: req.body.score
    }

    try{
    const student = await user.create(data)
    // res.status(200).send(student)
    return res.send({message: "succesfull"});
    }
    catch(err){
        console.error(err);
        return res.send({error: err.message});
    }
}

// update student api
const updateStudent = async(req,res)=>{
    const roll_number = req.body.roll_number
    

    if(!req.body.roll_number)
       return res.send({error: "Please Fill the Roll Number"});
    else if(!req.body.name)
       return res.send({error: "Please Fill the name"});
    else if(!req.body.date_of_birth)
       return res.send({error: "Please Fill the Date of Birth"});
    else if(!req.body.score )
       return res.send({error: "Please Fill the score"});

    try{
            const student = await user.update(req.body, {where: {roll_number: roll_number}});
            return res.send({message: "succesfull"});
     }
     catch(err){
        return res.send({error: err.message});
     }
}

// delete student api
const deleteStudent = async(req,res)=>{
    const roll_number = req.body.roll_number

    const student = await user.destroy( {where: {roll_number: roll_number}});
    const data = {
        title: "view panel",
        css: "viewPanel.css"
    }
    res.render("teacher/viewPanel", data);
}

module.exports = {
    getAllStudent,
    addStudent,
    updateStudent,
    deleteStudent
}