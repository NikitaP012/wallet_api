document.addEventListener('DOMContentLoaded', function() {
    const addBalanceForm = document.getElementById('balance-form');

    addBalanceForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            // Fetch the mobile number and amount input fields
            const mobileNumberInput = document.querySelector('#mobile');
            const amountInput = document.querySelector('#amount');
            const reason = document.querySelector('#reason')
            
            const mobileNumber = mobileNumberInput.value.trim();
            const amount = amountInput.value.trim();
            const reasonInput = reason.value.trim();


            console.log("mobileNumber:", mobileNumber);
            console.log("amount:", amount);
            console.log("reason:", reasonInput)
            // Ensure the input values are valid
            // if (!mobileNumber || !amount) {
            //     alert("Please fill out both fields.");
            //     return;
            // }

            // Prepare the balance data to be sent
            const balanceData = {
                mobileno: mobileNumber,
                amount: amount,
                reason: reasonInput
            };

            console.log("balanceData:", balanceData);

            // Get the token from local storage
            const token = localStorage.getItem('token');

            if (!token) {
                alert("You are not logged in. Please log in again.");
                return;
            }

            // Send the data to the server
            let url = 'http://localhost:8081/transferBalance';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(balanceData)
            });

            console.log("response:", response);
            let data = await response.json();
            if (response.ok) {
                // let data = await response.json();
                console.log("Transaction successful:", data);

                // Update the UI with the new balance
                document.getElementById('cu-am').textContent = data.TotalBalance; // Assuming the API returns the new balance
                alert("Transaction Successful");
            } else if (response.status === 500) {
                console.log("Error message:", data.message);
                alert("Insufficient Balance.");
            } else if (response.status === 400) {
                alert("Failed to debit balance.");
            }else if (response.status === 404) {
                alert("Reciever not found.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An unexpected error occurred.");
        }
    });
});
