import { create, score } from './script.js';
import { answers } from './nonogram.js';

const overlay = create('div', 'overlay', document.body);
const modalScore = create('div', 'score-modal', document.body);
const title = create('h1', 'title-score', modalScore);
title.textContent = 'Score';
const scoreList = create('table', 'score-list', modalScore);
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

let arr = localStorage.getItem('arr') || [];

if (typeof arr === 'string') {
  arr = JSON.parse(arr);
}
console.log(arr);

export function saveWin(n, time) {
  const name = answers[n].name;
  const difficulty = answers[n].level;
  const stopWatch = time;
  const inner = [];
  inner.push(stopWatch, name, difficulty);
  if (arr.length === 5) {
    if (inner[0] > arr[arr.length - 1][0]) {
      return;
    } else {
      console.log(arr);
      arr.pop();
      console.log(arr);
      arr.push(inner);
      console.log(arr);
    }
  } else {
    arr.push(inner);
  }
  arr.sort((a, b) => a[0] - b[0]);
  localStorage.setItem('arr', JSON.stringify(arr));
}

if (arr.length !== 0) {
  for (let i = 0; i < arr.length; i++) {
    const row = create('tr', 'score-head-row', scoreList);
    for (let j = 0; j < 4; j++) {
      const scoreCell = create('td', 'score-cell', row);
      switch (j) {
        case 0:
          scoreCell.textContent = `${i + 1}.`;
          break;
        case 1:
          scoreCell.textContent = `${arr[i][1]}`;
          break;
        case 2:
          scoreCell.textContent = `${arr[i][2]}`;
          break;
        case 3:
          scoreCell.textContent = `${arr[i][0]} sec`;
          break;
      }
    }
  }
}

function openScore() {}
