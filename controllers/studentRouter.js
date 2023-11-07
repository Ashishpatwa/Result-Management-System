
exports.homepage = async (req, res)=>{

    const data = {
        title: "homepage",
        css: "index.css"
    }

    res.render('index', data);

}

exports.login = async(req, res)=>{

    const data = {
        title: "Student Login",
        css: "studentLogin.css"
    }

    res.render('student/login', data);
}

exports.result = async(req, res)=>{
    const token = req.cookies.token;
    const role = req.cookies.role;

    if(!token){

        const payload = { title: "401 page", css: "error.css" }
        res.render('401', payload);
        
        }
    else if(token && role != "student"){
    
        const payload = { title: "403 page", css: "error.css" }
        res.render('403', payload);
    
        }
    else{

        const data = {title: "Student Result",css: "studentResult.css"}
        res.render('student/result', data);

    }
 

    
}