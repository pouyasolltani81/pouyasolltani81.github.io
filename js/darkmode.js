const page = document.querySelector(".page");
const toggle = page.querySelector(".toggle-input");
const toggleIcon = page.querySelector(".toggle-icon");
const imgfluid = page.querySelector(".img-fluid");
// set theme and localStorage on page load
setCheckedState();

function setCheckedState() {
  // checks if localStorage has a "checked" value set at all
  if (!(localStorage.checked === undefined)) {
    // if it does, it sets the state of the toggle accordingly
    toggle.checked = isTrue(localStorage.getItem("checked"));
    // after setting the toggle state, the theme is adjusted according to the checked state
    toggleTheme();
  }
}

function toggleTheme() {
  // Toggle theme based on state of checkbox
  if (toggle.checked) {
    page.classList.replace("light", "dark");
  } else {
    page.classList.replace("dark", "light");
  }
  if (toggle.checked) {
    page.classList.replace("page-l", "page-d");
  } else {
    page.classList.replace("page-d", "page-l");
  }
  // replace icons on page
  toggleIconTheme();
  // set the value of the "checked" key in localStorage
  localStorage.setItem("checked", toggle.checked);
}

function toggleIconTheme() {
  // Replace icons not able to be targeted by css variables
  if (page.classList.contains("light")) {
    toggleIcon.src = "https://mccambley.github.io/dark-mode-demo/images/moon.svg";
  } else {
    toggleIcon.src = "https://mccambley.github.io/dark-mode-demo/images/sun.svg";
  }
  if (page.classList.contains("light")) {
    imgfluid.src = "assets/img/me2.jpg";
  } else {
    imgfluid.src = "assets/img/me.jpg";
  }
}

function isTrue(value) {
  // convert string to boolean
  return value === "true";
}

// Toggle theme any time the state of the checkbox changes
toggle.addEventListener("change", toggleTheme);
