const DEFAULT_COLOR = 'black'
const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE

const gridC = document.getElementById('gridContainer')
const eraserBtn = document.getElementById('eraser')
const clearGrid = document.getElementById('clearGrid')
const rainbowBtn = document.getElementById('rainbow')
const colorInput = document.getElementById('colorInput')
const color = document.getElementById('color')
const gridSize = document.getElementById('gridSize')

//buttons functionality 
eraserBtn.onclick = () => setMode('eraser')
rainbowBtn.onclick = () => setMode('rainbow')
color.onclick = () => setMode('color')
colorInput.oninput = (e) => setColor(e.target.value)
clearGrid.onclick = () => reloadGrid()
gridSize.oninput = (e) => changeSize(e.target.value)

function setMode(newMode) {
    currentMode = newMode
}

function setColor(newColor) {
    currentColor = newColor
}

function setSize(newSize) {
    currentSize = newSize
}

function changeSize(n) {
    if(n <= 64) {
        setSize(n)
        reloadGrid()
        gridSize.innerHTML = n * n
        gridSize.style.color = 'black'
    } else if(n > 64){
        gridSize.style.color = 'red'
    }   
}

function makeGrid(size) {
    gridC.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridC.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for(let i = 0; i < (size*size); i++) {
        const grid = document.createElement('div')
        grid.addEventListener('mouseover', changeColor)
        grid.addEventListener('mousedown', changeColor)
        gridC.appendChild(grid).className = 'grid-item';
    }
}

function reloadGrid() {
    clear()
    makeGrid(currentSize)
}

function clear() {
    gridC.innerText = ''
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    if(e.type == 'mouseover' && !mouseDown) return
    if(currentMode == 'rainbow') {
        let randomR = Math.floor(Math.random() * 256)
        let randomG = Math.floor(Math.random() * 256)
        let randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if(currentMode == 'color') {
        e.target.style.backgroundColor = currentColor
    } else if(currentMode == 'eraser') {
        e.target.style.backgroundColor = 'white'
    }

}


window.onload = () => {
    makeGrid(DEFAULT_SIZE)
    setMode(DEFAULT_MODE)
}