const body = document.querySelector("body");
const snowflakesContainer = create("div", "snowflakes", body);
let incorrectGuesses = 0;
let selectedWord;
let arrQuiz;
let numOfPic = 1;
let popover;
let blackout;
let result;
let answer;
let playBtn;

const answers = [
  "FIRE",
  "TELEPHONE",
  "AGE",
  "MIRROR",
  "PROMISE",
  "NAME",
  "CARROT",
  "CANDLE",
  "CHERRY",
  "SHADOW",
  "COMPASS",
  "PIANO",
  "EGG",
  "KANGAROO",
  "ANTEATER",
];
const hints = new Map();

hints.set(
  "FIRE",
  "Give me a drink, and I will die. Feed me, and I'll get bigger. What am I?"
);
hints.set("TELEPHONE", "What has many rings but no fingers?");
hints.set("AGE", "What goes up but never comes back down?");
hints.set(
  "MIRROR",
  "If you drop me, I'm sure to crack, but smile at me and I'll smile back. What am I?"
);
hints.set(
  "PROMISE",
  "What can you break, even if you never pick it up or touch it?"
);
hints.set("NAME", "What is yours but mostly used by others?");
hints.set(
  "CARROT",
  "What's bright orange with green on top and sounds like a parrot?"
);
hints.set(
  "CANDLE",
  "I'm tall when I'm young, and I'm short when I'm old. What am I?"
);
hints.set(
  "CHERRY",
  "I'm red and small, and I have a heart of stone. What am I?"
);
hints.set(
  "SHADOW",
  "I follow you all the time and copy your every move, but you can't touch or catch me. What am I?"
);
hints.set(
  "COMPASS",
  "I am so simple that I can only point, yet I guide people all over the world."
);
hints.set("PIANO", "What has keys but can't open locks?");
hints.set("EGG", "What has to be broken before you can use it?");
hints.set("KANGAROO", "I jump when I walk and sit when I stand. What am I?");
hints.set("ANTEATER", "I am an animal named after the animal that I eat.");

function create(tag, cls, prnt) {
  let elem = document.createElement(`${tag}`);
  elem.classList.add(`${cls}`);
  prnt.append(elem);
  return elem;
}

const wrapper = create("section", "wrapper", body);

const riddle = create("section", "riddle", wrapper);
const hanged = create("section", "hanged", wrapper);
const keyboard = create("section", "keyboard", wrapper);

const gallows = create("img", "gallows", hanged);
gallows.src = "images/gallows.png";
const ginger = create("img", null, hanged);

const word = create("h1", "word", riddle);
const attempt = create("p", "attempt", riddle);
attempt.textContent = `Incorrect guesses: ${incorrectGuesses}/6`;
const hint = create("p", "hint", riddle);

const alphabetString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alphabet = [...alphabetString];

for (let i = 0; i < alphabet.length; i++) {
  let key = create("a", "key", keyboard);
  key.textContent = `${alphabet[i]}`;
  key.addEventListener("click", listenerKey);
}

const keys = document.querySelectorAll(".key");

function chooseQuiz() {
  selectedWord = answers[Math.floor(Math.random() * 15)];
  arrQuiz = new Array(selectedWord.length).fill("_");

  word.textContent = arrQuiz.join(" ");
  hint.textContent = hints.get(selectedWord);
  console.log(`Answer: ${selectedWord}`);
}

let pushed = "";

function listenerKey(event) {
  const letter = event.currentTarget.textContent || " ";
  const keyLetter = event.key.toUpperCase() || " ";

  if (!alphabetString.includes(keyLetter) || pushed.includes(keyLetter)) {
    return;
  }

  pushed += keyLetter;
  
  console.log(pushed);
  let arrAnswer = selectedWord.split("");
  for (let i = 0; i < arrAnswer.length; i++) {
    if (letter === arrAnswer[i] || event.code === `Key${arrAnswer[i]}`) {
      arrQuiz[i] = arrAnswer[i];
    }
  }

  if (
    !selectedWord.includes(letter) &&
    !selectedWord.includes(keyLetter)
  ) {
    ginger.className = "ginger";
    ginger.src = `images/ginger-${numOfPic}.png`;
    numOfPic++;

    incorrectGuesses++;
    attempt.textContent = `Incorrect guesses: ${incorrectGuesses}/6`;
  }

  if (event.currentTarget.classList) {
    event.currentTarget.classList.add("clicked");
  } else {
    for (let k of keys) {
      if (k.textContent === event.key.toUpperCase()) {
        k.classList.add("clicked");
      }
    }
  }

  word.textContent = arrQuiz.join(" ");

  if (incorrectGuesses === 6) {
    outcome();
    result.textContent = "You lose!";
    answer.textContent = `The answer was ${selectedWord}.`;
    playBtn.textContent = "Play Again!";
  }

  if (word.textContent.split(" ").join("") === selectedWord) {
    outcome();
    result.textContent = "You won!";
    answer.textContent = `You guessed the answer ${selectedWord}.`;
    playBtn.textContent = "Play Again!";
  }
}

function enterListener(event) {
  if (event.code === "Enter") {
    playAgain();
  }
}

function outcome() {
  popover = create("div", "outcome", body);
  blackout = create("div", "blackout", body);

  result = create("h2", "result", popover);
  answer = create("p", "answer", popover);
  playBtn = create("a", "play-again", popover);
  playBtn.addEventListener("click", () => {
    setTimeout(playAgain, 300);
  });

  blackout.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.removeEventListener("keydown", listenerKey);

  document.addEventListener("keydown", enterListener);
}

function playAgain() {
  popover.remove();
  blackout.remove();

  chooseQuiz();

  for (let k of keys) {
    k.classList.remove("clicked");
  }

  pushed = "";

  numOfPic = 1;

  ginger.className = " ";
  ginger.src = " ";

  incorrectGuesses = 0;
  attempt.textContent = `Incorrect guesses: ${incorrectGuesses}/6`;

  document.addEventListener("keydown", listenerKey);

  document.removeEventListener("keydown", enterListener);
}

body.append(snowflakesContainer);

function createSnow() {
  for (let i = 0; i < 500; i++) {
    const snowflake = create("div", "snowflake", snowflakesContainer);
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.width = snowflake.style.height = `${Math.round(
      Math.random() * 5
    )}px`;
    snowflake.style.animationDuration = `${Math.random() * 2 + 7}s`;
    snowflake.style.animationDelay = `-${Math.random() * 10}s`;
  }
}

window.addEventListener("load", () => {
  chooseQuiz();
  document.addEventListener("keydown", listenerKey);
  createSnow();
});
