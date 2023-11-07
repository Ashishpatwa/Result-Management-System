const form = document.getElementById('TeacherSignup');

form.addEventListener('submit',  async (event) => {
    event.preventDefault();

    const username = form.querySelector('#username').value;
    const name = form.querySelector('#name').value;
    const password = form.querySelector('#password').value;
    const Repassword = form.querySelector('#Repassword').value;


    const error = form.querySelector('#error');
    error.innerHTML = "";

    if(!username) error.innerHTML = "Please Fill Username"
    else if(!name) error.innerHTML = "Please Fill Name"
    else if(!password) error.innerHTML = "Please Fill Password"
    else if(!Repassword) error.innerHTML = "Please Fill Re-password"
    else if(Repassword != password) error.innerHTML = "Password must be same"

    else
    {
    try {
        const response = await fetch("http://localhost:3000/api/auth/signupTeacher", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                username: username,
                name: name,
                password: password
            })
        });
        const data = await response.json();
       
        if (data.error) {
            error.innerHTML = data.error;
            
        } else {
            window.location.href = '/teacher/viewPanel';
            
        }
      
          
        
    } catch (error) {
        console.log(error)
        error.innerHTML = error;
    }
}
});
