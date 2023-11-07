
        
       const token = getCookie("token");
       const err = document.getElementById("error");
       const notable = document.getElementById("notable");


        fetch("http://localhost:3000/api/teacher/task/getAllStudent", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token 
            }
        })
        .then((response) => response.json())
        .then((data) => {

            console.log(data);

            if(data.error){
                    document.getElementsByClassName("mainContent")[0].style.display = "none";
                    err.textContent = data.error;
            }
            else if(!data || data.length == 0){
                document.getElementsByClassName("tableContent")[0].style.display = "none";
                notable.textContent = "No Student Result Found";
            }
            else{
                notable.style.display = "none";
                const students = data.map(item=>
                `<tr>
                            <td>${item.roll_number}</td>
                            <td>${item.name}</td>
                            <td>${item.date_of_birth.substring(0,10)}</td>
                            <td>${item.score}</td>
                            
                            <td><form action = "/teacher/editStudent" method = "POST"><input  type = "text" value = ${item.roll_number} name = "roll_number"  hidden>
                            <input  type = "text" value = ${item.name} name = "name"  hidden>
                            <input  type = "text" value = ${item.date_of_birth} name = "date_of_birth"  hidden>
                            <input  type = "text" value = ${item.score} name = "score"  hidden>
                                <input type = "submit" value = "Edit" class = "btn btn-primary">
                                </form>
                            <form action = "/teacher/deleteStudent" method = "POST">
                                <input  type = "text" value = ${item.roll_number} name = "roll_number"  hidden>
                                <input type = submit value = "delete" class = "btn btn-danger">
                            </form>
                            </td>
        
                    </tr>`
                ).join('');

                document.getElementById('studentDetails').innerHTML = students;
            }
            
        })
        .catch((error) => {
           document.getElementsByClassName("mainContent")[0].style.display = "none";
            err.textContent =  "It seems like your are unauthorized to access this page You need to login to access this page.";
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
  
