const DEFAULT_SIZE = 16;
const DEFAULT_COLOUR = "black";
const DEFAULT_MODE = "colour";

let currentSize = DEFAULT_SIZE;
let currentColour = DEFAULT_COLOUR;
let currentMode = DEFAULT_MODE;

const grid = document.querySelector('.grid');
const colorPicker = document.querySelector('.colorPicker');
const colourBtn = document.querySelector('.colour');
const rainbowBtn = document.querySelector('.rainbow');
const eraserBtn = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear');
const sizeText = document.querySelector('.size');
const slider = document.querySelector('.slider');

colorPicker.addEventListener('change', (e) => {currentColour = e.target.value}, false)
clearBtn.addEventListener('click', gridClear);
colourBtn.addEventListener('click', () => modeChange('colour'));
rainbowBtn.addEventListener('click', () => modeChange('rainbow'));
eraserBtn.addEventListener('click', () => modeChange('eraser'));
slider.oninput = sizeChange;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(size) {
    for(let i = 0; i < size; i++)
    {
        const line = document.createElement('line');
        line.setAttribute('class', 'line');
        for(let j = 0; j < size; j++)
        {
            const div = document.createElement('div');
            div.setAttribute('style', 
            'width: 100%; height: 100%;');
            div.setAttribute('class', 'block');
            div.addEventListener('mouseover', changeColour);
            div.addEventListener('mousedown', changeColour);
            line.appendChild(div);   
        }
        grid.appendChild(line);
    }
}

function changeColour(e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    if(currentMode === 'colour')
        e.target.style.background = currentColour;
    else if(currentMode === 'eraser')
        e.target.style.background = "white";
    else if(currentMode === 'rainbow')
    {
        let randomR = Math.floor(Math.random() * 255);
        let randomG = Math.floor(Math.random() * 255);
        let randomB = Math.floor(Math.random() * 255);
        e.target.style.background = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}


function gridClear() {
    let child = grid.firstChild;
/*    do {
        currentSize = prompt("1-100 size");
    } while(currentSize > 100 || currentSize <= 0);
*/
    while(child) {
        child.remove();
        child = grid.firstChild;
    }
    createGrid(currentSize);
}

function sizeChange() {
    currentSize = this.value;
    sizeText.textContent = `${currentSize}x${currentSize}`;
    gridClear();
}

function modeChange(mode) {
    if(mode === 'colour')
    {
        currentMode = 'colour';
        colourBtn.style.background = '#9b866e';
        rainbowBtn.style.background = '#C6AD8E';
        eraserBtn.style.background = '#C6AD8E';
    }
    else if(mode === 'rainbow')
    {
        currentMode = 'rainbow';
        rainbowBtn.style.background = '#9b866e';
        colourBtn.style.background = '#C6AD8E';
        eraserBtn.style.background = '#C6AD8E';
    }
    else if(mode === 'eraser')
    {
        currentMode = 'eraser';
        eraserBtn.style.background = '#9b866e';
        colourBtn.style.background = '#C6AD8E';
        rainbowBtn.style.background = '#C6AD8E';
    }
}


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    modeChange(DEFAULT_MODE);
}
