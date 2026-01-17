
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById("datetime-picker");

const startBtn =document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let selectedDate = null;
let timerInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
         selectedDate = selectedDates[0];
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            startBtn.disabled = true;
            selectedDate = null;
        } else {
            startBtn.disabled = false;
        }
    },
    };

    flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerUI(timeRemaining) {
  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function startTimer() {
  startBtn.disabled = true;

  timerInterval = setInterval(() => {
    const currentDate = new Date();
    const timeRemaining = selectedDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      updateTimerUI(0);
      return;
    }

    updateTimerUI(timeRemaining);
  }, 1000);
}

startBtn.addEventListener('click', startTimer);