document.addEventListener('DOMContentLoaded', function() {
    const addBalanceForm = document.getElementById('balance-form');

    addBalanceForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const amountInput = document.getElementById('amount');
            const balanceAmount = amountInput.value.trim();

            if (balanceAmount === "" || parseFloat(balanceAmount) <= 0) {
                alert("Please enter a valid amount.");
                return;
            }

            const balance = {
                addbalance: balanceAmount
            };

            const token = localStorage.getItem('token');

            if (!token) {
                alert("You are not logged in. Please log in again.");
                return;
            }

            let response = await fetch('http://localhost:8081/addBalance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(balance)
            });
            console.log("response is",response);
            

            if (response.ok) {
                let data = await response.json();
                console.log('Success:', data);
                // Optionally update the UI with the new balance
                document.getElementById('cu-am').textContent = data.TotalBalance; // Assuming the API returns the new balance
                alert("balance added successfully");
                window.location.href = "dashboard.html";
            } else if(response.status==500) {
                console.log("failed to add balance");
                alert("Failed to add balance")
            }
            else {
                alert("An error occurred. Please try again.");
            } 
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred")
        }
    });
});


