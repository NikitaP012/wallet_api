//  This is the signin page
const thisForm = document.getElementById("myForm");

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
        // Create a FormData object with the form element
        let formData = new FormData(thisForm);
        console.log("formData",formData);
        
        
        // Convert the FormData object to a plain object
        let formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        console.log("formDataObj", formDataObj);

        // Make the fetch request
        let response = await fetch('http://localhost:8081/signup', {
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
            alert(result.message);
            console.log(result);
            window.location.href = "login.html";
        } else {
            console.log("HTTP Error: " + response.status);
            alert("An error occurred: " + response.statusText);
        }
    } catch (error) {
        // Handle network or other errors
        console.log("Fetch Error:", error);
        alert("An error occurred. Please try again later.");
    }
});






