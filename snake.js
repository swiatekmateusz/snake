//Changing properties
const areaX = 20;
const areaY = 20;
const snakeItemWH = 20;
const snakeStartX = Math.floor(areaX / 2)
const snakeStartY = Math.floor(areaY / 2)
const frequency = 250

//Program variables
const areaTable = [];
const lose = document.querySelector('.lose')
const container = document.querySelector('.snake-container')
const score = document.getElementById('score')
const btnReset = document.getElementById('restart')
let snakeX = snakeStartX
let snakeY = snakeStartY
let snakePositions = [[snakeX, snakeY]]
let directions = []
let pointX;
let pointY;
let head;
let direction;
let scoreCounter = 0;
score.textContent = scoreCounter
let over = false;
let keydownFlag = false
let firstRender = true;
const generateArea = () => {
  container.style.width = `${snakeItemWH * areaX}px`
  container.style.height = `${snakeItemWH * areaY}px`
  for (let r = 0; r < areaX; r++) {
    const row = document.createElement('div');;
    row.classList.add('snake-row')
    areaTable.push([])
    for (let t = 0; t < areaY; t++) {
      const rowItem = document.createElement('div');;
      rowItem.classList.add('snake-item')
      rowItem.style.width = `${snakeItemWH}px`
      rowItem.style.height = `${snakeItemWH}px`
      rowItem.appendChild(document.createElement('div'))
      row.appendChild(rowItem)
      areaTable[r][t] = rowItem
    }
    container.appendChild(row)
  }
}

const clearSnake = () => {
  snakePositions.forEach(pos => {
    if (pos == snakePositions[0]) areaTable[pos[0]][pos[1]].classList.remove('snake-head', 'dol', 'prawo', 'lewo', 'gora', 'undefined')
    else areaTable[pos[0]][pos[1]].classList.remove('snake-body', 'prosto-x', 'prosto-y', 'dol-prawo', 'gora-prawo', 'gora-lewo', 'dol-lewo', 'snake-tail', 'snake-tail-dol', 'snake-tail-gora', 'snake-tail-prawo', 'snake-tail-lewo')
  })
}

const drawSnake = () => {
  snakePositions.forEach((pos, i) => {
    if (pos == snakePositions[0]) areaTable[pos[0]][pos[1]].classList.add('snake-head')
    else {
      if (snakePositions.length > 2 && pos !== snakePositions[snakePositions.length - 1]) {

        if (((snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] === (pos[1] + 1) % (areaY) && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] === (pos[1] - 1) % (areaY)) ||
          (snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] === (pos[1] - 1) % (areaY) && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] === (pos[1] + 1) % (areaY))) ||
          ((snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] === 1 && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] === 19) ||
            (snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] === 19 && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] === 1))
        ) {
          areaTable[pos[0]][pos[1]].classList.add('prosto-y')
        } else if (((snakePositions[i - 1][0] - 1 === pos[0] && snakePositions[i - 1][1] === pos[1] && snakePositions[i + 1][0] + 1 === pos[0] && snakePositions[i + 1][1] === pos[1]) ||
          (snakePositions[i - 1][0] + 1 === pos[0] && snakePositions[i - 1][1] === pos[1] && snakePositions[i + 1][0] - 1 === pos[0] && snakePositions[i + 1][1] === pos[1]))
          ||
          ((snakePositions[i - 1][0] === 1 && snakePositions[i - 1][1] === pos[0] && snakePositions[i + 1][0] === 19 && snakePositions[i + 1][1] === pos[0]) ||
            (snakePositions[i - 1][0] === 19 && snakePositions[i - 1][1] === pos[0] && snakePositions[i + 1][0] === 1 && snakePositions[i + 1][1] === pos[0]))) {
          areaTable[pos[0]][pos[1]].classList.add('prosto-x')
        } else if ((snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] + 1 === pos[1] && snakePositions[i + 1][0] - 1 === pos[0] && snakePositions[i + 1][1] === pos[1]) ||
          (snakePositions[i - 1][0] - 1 === pos[0] && snakePositions[i - 1][1] === pos[1] && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] + 1 === pos[1])) {
          areaTable[pos[0]][pos[1]].classList.add('dol-prawo')
        } else if ((snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] - 1 === pos[1] && snakePositions[i + 1][0] - 1 === pos[0] && snakePositions[i + 1][1] === pos[1]) ||
          (snakePositions[i - 1][0] - 1 === pos[0] && snakePositions[i - 1][1] === pos[1] && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] - 1 === pos[1])) {
          areaTable[pos[0]][pos[1]].classList.add('gora-prawo')
        } else if ((snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] - 1 === pos[1] && snakePositions[i + 1][0] + 1 === pos[0] && snakePositions[i + 1][1] === pos[1]) ||
          (snakePositions[i - 1][0] + 1 === pos[0] && snakePositions[i - 1][1] === pos[1] && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] - 1 === pos[1])) {
          areaTable[pos[0]][pos[1]].classList.add('gora-lewo')
        } else if ((snakePositions[i - 1][0] === pos[0] && snakePositions[i - 1][1] + 1 === pos[1] && snakePositions[i + 1][0] + 1 === pos[0] && snakePositions[i + 1][1] === pos[1]) ||
          (snakePositions[i - 1][0] + 1 === pos[0] && snakePositions[i - 1][1] === pos[1] && snakePositions[i + 1][0] === pos[0] && snakePositions[i + 1][1] + 1 === pos[1])) {
          areaTable[pos[0]][pos[1]].classList.add('dol-lewo')
        }
        const last = snakePositions[snakePositions.length - 1]
        const second = snakePositions[snakePositions.length - 2]
        if (last[0] === second[0] && last[1] - 1 === second[1]) {
          areaTable[last[0]][last[1]].classList.add('snake-tail-gora')
        } else if (last[0] === second[0] && last[1] + 1 === second[1]) {
          areaTable[last[0]][last[1]].classList.add('snake-tail-dol')
        } else if (last[0] + 1 === second[0] && last[1] === second[1]) {
          areaTable[last[0]][last[1]].classList.add('snake-tail-prawo')
        } else if (last[0] - 1 === second[0] && last[1] === second[1]) {
          areaTable[last[0]][last[1]].classList.add('snake-tail-lewo')
        }
      } else if (snakePositions.length === 2) {
        const pos = snakePositions[1]
        switch (direction) {
          case 'gora':
            areaTable[pos[0]][pos[1]].classList.add('snake-tail-gora')
            break;
          case 'dol':
            areaTable[pos[0]][pos[1]].classList.add('snake-tail-dol')
            break;
          case 'lewo':
            areaTable[pos[0]][pos[1]].classList.add('snake-tail-lewo')
            break;
          case 'prawo':
            areaTable[pos[0]][pos[1]].classList.add('snake-tail-prawo')
            break;
        }

      }
      areaTable[pos[0]][pos[1]].classList.add('snake-body')

    }
  })
  head = document.querySelector('.snake-head')
  head.classList.add(direction)
}

const snakeMove = () => {
  clearSnake()

  switch (direction) {
    case 'gora':
      snakeY = snakeY - 1 < 0 ? over = true : snakeY - 1;
      break;
    case 'dol':
      snakeY = (snakeY + 1) > 19 ? over = true : (snakeY + 1);
      break;
    case 'lewo':
      snakeX = snakeX - 1 < 0 ? over = true : snakeX - 1;
      break;
    case 'prawo':
      snakeX = (snakeX + 1) > 19 ? over = true : (snakeX + 1);
      break;
  }
  if (over) {
    drawSnake()
    return null
  }
  snakePositions.pop()
  snakePositions.unshift([snakeX, snakeY])
  drawSnake()
}

const drawPoint = () => {
  try {
    document.querySelector('.point').classList.remove('point')
  }
  catch (TypeError) { }

  pointX = Math.floor(Math.random() * areaX)
  pointY = Math.floor(Math.random() * areaY)

  for (let pos of snakePositions) {
    if (pointX === pos[0] && pointY === pos[1]) {
      drawPoint()
      break
    }
  }
  areaTable[pointX][pointY].classList.add('point')
}

const eat = () => {
  if (snakeX === pointX && snakeY === pointY) {
    snakePositions.push([pointX, pointY])
    score.textContent = ++scoreCounter;
    drawPoint()
  }
}

const GameOver = () => {
  snakePositions.slice(4).forEach(pos => {
    if ((pos[0] == snakeX && pos[1] == snakeY) || (pos[0] < 0 || pos[0] > 19) || (pos[1] < 0 || pos[1] > 19)) {
      over = true
    }
  })

}

btnReset.addEventListener('click', () => {
  clearInterval(GameInterval)
  lose.classList.remove('active')
  container.innerHTML = ''
  snakeX = snakeStartX
  snakeY = snakeStartY
  snakePositions = [[snakeX, snakeY]]
  score.textContent = 0;
  scoreCounter = 0
  score.textContent = scoreCounter
  direction = undefined;
  over = false;
  firstRender = true;
  GameInterval = setInterval(Game, frequency)
})

window.addEventListener('keydown', e => {
  if (!keydownFlag) {
    switch (e.keyCode) {
      case 38:
      case 87:
        if (direction !== 'dol') direction = 'gora'
        break;
      case 40:
      case 83:
        if (direction !== 'gora') direction = 'dol'
        break;
      case 37:
      case 65:
        if (direction !== 'prawo') direction = 'lewo'
        break;
      case 39:
      case 68:
        if (direction !== 'lewo') direction = 'prawo'
        break;

    }
    directions[0] = direction
    keydownFlag = true;
  }
})


const Game = () => {
  if (firstRender) {
    generateArea()
    drawPoint()
    firstRender = false;
  }
  if (over) {
    clearInterval(GameInterval)
    return;
  }
  snakeMove()
  GameOver()
  if (over) {
    lose.classList.add('active')
  }
  eat()
  keydownFlag = false;
}

const switching = document.querySelector('.switch')

const whiteBtn = document.getElementById('white')
whiteBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = "white"
  container.style.borderColor = "black"
  document.body.style.color = "black"
  switching.style.boxShadow = "0 0 0 5px black"
})

const blackBtn = document.getElementById('black')
blackBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = "black"
  container.style.borderColor = "white"
  document.body.style.color = "white"
  switching.style.boxShadow = "0 0 0 5px white"
})

let GameInterval = setInterval(Game, frequency)