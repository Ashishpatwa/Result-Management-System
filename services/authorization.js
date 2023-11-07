
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorization = (allowedRole)=>{

   return (req, res, next)=>{
    console.log(allowedRole)

    if(res.tokenPayload.role == allowedRole){
        next();
    }
    else{
      const data = {
        title: "Unauthorized user",
        css: "error.css"
       }
      // return res.render('401', data);
        return res.status(401).send({error: "403 Forbidden, you need to login as a Student to access this resource"});
    }
  }
}

module.exports = authorization