const body = document.querySelector("body");

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

const ginger = create("img", "ginger", hanged);
ginger.src = "./images/ginger-5.png";

const riddle = create("div", "riddle", playZone);
const keyboard = create("div", "keyboard", playZone)

const word = create("h1", "word", riddle);
const attempt = create("p", "attempt", riddle);
const hint = create("p", "hint", riddle);

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

for (let i = 0; i < alphabet.length; i++) {
  let k = create("a", "key", keyboard);
  k.textContent = `${alphabet[i]}`
}

const keys = document.querySelectorAll(".key");
