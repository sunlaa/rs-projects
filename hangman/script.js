const body = document.querySelector("body");
let attemptValue = 6;

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

function create(tag, cls, prnt) {
  let elem = document.createElement(`${tag}`);
  elem.classList.add(`${cls}`);
  prnt.append(elem);
  return elem;
}

const hanged = create("section", "hanged", body);
const playZone = create("section", "play-zone", body);

const gallows = create("img", "gallows", hanged);
gallows.src = "./images/gallows.png";

const ginger = create("img", null, hanged);

const riddle = create("div", "riddle", playZone);
const keyboard = create("div", "keyboard", playZone);

const word = create("h1", "word", riddle);
const attempt = create("p", "attempt", riddle);
attempt.textContent = `Attempts: ${attemptValue}/6`;
const hint = create("p", "hint", riddle);

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

for (let i = 0; i < alphabet.length; i++) {
  let key = create("a", "key", keyboard);
  key.textContent = `${alphabet[i]}`;
  key.addEventListener("click", listenerKey);
}

const keys = document.querySelectorAll(".key");

let selectedWord;
let arrQuiz;

function chooseQuiz() {
  selectedWord = answers[Math.floor(Math.random() * 10)];
  arrQuiz = new Array(selectedWord.length).fill("_");
  word.textContent = arrQuiz.join(" ");
  hint.textContent = hints.get(selectedWord);
}

chooseQuiz();

let numOfPic = 1;

function listenerKey(event) {
  let letter = event.currentTarget.textContent || " ";
  let keyLetter = event.key || " ";
  let arrAnswer = selectedWord.split("");
  for (let i = 0; i < arrAnswer.length; i++) {
    if (letter === arrAnswer[i] || event.code === `Key${arrAnswer[i]}`) {
      arrQuiz[i] = arrAnswer[i];
    }
  }

  if (
    !selectedWord.includes(letter) &&
    !selectedWord.includes(keyLetter.toUpperCase())
  ) {
    ginger.className = "ginger";
    ginger.src = `/images/ginger-${numOfPic}.png`;
    ginger.style.opacity = "1";
    numOfPic++;

    attemptValue--;
    attempt.textContent = `Attempts: ${attemptValue}/6`;
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
}

document.addEventListener("keydown", listenerKey);
