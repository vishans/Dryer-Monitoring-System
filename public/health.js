const status_ = document.getElementById('status');
const req = document.getElementById('req');

function getEndpoint(endpoint) {
    // Get the current base URL
    const baseUrl = window.location.origin; // Includes protocol, host, and port
    return `${baseUrl}/${endpoint}`;
}

async function getSystemHealth() {
    try {
        const response = await fetch(getEndpoint('health'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching system health:', error);
        return null;
    }
}

async function getLastReq() {
    try {
        const response = await fetch(getEndpoint('dryer'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching system health:', error);
        return null;
    }
}

status_.style.background = "none";

getSystemHealth().then(data => {
    const systemHealth = data.systemHealth;

    status_.style.color = "white";
    status_.style.padding = "10px";


    if (systemHealth == 1) {
        status_.style.backgroundColor = "green";
        status_.innerHTML = "System: OK";
    } else {
        status_.style.backgroundColor = "red";
        status_.innerHTML = "System: Down";
    }
}).catch(error => {
    status_.style.backgroundColor = "orange";
    status_.innerHTML = "System: Error fetching data";
    console.error(error);
});

getLastReq().then(data => {
    req.style.backgroundColor = 'black';
    req.style.color = 'white';
    const formattedJson = JSON.stringify(data, null, 2);
    req.innerHTML = formattedJson.replace(/\n/g, "<br>");
}).catch(error => {
    req.innerHTML = "Error fetching last request";
    console.error(error);
});

