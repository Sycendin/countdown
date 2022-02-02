// Input screen
const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdown-form");
const dateEL = document.querySelector("#date-picker");

// Countdown screen 
const countdownEl = document.querySelector("#countdown");
const countdownElTitle= document.querySelector("#countdown-title");
const countdownBtn = document.querySelector("#countdown-button");
const timeElements = document.querySelectorAll('span');

// Completed coundown screen
const completeEl = document.querySelector("#complete");
const completeElInfo = document.querySelector("#complete-info");
const completeBtn = document.querySelector("#complete-button");

let countdownTitle ="";
let countdownDate="";
let countdownValue = Date;
let countdownActive;
let saveCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input minimum ot be todays date
// Get everything before the T of the ISOString
const today = new Date().toISOString().split('T')[0];
dateEL.setAttribute('min', today);

//Event listeners
//Update DOM by updating countdown
const updateDOM = () =>{
    countdownActive = setInterval(()=>{
        const now = new Date().getTime()
        const distance = countdownValue - now
 
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour)/ minute);
        const seconds = Math.floor((distance % minute)/ second);


        //Hide input
        inputContainer.hidden = true;

         // If countdown has ended then show complete screen
        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else{
            // Add values to countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            countdownEl.hidden = true;
            countdownEl.hidden = false;
            }
    }, second);
}
// Get submitted values from form
const updateCountdown = (e) =>{
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    saveCountdown = {
        title: countdownTitle,
        date: countdownDate,

    };
    localStorage.setItem('countdown', JSON.stringify(saveCountdown))
    // Get number version of current date and update DOM
    countdownValue = new Date(countdownDate).getTime();
    if (countdownDate === ''){
        alert('Please select date for the countdown')
    }
    else{
        updateDOM();
    }
    
}
// Reset the counter
const reset = () =>{   
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //Stop countdown
    clearInterval(countdownActive);
    //Reset values
    countdownTitle="";
    countdownDate="";
    localStorage.removeItem('countdown')
}

const restoreCountdown= () =>{
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = saveCountdown.title;
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM()
    }
}
//Event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);


// On page load, check local storage
restoreCountdown();