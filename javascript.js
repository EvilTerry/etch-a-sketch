function createGrid(size) {
    for(let i = 0; i < size; i++)
    {
        const line = document.createElement('line');
        line.setAttribute('class', 'line');
        for(let j = 0; j < size; j++)
        {
            const div = document.createElement('div');
            div.setAttribute('style', 
            'width: 100%; height: 100%; border: solid; border-width: 1px');
            //div.setAttribute('class', 'block');
            div.addEventListener('mouseover', () => {
                div.style.background = 'black';
            });
            line.appendChild(div);   
        }
        container.appendChild(line);
    }
}

function reset() {
    let child = container.firstChild;
    do {
        size = prompt("1-100 size");
    } while(size > 100 || size <= 0);

    while(child) {
        child.remove();
        child = container.firstChild;
    }
    createGrid(size);
}


const container = document.querySelector('.container');
let size = 20;//prompt("x");

createGrid(size);

const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', () => { reset() });