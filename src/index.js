const locationSelect = document.getElementById('locationSelect');
const locationTitle = document.getElementById('locationTitle');
const timeString = document.getElementById('timeString');
const dateString = document.getElementById('dateString');
const homeLink = document.getElementById('homeLink');

function updateClock() {
const selectedValue = locationSelect.value;
const now = new Date();

let timeZone;
let displayName;

if (selectedValue === 'local'){
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      displayName = `My Location (${timeZone})`;
    } else {
              timeZone = selectedValue;
               // Extract city name nicely from timezone string
              displayName = selectedValue.split('/')[1].replace('_', ' ');
            }

// Format Time
const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timeZone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true});

// Format Date
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timeZone,
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'});

locationTitle.textContent = displayName;
timeString.textContent = timeFormatter.format(now);
dateString.textContent = dateFormatter.format(now);

// Bonus 1 Logic: Show homepage link when displaying a city other than local
if (selectedValue !== 'local') 
  {
    homeLink.style.display = 'inline-block';
  } 
   else {
           homeLink.style.display = 'none';
        }
}

// Event listener for dropdown change
locationSelect.addEventListener('change', updateClock);

// Bonus 1: Homepage link reset action
homeLink.addEventListener('click', (e) => {
e.preventDefault();
locationSelect.value = 'local';
  updateClock();
        });

// Run immediately and update every second
updateClock();
setInterval(updateClock, 1000);
