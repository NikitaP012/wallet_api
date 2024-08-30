export async function current_value() {
    console.log("calling");
    

    const token = localStorage.getItem('token');

    if (!token) {
        alert("You are not logged in. Please log in again.");
        return;
    }
    let url = 'http://localhost:8081/checkBalance';

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify()
    });

    console.log("response is", response);
    if (response.ok) {
        const data = await response.json();
        console.log("totalbalance", data.TotalBalance);

       let balance=data.TotalBalance;
       return balance;
    }

}
