import { create } from './script.js';
import { answers } from './nonogram.js';

async function initScore() {
  let { score } = await import('./script.js')
    .then((obj) => obj)
    .catch((err) => err);
  return score;
}

async function addListeners() {
  let score = await initScore();
  function openScore() {
    modalScore.classList.remove('none');
    overlay = create('div', 'overlay', document.body);
    overlay.addEventListener('click', closeScore);
  }

  score.addEventListener('click', openScore);

  function closeScore() {
    modalScore.classList.add('none');
    overlay.remove();
  }
}

let overlay;
addListeners();

let arr = JSON.parse(localStorage.getItem('arr')) || [];

const modalScore = create('div', 'score-modal none', document.body);
const sakura = create('img', 'score-sakura', modalScore);
sakura.src = './images/score-sakura.png'
const title = create('h1', 'title-score', modalScore);
title.textContent = 'Score';
let scoreList;

if (arr.length === 0) {
  const notification = create('div', 'notification', modalScore);
  notification.textContent = "So far you haven't won a game";
} else {
  createHeadRow();
  writeScore();
}

function createHeadRow() {
  scoreList = create('table', 'score-table', modalScore);
  const scoreHeadRow = create('tr', 'score-head-row', scoreList);
  for (let i = 0; i < 4; i++) {
    const scoreHeadCell = create(
      'th',
      'score-head-cell score-cell',
      scoreHeadRow
    );
    switch (i) {
      case 0:
        scoreHeadCell.textContent = 'Place';
        break;
      case 1:
        scoreHeadCell.textContent = 'Puzzle';
        break;
      case 2:
        scoreHeadCell.textContent = 'Difficulty';
        break;
      case 3:
        scoreHeadCell.textContent = 'Time';
        break;
    }
  }
}

function writeScore() {
  if (document.querySelector('.notification')) {
    document.querySelector('.notification').remove();
  }

  const tableArr = [...arr];

  tableArr.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < tableArr.length; i++) {
    const row = create('tr', 'score-row', scoreList);
    for (let j = 0; j < 4; j++) {
      const scoreCell = create('td', 'score-def-cell score-cell', row);
      switch (j) {
        case 0:
          scoreCell.textContent = `${i + 1}.`;
          break;
        case 1:
          let puzzleName = tableArr[i][1];
          puzzleName =
            puzzleName.charAt(0).toUpperCase() +
            puzzleName.slice(1).toLowerCase();
          scoreCell.textContent = `${puzzleName}`;
          break;
        case 2:
          let difficulty = tableArr[i][2];
          difficulty =
            difficulty.charAt(0).toUpperCase() +
            difficulty.slice(1).toLowerCase();
          scoreCell.textContent = `${difficulty}`;
          break;
        case 3:
          function mod(value) {
            return value < 10 ? '0' + value : value;
          }
          let time = tableArr[i][0];
          let min;
          let sec;
          if (time > 60) {
            min = Math.floor(time / 60);
            sec = time % 60;
          } else {
            min = 0;
            sec = time;
          }
          scoreCell.classList.add('time')
          scoreCell.textContent = `${mod(min)} : ${mod(sec)}`;
          break;
      }
    }
  }
}

export function saveWin(n, time) {
  const name = answers[n].name;
  const difficulty = answers[n].level;
  const stopWatch = time;
  const inner = [];
  inner.push(stopWatch, name, difficulty);
  if (arr.length === 5) {
    arr.shift();
    arr.push(inner);
  } else {
    arr.push(inner);
  }
  localStorage.setItem('arr', JSON.stringify(arr));

  if (document.querySelector('.score-table')) {
    document.querySelector('.score-table').remove();
  }
  createHeadRow();
  writeScore();
}
