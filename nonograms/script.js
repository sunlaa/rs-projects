import { answers } from './nonogram.js';
import { Timer } from './timer.js';
import { saveWin } from './score.js';

export const body = document.querySelector('body');

export function create(tag, cls, prnt) {
  const elem = document.createElement(tag);
  elem.className = cls;
  prnt.append(elem);
  return elem;
}

let pictureNumber;

const themeMode = localStorage.getItem('theme');

const branchesOne = create('img', 'branch-1 branch', body);
branchesOne.src = './images/sakura-left.png';
const branchesTwo = create('img', 'branch-2 branch', body);
branchesTwo.src = './images/sakura-right.png';

const backAudio = create('audio', 'back-audio', body);
backAudio.style.display = 'none';
backAudio.autoplay = true;
backAudio.loop = true;
backAudio.volume = 0.1;
backAudio.src = './images/back-music.mp3';

const clickAudio = create('audio', 'paint-audio', body);
clickAudio.style.display = 'none';
clickAudio.src = './images/paint.mp3';
clickAudio.volume = 0.1;

const unPaintAudio = create('audio', 'paint-audio', body);
unPaintAudio.style.display = 'none';
unPaintAudio.src = './images/unpaint.mp3';
unPaintAudio.volume = 0.1;

const header = create('header', 'header', body);

const configPanel = create('div', 'config-panel', header);

const volume = create('a', 'volume off', configPanel);

volume.addEventListener('click', () => {
  volume.classList.toggle('off');
  if (backAudio.paused) {
    backAudio.play();
  } else {
    backAudio.pause();
  }
});

const wrap = create('div', 'wrap', configPanel);
const theme = create('div', 'theme', wrap);
const dark = create('a', 'dark', theme);
const light = create('a', 'light', theme);

if (!themeMode) {
  document.documentElement.className = 'light-theme';
} else if (themeMode === 'dark') {
  document.documentElement.className = 'dark-theme';
  theme.style.transform = 'translateY(-35px)';
} else {
  document.documentElement.className = 'light-theme';
  theme.style.transform = 'translateY(0)';
}

theme.addEventListener('click', () => {
  if (document.documentElement.classList.contains('light-theme')) {
    document.documentElement.className = 'dark-theme';
    localStorage.setItem('theme', 'dark');
    if (document.documentElement.clientWidth > 600) {
      theme.style.transform = 'translateY(-35px)';
    } else {
      theme.style.transform = 'translateY(-30px)';
    }
  } else {
    document.documentElement.className = 'light-theme';
    theme.style.transform = 'translateY(0)';
    localStorage.setItem('theme', 'light');
  }
});

export const menu = create('a', 'menu', configPanel);
export const score = create('span', 'score', configPanel);

const title = create('h1', 'title', header);
title.textContent = 'Nonogram';

const game = create('section', 'game', body);

const timerBlock = create('div', 'timer', game);
timerBlock.textContent = '00 : 00';
export const timer = new Timer(timerBlock);

const gameBtns = create('div', 'game-btns', game);

const reset = create('a', 'reset', gameBtns);
reset.textContent = 'Reset';

export const save = create('a', 'save', gameBtns);
save.textContent = 'Save Game';
save.addEventListener('click', saveGame);

function saveGame() {
  localStorage.setItem('min', timer.min);
  localStorage.setItem('sec', timer.sec);
  localStorage.setItem('time', timer.time);
  localStorage.setItem('pic', pictureNumber);
  localStorage.setItem('table', document.querySelector('.table').innerHTML);
  setTimeout(() => {
    const notification = create('div', 'game-saved', body);
    notification.textContent = 'Your game is saved!';
    setTimeout(() => {
      notification.remove();
    }, 2500);
  }, 250);
}

const gameModeBtns = create('div', 'game-mode', body);

const random = create('a', 'random', gameModeBtns);
random.textContent = 'Random Game';
random.addEventListener('click', () => {
  document.querySelector('.table').remove();
  document.querySelector('.solution').remove();
  save.classList.remove('unclick-button');
  timer.stop();
  picNumber(Math.round(Math.random() * 14));
  clickAudio.play();
});

const lastGame = create('a', 'last-game', gameModeBtns);
lastGame.textContent = 'Continue last game';
lastGame.addEventListener('click', loadGame);

function loadGame() {
  if (!localStorage.getItem('table')) {
    const notification = create('div', 'no-saved', body);
    notification.textContent = "You haven't saved the game yet";
    setTimeout(() => {
      notification.remove();
    }, 2500);
    return;
  }
  save.classList.remove('unclick-button');
  const min = localStorage.getItem('min');
  const sec = localStorage.getItem('sec');
  const time = localStorage.getItem('time');
  timer.min = min;
  timer.sec = sec;
  timer.time = time;
  document.querySelector('.timer').textContent = `${timer.mod(
    min
  )} : ${timer.mod(sec)}`;
  timer.start();
  const n = +localStorage.getItem('pic');
  const table = localStorage.getItem('table');
  document.querySelector('.solution').remove();
  document.querySelector('.table').remove();
  picNumber(n);
  document.querySelector('.table').innerHTML = table;
}

function getClues(matrix, direction) {
  const clues = [];
  for (let i = 0; i < matrix.length; i++) {
    let count = 0;
    const data = [];
    for (let j = 0; j < matrix[0].length; j++) {
      let ceil = direction === 'left' ? matrix[i][j] : matrix[j][i];
      if (ceil === 1) {
        count++;
      } else {
        if (count > 0) {
          data.push(count);
          count = 0;
        }
      }
    }
    if (count > 0) {
      data.push(count);
    }
    clues.push(data);
  }
  return clues;
}

function renderTable(size, leftClues, topClues) {
  const table = create('table', 'table', game);
  for (let i = 0; i < size + 1; i++) {
    const row = create('tr', i === 0 ? 'row-clues row' : 'row-box row', table);
    if (i % 5 === 0 && i !== size) {
      row.classList.add('bold');
    }
    for (let j = 0; j < size + 1; j++) {
      let cell;
      if (i === 0) {
        cell = create('td', 'ceil-clues-col ceil', row);
        if (j !== 0) {
          fillClues(cell, topClues, j, 'nums-col', 'numC');
        }
      } else if (j === 0) {
        cell = create('td', 'ceil-clues-row ceil', row);
        fillClues(cell, leftClues, i, 'nums-row', 'numR');
      } else {
        cell = create('td', 'ceil-box ceil', row);
        cell.dataset.row = i;
        cell.dataset.col = j;
      }
      if (j % 5 === 0 && j !== size) {
        cell.classList.add('bold');
      }
    }
  }
  table.addEventListener('click', paintCell);
  table.addEventListener('contextmenu', crossCell);
  return table;
}

function fillClues(cell, cluesArray, current, numbers, num) {
  const div = create('div', numbers, cell);
  for (let i = 0; i < cluesArray[current - 1].length; i++) {
    const int = create('div', num, div);
    int.textContent = cluesArray[current - 1][i];
  }
}

function paintCell(event) {
  const cell = event.target;
  if (!cell.classList.contains('ceil-box')) return;
  timer.start();
  cell.classList.remove('cross');
  cell.classList.toggle('painted');
  if (cell.classList.contains('painted')) {
    clickAudio.play();
  } else {
    unPaintAudio.currentTime = 0;
    unPaintAudio.play();
  }
}

function crossCell(event) {
  event.preventDefault();
  const cell = event.target;
  if (!cell.classList.contains('ceil-box')) return;
  timer.start();
  cell.classList.remove('painted');
  cell.classList.toggle('cross');
  clickAudio.play();
}

function solveNonogram(matrix) {
  const rows = document.querySelectorAll('.row-box');
  for (let i = 0; i < matrix.length && i < rows.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = rows[i].querySelectorAll('.ceil-box')[j];
      cell.classList.remove('painted');
      cell.classList.remove('cross');
      if (matrix[i][j] === 1) {
        cell.classList.add('painted');
      }
    }
  }
}

function getMatrix() {
  const table = document.querySelector('.table');
  const rows = table.querySelectorAll('.row-box');
  const size = rows.length;
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = rows[i].querySelectorAll('.ceil-box')[j];
      if (cell.classList.contains('painted')) {
        matrix[i][j] = 1;
      }
    }
  }
  return matrix;
}

function isCorrect(answer) {
  const matrix = getMatrix();
  return matrix.flat().join('') === answer.flat().join('');
}

function win(n, time) {
  if (!isCorrect(answers[n].pic)) return;
  timer.stop();
  const overlay = create('div', 'overlay', body);
  function nextGame() {
    overlay.remove();
    modal.remove();
    document.querySelector('.solution').remove();
    document.querySelector('.table').remove();
    if (n + 1 < 15) {
      picNumber(n + 1);
    } else {
      picNumber(0);
    }
  }
  overlay.addEventListener('click', nextGame);

  const modal = create('div', 'modal', body);

  const text = create('div', 'modal-text', modal);
  const congrats = create('h1', 'congrats', text);
  congrats.textContent = "Congratulations, you've won!";
  const phrase = create('p', 'phrase', text);
  phrase.textContent = `You've solved the nonogram in ${time} seconds!`;

  const solved = create('table', 'solved', modal);
  for (let i = 0; i < answers[n].size; i++) {
    const row = create('tr', 'solved-row', solved);
    for (let j = 0; j < answers[n].size; j++) {
      const cell = create('td', 'solved-cell', row);
      if (answers[n].size === 5) cell.classList.add('small');
      if (answers[n].size === 10) cell.classList.add('medium');
      if (answers[n].size === 15) cell.classList.add('big');
      if (answers[n].pic[i][j] === 1) {
        cell.classList.add('painted');
      }
    }
  }
  const next = create('a', 'next', modal);
  next.textContent = 'Next Game';
  next.addEventListener('click', nextGame);

  saveWin(n, time);
}

export function picNumber(n) {
  pictureNumber = n;
  const left = getClues(answers[n].pic, 'left');
  const top = getClues(answers[n].pic, 'top');
  const table = renderTable(answers[n].size, left, top);

  const solution = create('a', 'solution', gameBtns);
  solution.textContent = 'Solution';

  solution.addEventListener('click', () => {
    solveNonogram(answers[n].pic);
    table.classList.add('unclick');
    save.classList.add('unclick-button');
    timer.stop();
  });

  reset.addEventListener('click', () => {
    table.classList.remove('unclick');
    save.classList.remove('unclick-button');
    const cells = document.querySelectorAll('.ceil-box');
    for (let cell of cells) {
      cell.classList.remove('painted');
      cell.classList.remove('cross');
      timer.stop();
    }
  });

  table.addEventListener('click', (event) => {
    const cell = event.target;
    if (!cell.classList.contains('ceil-box')) return;
    const time = timer.time;
    win(n, time);
  });
}

picNumber(0);
