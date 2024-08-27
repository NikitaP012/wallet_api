


    async function fetchBalance() {
    try {
      const token = localStorage.getItem('token');
        if (!token) {
            alert("You are not logged in. Please log in again.");
            return;
        }

        // Fetch user data from the API
        const response = await fetch('http://localhost:8081/transactionHistory', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("response",response);
        

        if (!response.ok) {
            if (response.status === 401) {
                alert("Unauthorized access. Please log in.");
            } else {
                alert("Failed to fetch user data.");
            }
            return;
        }

        const data = await response.json();
        console.log(data);
        console.log(data.Transactions[0].id);
        

        // Display user data in the table
        let output = `
            <tr>
                <th class='data'>ID</th>
                <th class='data'>Date</th>
                <th class='data'>Sender</th>
                <th class='data'>Reciever</th>
                <th class='data'>Amount</th>
                <th class='data'>Reason</th>
                <th class='data'>Status</th>
                <th class='data'>CreatedAt</th>
                <th class='data'>UpdatedAt</th>
            </tr>`
           
            for(i=0; i<data.length; i++){
                 output += ` <tr>
                <td>${data.Transactions[i].id}</td>
                 <td>${data.Transactions[i].date}</td>
                  <td>${data.Transactions[i].sender}</td>
                   <td>${data.Transactions[i].reciever}</td>
                    <td>${data.Transactions[i].amount}</td>
                     <td>${data.Transactions[i].reason}</td>
                      <td>${data.Transactions[i].status}</td>
                       <td>${data.Transactions[i].createdAt}</td>
                        <td>${data.Transactions[i].updatedAt}</td>    
                        </tr>`;
                        }
        document.getElementById('history').innerHTML = output;
        console.log(output);
        
        
        
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while fetching user data.");
    }
}


fetchBalance();