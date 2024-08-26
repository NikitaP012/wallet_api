document.addEventListener('DOMContentLoaded', function () {
    const loginpage = document.getElementById("logindetail");

    if (loginpage) {
        loginpage.addEventListener('submit', async function (e) {
            e.preventDefault();

            try {
                // Create a FormData object with the form element
                let formData = new FormData(loginpage);

                // Convert the FormData object to a plain object
                let formDataObj = {};
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });

                console.log("formDataObj", formDataObj);

                // Make the fetch request
                let response = await fetch('http://localhost:8081/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataObj)
                });

                console.log("response is", response);

                // Check if the response is ok (status code in the 200 range)
                if (response.ok) {
                    let result = await response.json();
                    console.log(result);
                    let token = result.token;
                    console.log("token",token);
                    
                    localStorage.setItem('token', token);
                    console.log('Token stored:', localStorage.getItem('token'));
                    alert(result.message);
                    // Redirect to a dashboard or homepage
                    window.location.href = "dashboard.html";
                } else if(response.status==501) {
                    console.log("HTTP Error: " + response.status);
                 
                   alert("User not exist with this email address");
                }else if(response.status==500){
                    console.log("HTTP Error: " + response.status);
                    alert("password didnt match");
                }
            } catch (error) {
                // Handle network or other errors
                console.log("Fetch Error:", error);
                alert("An error occurred. Please try again later.");
            }
        });
    }
});