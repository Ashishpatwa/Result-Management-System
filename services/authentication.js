
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next)=>{

    const authHeader = req.headers['authorization'];
    const token  = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token == null){

        res.status(401).send({error: "Unauthorized User"});

    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response)=>{
        
        if(err){
            res.status(403).send({error: err});
        }


        res.tokenPayload = response
   
        next();
    })

}

module.exports = authenticate