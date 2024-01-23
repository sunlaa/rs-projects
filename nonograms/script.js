import { answers } from './nonogram.js';
import { Timer } from './timer.js';

export const body = document.querySelector('body');

export function create(tag, cls, prnt) {
  const elem = document.createElement(tag);
  elem.className = cls;
  prnt.append(elem);
  return elem;
}


const header = create('header', 'header', body);

const configPanel = create('div', 'config-panel', header);
const theme = create('a', 'theme', configPanel);
const volume = create('a', 'volume', configPanel);
export const menu = create('a', 'menu', configPanel);

const title = create('h1', 'title', header);
title.textContent = 'Nonogram';

const score = create('span', 'score', header);

const game = create('section', 'game', body);

const timerBlock = create('div', 'timer', game);
timerBlock.textContent = '00 : 00';
const timer = new Timer(timerBlock);

export const table = create('table', 'table', game);

const gameBtns = create('div', 'game-btns', game);

const reset = create('a', 'reset', gameBtns);
reset.textContent = 'Reset';
const solution = create('a', 'solution', gameBtns);
solution.textContent = 'Solution';


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

function renderTable(n, leftClues, topClues) {
  for (let i = 0; i < n + 1; i++) {
    const row = create('tr', i === 0 ? 'row-clues row' : 'row-box row', table);
    if (i % 5 === 0 && i !== n) {
      row.classList.add('bold');
    }

    for (let j = 0; j < n + 1; j++) {
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
      if (j % 5 === 0 && j !== n) {
        cell.classList.add('bold');
      }
    }
  }
  table.addEventListener('click', paintCell);
  table.addEventListener('contextmenu', crossCell);
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
  cell.classList.remove('cross');
  cell.classList.toggle('painted');
}

function crossCell(event) {
  event.preventDefault();
  const cell = event.target;
  if (!cell.classList.contains('ceil-box')) return;
  cell.classList.remove('painted');
  cell.classList.toggle('cross');
}

function solveNonogram(matrix) {
  const rows = table.querySelectorAll('.row-box');
  for (let i = 0; i < matrix.length; i++) {
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
  console.log(matrix);
  // return matrix;
}

export function picNumber(n) {
  const left = getClues(answers[n].pic, 'left');
  const top = getClues(answers[n].pic, 'top');
  renderTable(answers[n].size, left, top);

  solution.addEventListener('click', () => {
    solveNonogram(answers[n].pic);
    timer.stop();
  });

  reset.addEventListener('click', () => {
    const cells = document.querySelectorAll('.ceil-box');
    for (let cell of cells) {
      cell.classList.remove('painted');
      timer.stop();
    }
  });

  // table.addEventListener('click', () => {
  //   console.log(isCorrect(answers[n].pic));
  // });
}

function isCorrect(answer) {
  const matrix = getMatrix();
  return matrix.flat().join('') === answer.flat().join('');
}

table.addEventListener('click', (e) => {
  if (!e.target.classList.contains('ceil-box')) return;
  timer.start();
});



picNumber(0);
