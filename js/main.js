// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Civilization",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "Gemy",
  "Messi",
  "Neymar",
  "Ronaldinho",
  "Ronaldo",
];
let wordsLength = words.length;

// Levels
const Levels = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

// Default Levels
let defaultLevelName = "Easy"; // Chang Level From Here
let defaultLevelSeconds = Levels[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let averageElement = document.querySelector(".average");
let averagespan = document.querySelector(".average span");
let totalElement = document.querySelector(".total-time");
let form = document.forms[0];
let formInputs = Array.from(document.querySelectorAll("form input"));
let restart = document.querySelector("button");

// Setting Level`s Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

formInputs.forEach((el) => {
  el.addEventListener("click", (item) => {
    formInputs.forEach((e) => {
      e.checked = false;
    });
    item.currentTarget.checked = true;
    if (document.getElementById("Easy").checked) {
      defaultLevelName = "Easy";
    }
    if (document.getElementById("Normal").checked) {
      defaultLevelName = "Normal";
    }
    if (document.getElementById("Hard").checked) {
      defaultLevelName = "Hard";
    }
    defaultLevelSeconds = Levels[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    window.localStorage.setItem("Level", defaultLevelName);
  });
});

if (window.localStorage.length > 0) {
  defaultLevelName = window.localStorage.getItem("Level");
  defaultLevelSeconds = Levels[window.localStorage.getItem("Level")];
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  document.getElementById(defaultLevelName).checked = true;
}

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.style.display = "none";
  form.style.display = "none";
  upcomingWords.style.display = "flex";
  input.style.display = "block";
  input.focus();
  // Generate Word Function
  genWords();
};

restart.onclick = function () {
  this.remove();
  lvlNameSpan.innerHTML = window.localStorage.getItem("Level");
  location.reload();
};

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);

  // Remove Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let text = document.createTextNode(words[i]);
    div.appendChild(text);
    upcomingWords.append(div);
  }
  // Start Call Play Function
  startPlay();
}

let test = false;
let x = 0;
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    x++;
    timeLeftSpan.innerHTML--;

    if (
      timeLeftSpan.innerHTML == 0 ||
      input.value == theWord.innerHTML.toLowerCase()
    ) {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() == input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulation !");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          //Remove Upcoming Words Box
          upcomingWords.style.display = "none";
          theWord.style.display = "none";
          input.style.display = "none";
          restart.style.display = "block";
          averageElement.style.backgroundColor = "#009688";
          test = true;
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        upcomingWords.style.display = "none";
        theWord.style.display = "none";
        input.style.display = "none";
        restart.style.display = "block";
        averageElement.style.backgroundColor = "red";
        test = true;
      }
    }
    if (test) {
      averageElement.style.display = "block";
      totalElement.append(x, " s");
      if (scoreGot.innerHTML == 0) {
        averagespan.innerHTML = x;
        return;
      }
      let average = (x / (wordsLength - words.length)).toFixed(2);
      averagespan.innerHTML = average;
    }
  }, 1000);
}
