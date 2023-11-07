const form = document.getElementById('TeacherUpdate');

form.addEventListener('submit',  async (event) => {
    event.preventDefault();

    const token = getCookie("token");
    const roll_number = form.querySelector('#roll_number').value;
    const name = form.querySelector('#name').value;
    const date_of_birth = form.querySelector('#date_of_birth').value;
    const score = form.querySelector('#score').value;
    const error = form.querySelector('#error');
    error.innerHTML = "";


    try {
        const response = await fetch("http://localhost:3000/api/teacher/task/updateStudent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({
                roll_number: roll_number,
                name: name,
                date_of_birth: date_of_birth,
                score: score
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
        console.error("Error:", error);
    }
});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
