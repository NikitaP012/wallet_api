document.addEventListener('DOMContentLoaded',function(){
    const name = document.getElementById('n1');
    const email = document.getElementById('e1');
    const mobile = document.getElementById('m1');
    const balance = document.getElementById('b1');
    const count = document.getElementById('lc');
    const last = document.getElementById('ll');


    async function profile(){
        try{
            const token = localStorage.getItem('token');
            if(!token){
                alert("You are not logged in. Please log in again.");
                return;
            }

            const response = await fetch('http://localhost:8081/profile',{
                method: 'GET',
                headers: {
                  'Authorization': `${token}`
                }
            });

            if(response.ok){
                const data = await response.json();
                name.value = data.UserData.name;
                email.value = data.UserData.email;
                mobile.value = data.UserData.mobileno;
                balance.value = data.UserData.balance;
                count.value = data.UserData.logincount;
                last.value = data.UserData.lastlogin;
            }else if(response.status===401){
                alert("Unauthorized access. Please log in.")

            }
        }
        catch(error){
            console.error('Error:', error);
            alert("An error occurred while fetching the balance.");
        }
    }
    profile();

})
