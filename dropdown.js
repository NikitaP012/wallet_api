// script for dropdown button

// Get the elements


const userIcon = document.getElementById('userIcon');
const dropdownMenu = document.getElementById('dropdownMenu');


userIcon.addEventListener('click', function (event) {
 event.preventDefault(); 
dropdownMenu.style.display = 'block';

})

window.addEventListener('click', function (event) {
    if (!event.target.closest('.user-dropdown')) {
        dropdownMenu.style.display = 'none';
    }
});



// logout button function

document.getElementById('logout').addEventListener('click', function () {
   
    localStorage.removeItem('token'); 
    sessionStorage.removeItem('token'); 


    window.location.href = 'login.html';  
});







// function for save changes in profile page


document.addEventListener('DOMContentLoaded', function() {
const profile = document.querySelector(".profile");
const saveBtn = document.getElementById('saveChanges');

async function editUser() {
    

    try {

        const name = document.getElementById('n1');
        const email = document.getElementById('e1');
        const mobile = document.getElementById('m1');

        const name1 = name.value.trim();
        const email1 = email.value.trim();
        const mobile1 = mobile.value.trim();

        console.log("name:", name1);
        console.log("email", email1);
        console.log(("mobile", mobile1));


        const userdata = {

            name: name1,
            email: email1,
            mobileno: mobile1
        };

        console.log("edited data", userdata);

        const token = localStorage.getItem('token');

        if (!token) {
            alert("You are not logged in. Please login again.")
            return;
        };

        let url = 'http://localhost:8081/editprofile';

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(userdata)
        });

        console.log("response", response);
        let data = await response.json();
        if (response.ok) {
            console.log("User Updated Successfully",data);
            alert("User Updated Successfully");
        }else if(response.status===400){
            console.log("Failed to Update User",data.message);
            
        }else if(response.status===501){
            console.log("user not exist or Token is not Valid");
            
        }
}

    catch (error) {
        console.error('error',error);
        
        
    }

}
saveBtn.addEventListener('click',editUser);
})





// name and email are passed in dropdown page

document.addEventListener('DOMContentLoaded', function(){

    const pro_name = document.getElementById('profile_name');
    const pro_email = document.getElementById("profile_email");
    const token = localStorage.getItem('token');
    
    async function nameEmail(){
        console.log("hello");
        
        try{
            if(!token){
                alert("You are not logged in. Please logged in again.");
                return;
            }
            
            const response = await fetch('http://localhost:8081/profile',{
                method: 'GET',
                
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type':'application/json'
                }
            });
            if(response.ok){
                const data = await response.json();
                
                
                if (pro_name && pro_email) {
                    pro_name.value = data.UserData.name;
                    console.log();
                    
                    pro_email.value = data.UserData.email;
                    console.log("email",pro_email);
                    
                } else {
                    console.error("Profile elements not found in the DOM.");
                }
                console.log("name",data.UserData.name);
                
                // pro_name.value = data.UserData.name;
                // pro_email.value = data.UserData.email;
            }else if(response.status===401){
                alert("Unauthorized access. Please log in.")
                
            }
        }
        
        catch(error){
            console.error('Error:', error);
            alert("An error occurred while fetching the balance.");
        }
    }
     nameEmail();
    
})
