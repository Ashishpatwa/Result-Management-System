const form = document.getElementById('TeacherLogin');

form.addEventListener('submit',  async (event) => {
    event.preventDefault();

    const username = form.querySelector('#username').value;
    const password = form.querySelector('#password').value;
    const error = form.querySelector('#error');
    error.innerHTML = "";
    console.log(username, password);
    if(!username) error.innerHTML = "Please Fill Username"
    else if(!password) error.innerHTML = "Please Fill Password"
    else
    {
    try {
        const response = await fetch("http://localhost:3000/api/auth/loginTeacher", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await response.json();
        console.log(data);
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
