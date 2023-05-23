/* eslint-disable no-use-before-define */
let numberOfRows = 10;
let numberOfColumns = 10;
let numberOfMines = 10;
let minesGrid = [];
let openedCells = 0;
let time = 0;
let timerId;
let moves = 0;
let enableAudio = true;

const colors = {
  1: 'rgb(34, 173, 34)',
  2: 'blue',
  3: 'red',
  4: 'violet',
  5: 'yellow',
  6: 'orange',
  7: 'rgb(213, 13, 163)',
  8: 'black',
};

const audioFiles = {
  click: 'assets/sounds/click.mp3',
  mine: 'assets/sounds/mine.mp3',
  win: 'assets/sounds/win.mp3',
  loose: 'assets/sounds/loose.mp3',
  flag: 'assets/sounds/flag.mp3',
};

const wrpapper = document.createElement('div');
wrpapper.classList.add('wrapper');
const header = document.createElement('header');
header.classList.add('header');
const timer = document.createElement('div');
timer.classList.add('timer');
timer.innerHTML = `${time}`.padStart(3, '0');
const moveCounter = document.createElement('div');
moveCounter.classList.add('move-counter');
moveCounter.innerHTML = `${moves}`.padStart(3, '0');
const newGameBtn = document.createElement('button');
newGameBtn.classList.add('new-game-btn');
newGameBtn.innerHTML = 'New<br>Game';
const mineCounter = document.createElement('div');
mineCounter.classList.add('mine-counter');
mineCounter.innerHTML = `${numberOfMines}`.padStart(2, '0');
const flagCounter = document.createElement('div');
flagCounter.classList.add('flag-counter');
flagCounter.innerHTML = '00';
header.append(timer, moveCounter, newGameBtn, flagCounter, mineCounter);
const mineField = document.createElement('div');
mineField.classList.add('mine-field');
const footer = document.createElement('footer');
footer.classList.add('footer');

const sizeSetter = document.createElement('div');
sizeSetter.classList.add('settings-btn');
const sizeRange = document.createElement('input');
sizeRange.classList.add('range-slider');
sizeRange.setAttribute('type', 'range');
sizeRange.setAttribute('value', '0');
sizeRange.setAttribute('step', '1');
sizeRange.setAttribute('min', '0');
sizeRange.setAttribute('max', '2');
sizeSetter.append(document.createElement('span'), sizeRange);
sizeSetter.querySelector('span').innerHTML = '◼️ 10x10';

const mineSetter = document.createElement('div');
mineSetter.classList.add('settings-btn');
const mineRange = document.createElement('input');
mineRange.classList.add('range-slider');
mineRange.setAttribute('type', 'range');
mineRange.setAttribute('value', '10');
mineRange.setAttribute('step', '1');
mineRange.setAttribute('min', '10');
mineRange.setAttribute('max', '99');
mineSetter.append(document.createElement('span'), mineRange);
mineSetter.querySelector('span').innerHTML = `💣 ${mineRange.value}`;

const modalWrapper = document.createElement('div');
modalWrapper.classList.add('modal__wrapper');
const modal = document.createElement('div');
modal.classList.add('modal');
const modalTitle = document.createElement('h2');
modalTitle.classList.add('modal__title');
modalTitle.innerHTML = 'Score Table';
modal.append(modalTitle);
const modalList = document.createElement('div');
modalList.classList.add('modal__list');
const modalItem = document.createElement('div');
modalItem.classList.add('modal__item');
modalItem.innerHTML = 'No records';
modalList.append(modalItem);
const modalBtn = document.createElement('div');
modalBtn.classList.add('modal__btn');
modalBtn.innerHTML = 'OK';
modal.append(modalList, modalBtn);
modalWrapper.append(modal);

const scoreBtn = document.createElement('div');
const scoreIcon = document.createElement('div');
scoreIcon.classList.add('score-icon');
scoreBtn.append(scoreIcon);
scoreBtn.classList.add('footer-btn');
const soundBtn = document.createElement('div');
const soundIcon = document.createElement('div');
soundIcon.classList.add('sound-icon');
soundBtn.append(soundIcon);
soundBtn.classList.add('footer-btn');
const themeBtn = document.createElement('div');
themeBtn.classList.add('footer-btn');
const themeIcon = document.createElement('div');
themeIcon.classList.add('theme-icon');
themeBtn.append(themeIcon);

const winWrapper = document.createElement('div');
winWrapper.classList.add('modal__wrapper');
const winMassage = document.createElement('div');
winMassage.classList.add('modal');
const winText = document.createElement('p');
winText.classList.add('win-text');
const winBtn = document.createElement('div');
winBtn.classList.add('modal__btn');
winBtn.innerHTML = 'OK';
winMassage.append(winText, winBtn);
winWrapper.append(winMassage);

footer.append(sizeSetter, mineSetter, scoreBtn, soundBtn, themeBtn);
wrpapper.append(header, mineField, footer);
document.body.prepend(wrpapper, modalWrapper, winWrapper);

function setFieldSize() {
  let size;
  if (sizeRange.value === '0') size = 10;
  if (sizeRange.value === '1') size = 15;
  if (sizeRange.value === '2') size = 25;
  sizeSetter.querySelector('span').innerHTML = `◼️ ${size}x${size}`;
  numberOfColumns = size;
  numberOfRows = size;
}

function setNumberOfMines() {
  mineSetter.querySelector('span').innerHTML = `💣 ${mineRange.value}`;
  numberOfMines = mineRange.value;
}

function createMatrix(rows, columns, mines, x, y) {
  const matrix = [];
  for (let i = 0; i < rows; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < columns; j += 1) {
      matrix[i][j] = '';
    }
  }
  let minesCount = 0;
  while (minesCount < mines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * columns);
    if (matrix[randomRow][randomCol] !== '💣' && (randomRow !== x || randomCol !== y)) {
      matrix[randomRow][randomCol] = '💣';
      minesCount += 1;
    }
  }
  const res = matrix.map((item) => item.map(() => '💣'));
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] !== '💣') {
        let count = '';
        if (matrix[i - 1] && matrix[i - 1][j - 1]) count = +count + 1;
        if (matrix[i - 1] && matrix[i - 1][j]) count = +count + 1;
        if (matrix[i - 1] && matrix[i - 1][j + 1]) count = +count + 1;
        if (matrix[i] && matrix[i][j - 1]) count = +count + 1;
        if (matrix[i] && matrix[i][j + 1]) count = +count + 1;
        if (matrix[i + 1] && matrix[i + 1][j - 1]) count = +count + 1;
        if (matrix[i + 1] && matrix[i + 1][j]) count = +count + 1;
        if (matrix[i + 1] && matrix[i + 1][j + 1]) count = +count + 1;
        res[i][j] = count;
      }
    }
  }
  return res;
}

function showScore() {
  modalWrapper.classList.toggle('modal__wrapper_opened');
  // console.log(modalList.firstChild.innerHTML == false);
}
scoreBtn.addEventListener('click', showScore);
modalBtn.addEventListener('click', showScore);

let theme = 'light';

function drawMineField(rows, columns) {
  for (let i = 0; i < columns; i += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < rows; j += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (theme === 'dark') cell.classList.add('cell_night');
      row.append(cell);
    }
    mineField.append(row);
  }
}
drawMineField(numberOfColumns, numberOfRows);

function showTime() {
  timerId = setInterval(() => {
    time += 1;
    timer.innerHTML = `${time}`.padStart(3, '0');
  }, 1000);
}

function countMoves(event) {
  if (!event.target.classList.contains('cell_opened') && !event.target.classList.contains('cell_flaged')) {
    moves += 1;
    moveCounter.innerHTML = `${moves}`.padStart(3, '0');
  }
}

function setMines(event) {
  const rowIndex = [...document.querySelectorAll('.row')].indexOf(event.target.parentNode);
  const columnIndex = [...event.target.parentNode.querySelectorAll('.cell')].indexOf(event.target);
  document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', setMines));
  minesGrid = createMatrix(numberOfRows, numberOfColumns, numberOfMines, rowIndex, columnIndex);
  for (let i = 0; i < numberOfColumns; i += 1) {
    for (let j = 0; j < numberOfRows; j += 1) {
      document.querySelectorAll('.row')[i].querySelectorAll('.cell')[j].innerHTML = minesGrid[i][j];
    }
  }
  document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', setMines));
}

function openCell(event) {
  let massage;
  function showWinMassage() {
    winText.innerHTML = massage;
    winWrapper.classList.toggle('modal__wrapper_opened');
    winBtn.removeEventListener('click', showWinMassage);
  }
  function closeWinMassage() {
    winWrapper.classList.remove('modal__wrapper_opened');
  }
  winBtn.addEventListener('click', showWinMassage);
  winBtn.addEventListener('click', closeWinMassage);

  if (enableAudio) playAudio(audioFiles.click);
  const rowIndex = [...document.querySelectorAll('.row')].indexOf(event.target.parentNode);
  const columnIndex = [...event.target.parentNode.querySelectorAll('.cell')].indexOf(event.target);
  if (event.target.innerHTML === '💣') {
    if (timerId) clearInterval(timerId);
    event.target.classList.add('exploded');
    if (enableAudio) {
      playAudio(audioFiles.mine);
      playAudio(audioFiles.loose);
    }
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.removeEventListener('click', openCell);
      cell.removeEventListener('contextmenu', setFlag);
      cell.removeEventListener('click', countMoves);
      if (cell.innerHTML === '💣' && !cell.classList.contains('cell_flaged')) {
        if (theme === 'dark') cell.classList.add('cell_opened_night');
        cell.classList.add('cell_opened');
      }
    });
    massage = 'Game over. Try again';
    showWinMassage();
  }

  function openEmptyCells(row, col) {
    const rows = document.querySelectorAll('.row');
    if (row < 0 || col < 0 || row >= rows.length) {
      return;
    }
    const cells = rows[row].querySelectorAll('.cell');
    if (cells && cells.length > col) {
      const cell = cells[col];
      if (!cell.classList.contains('cell_opened')) {
        cell.classList.add('cell_opened');
        if (theme === 'dark') cell.classList.add('cell_opened_night');
        cell.style.color = colors[`${cell.innerHTML}`];
        if (cell.classList.contains('cell_flaged')) cell.classList.remove('cell_flaged');
        cell.removeEventListener('click', openCell);
        cell.removeEventListener('contextmenu', setFlag);
        if (cell.innerHTML === '') {
          openEmptyCells(row - 1, col - 1);
          openEmptyCells(row - 1, col);
          openEmptyCells(row - 1, col + 1);
          openEmptyCells(row, col - 1);
          openEmptyCells(row, col + 1);
          openEmptyCells(row + 1, col - 1);
          openEmptyCells(row + 1, col);
          openEmptyCells(row + 1, col + 1);
        } else if (!Number.isNaN(cell.innerHTML)) {
          cell.classList.add('cell_opened');
          if (cell.classList.contains('cell_flaged')) cell.classList.remove('cell_flaged');
          cell.removeEventListener('click', openCell);
          cell.removeEventListener('contextmenu', setFlag);
        }
      }
    }
  }
  openEmptyCells(rowIndex, columnIndex);

  event.target.classList.add('cell_opened');
  event.target.removeEventListener('click', openCell);
  event.target.removeEventListener('contextmenu', setFlag);
  openedCells = [...document.querySelectorAll('.cell')].filter(((cell) => cell.classList.contains('cell_opened'))).length;
  if ((numberOfColumns * numberOfRows - numberOfMines) === openedCells) {
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.removeEventListener('click', openCell);
      cell.removeEventListener('contextmenu', setFlag);
      cell.removeEventListener('click', countMoves);
    });
    if (timerId) clearInterval(timerId);
    const record = document.createElement('div');
    record.classList.add('modal__item');
    record.innerHTML = `Size: ${numberOfColumns}x${numberOfRows} | Mines: ${numberOfMines} | Time: ${time}s | Moves: ${moves}`;
    modalList.append(record);
    if (modalList.children.length >= 10 || modalList.firstChild.innerHTML === undefined || modalList.firstChild.innerHTML === 'No records') {
      modalList.firstChild.remove();
    }
    if (enableAudio) playAudio(audioFiles.win);
    massage = `Hooray! You found all mines in ${time} seconds and ${moves} moves!`;
    showWinMassage();
  }
  document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', showTime));
}

function setFlag(event) {
  if (enableAudio) playAudio(audioFiles.flag);
  event.target.classList.toggle('cell_flaged');
  if (event.target.classList.contains('cell_flaged')) {
    event.target.removeEventListener('click', openCell);
  } else {
    event.target.addEventListener('click', openCell);
  }
  flagCounter.innerHTML = `${[...document.querySelectorAll('.cell')].filter(((cell) => cell.classList.contains('cell_flaged'))).length}`.padStart(2, '0');
  mineCounter.innerHTML = `${numberOfMines - [...document.querySelectorAll('.cell')].filter(((cell) => cell.classList.contains('cell_flaged'))).length}`.padStart(2, '0');
}

function newGame() {
  setFieldSize();
  setNumberOfMines();
  mineField.innerHTML = '';
  time = 0;
  moves = 0;
  timer.innerHTML = `${time}`.padStart(3, '0');
  if (timerId) clearInterval(timerId);
  moveCounter.innerHTML = `${moves}`.padStart(3, '0');
  flagCounter.innerHTML = '00';
  mineCounter.innerHTML = `${numberOfMines - [...document.querySelectorAll('.cell')].filter(((cell) => cell.classList.contains('cell_flaged'))).length}`.padStart(2, '0');
  drawMineField(numberOfColumns, numberOfRows);
  document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', showTime));
  addListneners();
}

function playAudio(path) {
  const audio = new Audio();
  audio.src = path;
  audio.play();
}
function toggleSound() {
  enableAudio = !enableAudio;
  soundIcon.classList.toggle('sound-icon_muted');
}

function toggleTheme() {
  wrpapper.classList.toggle('wrapper_night');
  document.querySelectorAll('.cell').forEach((cell) => cell.classList.toggle('cell_night'));
  theme = theme === 'light' ? 'dark' : 'light';
  document.querySelectorAll('.cell_opened').forEach((cell) => cell.classList.toggle('cell_opened_night'));
  themeIcon.classList.toggle('theme-icon_dark');
}

themeBtn.addEventListener('click', toggleTheme);
soundBtn.addEventListener('click', toggleSound);
sizeRange.addEventListener('input', setFieldSize);
newGameBtn.addEventListener('click', newGame);
mineRange.addEventListener('input', setNumberOfMines);

function addListneners() {
  document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', setMines));
  document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', countMoves));
  document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', showTime));
  document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('click', openCell));
  document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('contextmenu', setFlag));
  document.querySelectorAll('.cell').forEach((cell) => cell.addEventListener('contextmenu', (event) => event.preventDefault()));
}
addListneners();

function saveGameState() {
  const fieldState = mineField.innerHTML;
  const scoreState = modalList.innerHTML;
  const flagCounterState = flagCounter.innerHTML;
  const mineCounterState = mineCounter.innerHTML;
  const sizeRangeState = sizeRange.value;
  const mineRangeState = mineRange.value;
  const footerState = footer.innerHTML;
  const gameState = {
    theme,
    numberOfRows,
    numberOfColumns,
    numberOfMines,
    minesGrid,
    time,
    moves,
    enableAudio,
    fieldState,
    scoreState,
    flagCounterState,
    mineCounterState,
    sizeRangeState,
    mineRangeState,
    footerState,
  };
  localStorage.setItem('minesweeperGameState', JSON.stringify(gameState));
}

function loadGameState() {
  const savedGameState = localStorage.getItem('minesweeperGameState');
  if (savedGameState) {
    const gameState = JSON.parse(savedGameState);
    theme = gameState.theme;
    numberOfRows = gameState.numberOfRows;
    numberOfColumns = gameState.numberOfColumns;
    numberOfMines = gameState.numberOfMines;
    minesGrid = gameState.minesGrid;
    time = gameState.time;
    moves = gameState.moves;
    enableAudio = gameState.enableAudio;
    flagCounter.innerHTML = gameState.flagCounterState;
    mineCounter.innerHTML = gameState.mineCounterState;
    if (modalList.innerHTML) modalList.innerHTML = gameState.scoreState;
    timer.innerHTML = `${time}`.padStart(3, '0');
    moveCounter.innerHTML = `${moves}`.padStart(3, '0');
    mineField.innerHTML = gameState.fieldState;
    sizeRange.value = gameState.sizeRangeState;
    mineRange.value = gameState.mineRangeState;
    if (!enableAudio) soundIcon.classList.add('sound-icon_muted');
    if (theme === 'dark') {
      themeIcon.classList.add('theme-icon_dark');
      wrpapper.classList.add('wrapper_night');
    }
    setFieldSize();
    setNumberOfMines();
    addListneners();
    if (moves) document.querySelectorAll('.cell').forEach((cell) => cell.removeEventListener('click', setMines));
  }
}

window.addEventListener('DOMContentLoaded', loadGameState);
window.addEventListener('beforeunload', saveGameState);
