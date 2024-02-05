import { create, body, menu, picNumber, timer, save } from './script.js';
import { answers } from './nonogram.js';

const levelMenu = create('aside', 'level-menu', body);
const complexity = create('section', 'complexity', levelMenu);
const levelList = create('div', 'level-list', levelMenu);
const sakura = create('img', 'sakura', levelMenu);
sakura.src = './assets/aside-sakura.png';
let overlay;

const easy = create('div', 'easy grade', complexity);
easy.textContent = 'Easy';
const medium = create('div', 'medium grade', complexity);
medium.textContent = 'Medium';
const hard = create('div', 'hard grade', complexity);
hard.textContent = 'Hard';
const close = create('a', 'close-btn', complexity);

function levelSwitch(event) {
  levelList.innerHTML = '';
  const btn = event.target;
  const level = btn.textContent.toLowerCase();
  const grades = complexity.querySelectorAll('.grade');
  for (let grade of grades) {
    grade.classList.remove('chosen');
  }
  btn.classList.add('chosen');
  fillList(level);
}

function fillList(level) {
  const arr = answers.filter((item) => item.level === level);
  for (let i = 0; i < arr.length; i++) {
    const level = create('div', 'level', levelList);
    let levelName = arr[i].name;
    if (levelName !== 'TV') {
      levelName =
        levelName.charAt(0).toUpperCase() + levelName.slice(1).toLowerCase();
    }
    level.textContent = levelName;
    level.addEventListener('click', selectPic);
  }
  const levels = levelList.querySelectorAll('.level');
  setTimeout(() => {
    levels.forEach((elem) => elem.classList.add('visible'));
  });
}

const grades = levelMenu.querySelectorAll('.grade');
for (let grade of grades) {
  grade.addEventListener('click', levelSwitch);
}

function selectPic(event) {
  timer.stop();
  document.querySelector('.table').remove();
  document.querySelector('.solution').remove();
  const levels = levelList.querySelectorAll('.level');
  levels.forEach((elem) => elem.classList.remove('selected'));
  const elem = event.target;
  const name = elem.textContent.toUpperCase();
  const index = answers.findIndex((elem) => elem.name === name);
  elem.classList.add('selected');
  save.classList.remove('unclick-button');
  picNumber(index);
  if (document.documentElement.clientWidth <= 600) {
    closeMenu();
  }
}

function openMenu() {
  levelMenu.style.transform = 'translateX(0)';
  overlay = create('div', 'overlay', body);
  overlay.addEventListener('click', closeMenu);
  easy.classList.add('chosen');
  fillList('easy');
}
menu.addEventListener('click', openMenu);

function closeMenu() {
  levelMenu.style.transform = 'translateX(-110%)';
  overlay.remove();
  medium.classList.remove('chosen');
  hard.classList.remove('chosen');
  setTimeout(() => (levelList.innerHTML = ''), 700);
}
close.addEventListener('click', closeMenu);
