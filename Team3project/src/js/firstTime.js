// get the stored value in localStorage
const visitCount = Number(window.localStorage.getItem("visits-ls"));

// store the new number of visits value
localStorage.setItem("visits-ls", visitCount + 1);

const element = document.getElementById("overlay1");



// determine if this is the first visit and if yes, display the register.
if (visitCount != 0) {
    element.style.visibility = "hidden";
} else {
    element.style.visibility = "visible";
  }


