const gridC = document.getElementById('gridContainer')


function makeGrid(size) {
    gridC.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridC.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for(let i = 0; i < (size*size);i++) {
        const grid = document.createElement('div')
        gridC.appendChild(grid).className = 'grid-item';
    }
}

gridC.addEventListener('mouseover', function handleMouseOver(e) {
    e.target.style.backgroundColor = 'red'
})  

makeGrid(16, 16)