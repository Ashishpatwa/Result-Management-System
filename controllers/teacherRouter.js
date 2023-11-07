exports.login = async(req, res)=>{

    const data = {
        title: "Teacher login",
        css: "TeacherLogin.css",
        error: ""
    }
    
    res.render('teacher/login', data);
}

exports.signup = async(req, res)=>{



    const data = {
        title: "Teacher SignUp",
        css: "TeacherLogin.css"
    }

    res.render('teacher/signup', data);
}

exports.viewPanel = async(req, res)=>{

    const token = req.cookies.token;
    const role = req.cookies.role;

    if(!token){

        const payload = { title: "401 page", css: "error.css"}
        res.render('401', payload);
        
        }
        else if(token && role != "teacher"){
    
            const payload = { title: "403 page", css: "error.css" }
            res.render('403', payload);
    
        }
        else{
            const payload = {title: "View Pannel",css: "viewPanel.css"}
            res.render('teacher/viewPanel',payload);
        }
    
}

exports.addStudent = async(req, res)=>{

    const token = req.cookies.token;
    const role = req.cookies.role;

    if(!token){

    const payload = { title: "401 page", css: "error.css" }
    res.render('401', payload);
    
    }
    else if(token && role != "teacher"){

        const payload = { title: "403 page", css: "error.css" }
        res.render('403', payload);

    }
    else{
    const data = { title: "Add Student", css: "addStudent.css"}
    res.render('teacher/addStudent', data);
    }
}
exports.editStudent = async(req, res)=>{
    
    const token = req.cookies.token;
    const role = req.cookies.role;
    const roll_number = req.body.roll_number;
    const name = req.body.name;
    const date_of_birth = req.body.date_of_birth;
    const score = req.body.score;

    if(!token){

        const payload = { title: "401 page", css: "error.css" }
        res.render('401', payload);
        
        }
        else if(token && role != "teacher"){
    
            const payload = { title: "403 page", css: "error.css" }
            res.render('403', payload);
    
        }
        else{
            const data = { title: "Edit Student", css: "editStudent.css",roll_number: roll_number, name: name, date_of_birth: date_of_birth, score: score}
            res.render('teacher/editStudent', data);

    }
}

exports.logout = async(req, res)=>{

    const payload = { title: "TeacherLogin", css: "TeacherLogin.css"}
    res.cookie("token", "", {expires: new Date(0)});
    res.cookie("role", "", {expires: new Date(0)});
    res.cookie("roll_number", "", {expires: new Date(0)});
    res.cookie("date_of_birth", "", {expires: new Date()});
    const data = { title: "Home Page", css: "index.css"}
    res.render('index',data);

}