
        const token = getCookie("token");
        const roll_number = getCookie("roll_number");
        const date_of_birth = getCookie("date_of_birth");
        const err = document.getElementById("error");
      
   
        console.log(token, date_of_birth, roll_number, document.cookie);

        fetch("http://localhost:3000/api/student/task/getStudentResult", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({
                roll_number: roll_number,
                date_of_birth: date_of_birth
            })
        })
        .then((response) => response.json())
        .then((data) => {

            const rollNumberElement = document.getElementById("rollNumber");
            const nameElement = document.getElementById("name");
            const dateOfBirthElement = document.getElementById("dateOfBirth");
            const scoreElement = document.getElementById("score");
    
            rollNumberElement.textContent =  data.roll_number;
            nameElement.textContent = data.name;
            dateOfBirthElement.textContent = data.date_of_birth.substring(0,10);
            scoreElement.textContent = data.score;

            if(data.error){

                document.getElementsByClassName("mainContent")[0].style.display = "none";
                err.textContent =  data.error;

            }
            
        })
        .catch((error) => {
           document.getElementsByClassName("mainContent")[0].style.display = "none";
            err.textContent =  "Something went wrong! Please try again later";
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
  