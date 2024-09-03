function getDryerEndpoint() {
    // Get the current base URL
    const baseUrl = window.location.origin; // Includes protocol, host, and port
    return `${baseUrl}/dryer`;
}


function formatDateTime(unixTimeInSeconds) {
    const date = new Date(unixTimeInSeconds * 1000);
    const now = Date.now();
    const durationMinutes = Math.floor((now - date.getTime()) / (1000 * 60));
    let durationString = "";

    if (durationMinutes < 60) {
        durationString = `${durationMinutes} min`;
    } else if (durationMinutes < 1440) {
        const durationHours = Math.floor(durationMinutes / 60);
        durationString = `${durationHours} hr${durationHours > 1 ? 's' : ''}`;
    } else {
        const durationDays = Math.floor(durationMinutes / 1440);
        durationString = `${durationDays} day${durationDays > 1 ? 's' : ''}`;
    }

    // Format day of the week and time
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'long' });
    const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Combine the day, time, and duration
    //return `${dayOfWeek}, ${formattedTime}<br>(${durationString})`;
    return [dayOfWeek, formattedTime, durationString];
}

async function getDryerState() {
    try {
        const response = await fetch(getDryerEndpoint());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dryer state:', error);
        return null;
    }
}

async function handleDryerState() {
    const dryerData = await getDryerState();

    if (dryerData) {
        const { dryerState, savedTime } = dryerData;
        console.log('Dryer State:', dryerState);
        console.log('Saved Time:', savedTime);

       if(dryerState == 1){
            gif.src = "dryerRunning.WEBP";
            gif.style.borderTop = "solid 5px green";
            const [dayOfWeek, formattedTime, durationString] = formatDateTime(savedTime);
            const message = `${dayOfWeek}, ${formattedTime}<br>(${durationString})`;

            status_.innerHTML = "Dryer is in use <br> Since: " + message;
            status_.style.width =  gif.width + 'px';

        }else{
            gif.src = "dryerNotRunning.png";
            gif.style.borderTop = "solid 5px red";
            const [dayOfWeek, formattedTime, durationString] = formatDateTime(savedTime);
            const message = `${dayOfWeek}, ${formattedTime}<br>(${durationString})`;

            const homestretch = ['0 min', '1 min', '2 min', '3 min', '4 min', '5 min'];
            let additionalMessage;
            if(homestretch.includes(durationString)){
                const remainingTime = parseInt(durationString.split(" ")[0],10);
                additionalMessage = 
                `<div style="color: red;">Dryer might still be running. Wait up for ${5 - remainingTime} more minute(s)!</div>`;
                status_.innerHTML = additionalMessage

            }else{
                additionalMessage = '';
                status_.innerHTML = "Dryer is not in use <br> Since: " + message +additionalMessage;
            }


            status_.style.width =  gif.width + 'px';
        }

    }
}

const status_ = document.getElementById('status');
const gif = document.getElementById('gif');
const footer = document.querySelector('.footer');
status_.style.width =  gif.width + 'px';


function startPolling() {
    handleDryerState(); 
    setInterval(handleDryerState, 1/12 * 60 * 1000); // every 5s
}

startPolling();


const hours = new Date().getHours();
const minutes = new Date().getMinutes();

if ((hours > 22) || (hours === 22 && minutes >= 30) || (hours < 8)) {
    footer.style.color = "red";
    footer.innerHTML = "Do not use the dryer after 10:30 P.M.";
}

if(hours >= 18 && hours <= 23 || hours >= 0 && hours <=6){
    
    
    const popupContainer = document.querySelector('.popup-container');
    const overlay = document.querySelector('#overlay');
    
    popupContainer.classList.add('show');
    overlay.classList.add('show');

    const popupOKBtn = document.querySelector('#popup-ok');
    popupOKBtn.addEventListener('click', (e)=>{
        overlay.classList.remove('show');
        popupContainer.classList.remove('show');

    })
}