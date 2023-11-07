
const db = require('../models');


const user = db.users;

// get all student api
const getStudentResult = async(req,res)=>{

   

    let roll_number = req.body.roll_number;
    let date_of_birth = req.body.date_of_birth;


    try{
        const data = await user.findOne({
            where: {roll_number: roll_number,
            date_of_birth: date_of_birth}
        })
        if(data)
        res.status(200).send(data);
        else
        res.status(400).send({ error: 'Invalid Credentials'});
    }
    catch(error){
        res.status(500).send({ error: 'Internal Server Error'});
    }

}



module.exports = {
    getStudentResult
}