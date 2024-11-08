// API-key
const MAPBOX_API =
  "pk.eyJ1IjoiZ29waWtybSIsImEiOiJjbGVjamdlcTYwNDVkM29tdW84ZXM0OHJzIn0.QFjEknxbT-y6iB_ZPJb1-w";

// random-quotes
const quotes = [
  "I am capable of achieving my goals.",
  "Today is going to be a great day.",
  "I am doing my best, and that's good enough.",
  "Good things are coming my way.",
  "My thoughts and feelings matter.",
];

// Get-image-path-from-assets-folder
const bgURL = [
  "./assets/img/landing-bg-1.jpg",
  "./assets/img/landing-bg-2.jpg",
  "./assets/img/landing-bg-3.jpg",
  "./assets/img/landing-bg-4.jpg",
  "./assets/img/landing-bg-5.jpg",
];

// DOM-Elements
const landingpageBg = document.getElementById("landingpageBg");
const greeting = document.getElementById("greet");
const greetName = document.getElementById("name");
const placeName = document.getElementById("place");
const quote = document.getElementById("quote");
const time = document.getElementById("time");

// Default-theme
let chathams_blue = "#1A4B84";

// Options
const showAmPm = true;

// Get-latitude-and-longitude
const getLocationData = () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getData(latitude, longitude);
  };
  const error = () => {
    placeName.innerText = "";
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

// API-call-to-convert-latitude-&-longitude-to-place
const getData = async (lat, long) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=place&access_token=${MAPBOX_API}`;
  const response = await fetch(url);
  const locationData = await response.json();
  if (locationData.features && locationData.features.length > 0) {
    placeName.innerText = "Place - " + locationData.features[0].place_name;
  }
};

// set a random quote
const getQuote = () => {
  const random = Math.floor(Math.random() * quotes.length);
  quote.innerText = quotes[random];
  landingpageBg.style.backgroundImage = `url(${bgURL[random]}),linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`;
};

// Show Time
function displayTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;

  setTimeout(displayTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// function to show greet message
function greetings() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12) {
    greeting.textContent = `Good Morning, `;
  } else if (hour < 16) {
    greeting.textContent = `Good Afternoon, `;
  } else {
    greeting.textContent = `Good Evening, `;
  }
}

// Get Name
function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    greetName.textContent = "[Enter Name]";
  } else {
    greetName.textContent = localStorage.getItem("name");
  }
}

// set name when enter key is pressed
function setName(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      if (greetName.innerText.trim().length === 0) {
        greetName.textContent = "[Enter Name]";
        return;
      }
      localStorage.setItem("name", e.target.innerText);
      greetName.blur();
    }
  }
}

function checkEscKeyPress(e) {
  if (e.type === "keydown") {
    if (e.which == 27 || e.key == 27) {
      // check for Esc key press
      greetName.blur();
      return;
    }
  }
}

// Function that handles mouse click event for name
function mouseClicked() {
  greetName.textContent = "[Enter Name]";
  localStorage.setItem("name", "[Enter Name]");
  return;
}

// Event Listeners
greetName.addEventListener("keypress", setName);
greetName.addEventListener("keydown", checkEscKeyPress);
greetName.addEventListener("click", mouseClicked);

// Init the functions
getLocationData();
displayTime();
getQuote();
greetings();
getName();
