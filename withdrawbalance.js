import { current_value } from './currentbalance.js';

document.addEventListener('DOMContentLoaded', async function() {
    let Totalbalance=await current_value();
    document.getElementById('cu-am').textContent = Totalbalance
    console.log("Totalbalance",Totalbalance);
    
    const addBalanceForm = document.getElementById('balance-form');

    addBalanceForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
            
            const amountInput = document.querySelector('#amount');
            const balanceAmount = amountInput.value.trim();
            if (isNaN(balanceAmount) || balanceAmount <=0) {
                alert("Invalid Number");
                return;
            }

        try {
            console.log("balanceAmount",balanceAmount);
            

           
            const balanceData= {
                balance: balanceAmount
            };
            console.log("balance",balanceData);
            

            const token = localStorage.getItem('token');

            if (!token) {
                alert("You are not logged in. Please log in again.");
                return;
            }
            let url = 'http://localhost:8081/withdrawBalance';

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(balanceData)
            });

            console.log("response is",response);
            

            if (response.ok) {
                let data = await response.json();
                console.log("data withdraw successfully");
                // Optionally update the UI with the new balance
                document.getElementById('cu-am').textContent = data.TotalBalance; // Assuming the API returns the new balance
                alert("balance withdrawn successfully");
                // window.location.href = "dashboard.html";
            } else if(response.status===500) {
                let data = await response.json();
                console.log("message",data.message);
                alert("Failed to withdraw balance!")
            }
            else if(response.status==400){
                alert("An error occurred. Please try again.");
            }else if(response.status==502){
                alert("Insufficient balance");
            }  
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while Withdraw balance")
        }
    });
});


