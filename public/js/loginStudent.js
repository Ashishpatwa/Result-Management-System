const form = document.getElementById('StudentLogin');

form.addEventListener('submit',  async (event) => {
    event.preventDefault();

    const roll_number = form.querySelector('#roll_number').value;
    const date_of_birth = form.querySelector('#date_of_birth').value;
    const error = form.querySelector('#error');
    error.innerHTML = "";

    if(!roll_number) error.innerHTML = "Please fill roll Number"
    else if(!date_of_birth) error.innerHTML = "Please fill Date of Birth"
    else
    {
            try {
                const response = await fetch("http://localhost:3000/api/auth/loginStudent", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                        roll_number: roll_number,
                        date_of_birth: date_of_birth
                    })
                });
                const data = await response.json();
                console.log(data);
                if (data.error) {
                    error.innerHTML = data.error;
                    
                } else {

                    window.location.href = '/student/result';
                    
                }
            
                
                
            } catch (error) {
                console.error("Error:", error);
            }
   }
});
