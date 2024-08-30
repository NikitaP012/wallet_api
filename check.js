document.addEventListener('DOMContentLoaded', function() {
    const checkBalanceButton = document.getElementById('checkBtn');
    const currentBalanceInput = document.getElementById('check');

    // Function to fetch and display the current balance
    async function fetchBalance() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You are not logged in. Please log in again.");
                return;
            }

            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:8081/checkBalance', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming the API response has a 'balance' field
                currentBalanceInput.value = data.TotalBalance;
                console.log("current Balance :",data.TotalBalance);
                
            } else if(response.status===500){
                alert("User does not exist!");
            }else if(response.status===501){
                alert("Failed to check balance");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while fetching the balance.");
        }
    }

    // Attach event listener to the button
    checkBalanceButton.addEventListener('click', fetchBalance);
});
