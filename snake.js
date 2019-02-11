//Changing properties
const areaX = 20;
const areaY = 20;
const snakeItemWH = 20;
const snakeStartX = Math.floor(areaX/2)
const snakeStartY = Math.floor(areaY/2)
const frequency = 250

//Program variables
const areaTable = [];
const lose = document.querySelector('.lose')
const container = document.querySelector('.snake-container')
const score = document.getElementById('score')
const btnReset = document.getElementById('restart')
let snakeX = snakeStartX 
let snakeY = snakeStartY 
let snakePositions = [[snakeX,snakeY]]
let pointX;
let pointY;
let head;
let direction;
let scoreCounter = 0;
score.textContent = scoreCounter
let over = false;
let keydownFlag = false
let firstRender = true;
const generateArea = ()=>{  
  container.style.width = `${snakeItemWH*areaX}px`
  container.style.height = `${snakeItemWH*areaY}px`
  for(let r=0;r<areaX;r++){
    const row = document.createElement('div');;
    row.classList.add('snake-row')
    areaTable.push([])
    for(let t=0;t<areaY;t++){
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

const clearSnake = () =>{
  snakePositions.forEach(pos=>{
    if(pos==snakePositions[0])  areaTable[pos[0]][pos[1]].classList.remove('snake-head','dol','prawo','lewo','gora','undefined')
    else areaTable[pos[0]][pos[1]].classList.remove('snake-body')
  })
}

const drawSnake = () =>{
  snakePositions.forEach(pos=>{
    if(pos==snakePositions[0])  areaTable[pos[0]][pos[1]].classList.add('snake-head')
    else  areaTable[pos[0]][pos[1]].classList.add('snake-body')
  })
  head = document.querySelector('.snake-head')
  head.classList.add(direction)
}

const snakeMove = () => {
  clearSnake()
  snakePositions.pop()
  switch (direction) {
    case 'gora':
    snakeY = snakeY -1 < 0 ? areaY-1 :snakeY-1;
    break;
    case 'dol':
    snakeY = (snakeY +1)%areaY;
    break;
    case 'lewo':
    snakeX = snakeX -1 < 0 ? areaX-1 : snakeX-1;
    break;
    case 'prawo':
    snakeX = (snakeX +1)%areaX;
    break;
  }
  snakePositions.unshift([snakeX,snakeY])
  drawSnake()
}

const drawPoint = () =>{
  try {
  document.querySelector('.point').classList.remove('point')
  }
  catch(TypeError){}

  pointX = Math.floor(Math.random()*areaX)
  pointY = Math.floor(Math.random()*areaY)

  for(let pos of snakePositions){
    if(pointX === pos[0] && pointY === pos[1]){
      drawPoint()
      break
    }
  }
  areaTable[pointX][pointY].classList.add('point')
}

const eat = () =>{
  if(snakeX === pointX && snakeY === pointY){
    snakePositions.unshift([pointX,pointY])
;
    score.textContent = ++scoreCounter;
    drawPoint()
  }
}

const GameOver = () =>{
  snakePositions.slice(4).forEach(pos=>{
    if(pos[0] == snakeX && pos[1] == snakeY){
      over = true
      lose.classList.add('active')
   }
  })

}

btnReset.addEventListener('click',() =>{
  clearInterval(GameInterval)
  lose.classList.remove('active')
  container.innerHTML = ''
  snakeX = snakeStartX 
  snakeY = snakeStartY 
  snakePositions = [[snakeX,snakeY]]
  score.textContent = 0;
  scoreCounter = 0
  score.textContent= scoreCounter
  direction =  undefined;
  over = false;
  firstRender = true;
  GameInterval = setInterval(Game,frequency)
})

window.addEventListener('keydown',e=>{
  if(!keydownFlag){
  switch (e.keyCode) {
      case 38:
      case 87:
      if(direction !== 'dol')direction = 'gora'
      break;
      case 40:
      case 83:
      if(direction !== 'gora') direction = 'dol'
      break;
      case 37:
      case 65:
      if(direction !== 'prawo')direction = 'lewo'
      break;
      case 39:
      case 68:
      if(direction !== 'lewo')direction = 'prawo'
      break;
  }
  keydownFlag = true;
  }
})


const Game = () =>{
  if(firstRender){
    generateArea()
    drawPoint()
    firstRender = false;
  }
  if(over){
    clearInterval(GameInterval)
    return;
  }
  snakeMove()
  GameOver()
  eat()
  keydownFlag = false;
}

const switching = document.querySelector('.switch')

const whiteBtn = document.getElementById('white')
whiteBtn.addEventListener('click',()=>{
  document.body.style.backgroundColor = "white"
  container.style.borderColor = "black"
  document.body.style.color = "black"
  switching.style.boxShadow = "0 0 0 5px black"
})

const blackBtn = document.getElementById('black')
blackBtn.addEventListener('click',()=>{
  document.body.style.backgroundColor = "black"
  container.style.borderColor = "white"
  document.body.style.color = "white"
  switching.style.boxShadow = "0 0 0 5px white"
})

let GameInterval = setInterval(Game,frequency)