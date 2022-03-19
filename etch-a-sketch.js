// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');//The element is the canvas
const ctx = canvas.getContext('2d');//The place where we do the drawing is the context

const shakeButton = document.querySelector('.shake');
const sizeButtonPlus = document.querySelector('.sizePlus');
const sizeButtonMinus = document.querySelector('.sizeMinus');
let size = document.querySelector('label');

const redBtn = document.querySelector('.red');
const greenBtn = document.querySelector('.green');
const blueBtn = document.querySelector('.blue');
const purpleBtn = document.querySelector('.purple');
const rainbowBtn = document.querySelector('.rainbow');
const randomColorBtn = document.querySelector('.randomColor');

const MOVE_AMOUNT = 10;
let color = 'black';//The color of the marker on the canvas.
//Setup our canvas for drawing
ctx.strokeStyle = '#FF0000';

/* Make a variable called height and width from the same properties on our canvas */
let {width, height} = canvas; //Destructuring const width = canvas.width and const height = canvas.height;

/* Create random x and y starting points on the canvas */
let x = Math.floor(Math.random()*width);
let y = Math.floor(Math.random()*height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';//round edge at end of line
ctx.lineWidth = 10;

let hue = 0;
ctx.strokeStyle = `hsl(${hue},62%,50%)`;
ctx.beginPath();//start the drawing. Like, putting a marker on a page.
ctx.moveTo(x,y);//The start point. 200px from the top and to the right.
ctx.lineTo(x,y);//The finish point.
ctx.stroke();//Make the stroke.


//Write a handler for the keys
function handleKey(e) {
    
    if(e.key.includes('Arrow')) {
        e.preventDefault();
        draw({key:e.key})
    }
}

//Write a draw function
function draw({ key }) { //When passing many arguments can use an object to store properties to pass instead, such as an 'options' parameter. Also, you can destructure the object and pass { key } and get acess to the variable more easily.
    
    if(color==='rainbow'){
        hue+=1;
        ctx.strokeStyle = `hsl(${hue},62%,50%)`;
    }
    if(color==='randomColor'){
        ctx.strokeStyle = `hsl(${Math.random()*360},62%,50%)`;
    }
    
    ctx.beginPath();//Start the path
    ctx.moveTo(x,y);//Start
    //Move x and y values depending on user input
   switch (key) {
    case 'ArrowUp':
        y-= MOVE_AMOUNT;
        break;
    case 'ArrowDown':
        y+= MOVE_AMOUNT;
        break;
    case 'ArrowLeft':
        x-= MOVE_AMOUNT;
        break;
    case 'ArrowRight':
        x+= MOVE_AMOUNT;
        break;
    default:
      break;
    }
    ctx.lineTo(x,y);
    ctx.stroke();
}


//Clear/shake function
function clearCanvas() { 
    canvas.classList.add('shake');
    canvas.addEventListener('animationend', () => {
    canvas.classList.remove('shake');
    console.log("Done"); 
    }, {once: true});//Once will ensure the event listener is removed after it is finished it's job. That way each time the function is called it doesn't add another event listener. You could also write code using removeEventListener to do the same thing.
   // canvas.classList.remove('shake');
    ctx.clearRect(0, 0, width, height);
    
}

function changeSize() {
    console.log('change size');
    if(this===sizeButtonPlus){
        ctx.lineWidth += 10;
    }
    else if(this===sizeButtonMinus){
        ctx.lineWidth -= 10;
        
        
    }
    size.textContent = `Size: ${ctx.lineWidth}`;
    
}


function changeColor() {
    console.log(this.textContent);
    switch (this.textContent) {
        case 'Red':
            ctx.strokeStyle = 'red';
            color = 'red';
            break;
        case 'Blue':
            ctx.strokeStyle = 'blue';
            color = 'blue';
            break;
        case 'Green':
            ctx.strokeStyle = 'green';
            color = 'green';
            break;
        case 'Purple':
            ctx.strokeStyle = 'purple';
            color = 'purple';
            break;
        case 'Rainbow':
                //increment the hue
            ctx.strokeStyle = `hsl(${hue},62%,50%)`; //Change the hue.
            color = 'rainbow';
            break;
        case 'Random color':
            ctx.strokeStyle = `hsl(${Math.random()*360},62%,50%)`;
            color = 'randomColor';
            break;
        default:
            break;
    }

}
shakeButton.addEventListener('click', clearCanvas);
sizeButtonPlus.addEventListener('click', changeSize);
sizeButtonMinus.addEventListener('click', changeSize);

redBtn.addEventListener('click', changeColor);
greenBtn.addEventListener('click', changeColor);
blueBtn.addEventListener('click', changeColor);
purpleBtn.addEventListener('click', changeColor);
rainbowBtn.addEventListener('click', changeColor);
randomColorBtn.addEventListener('click', changeColor);
//Listen for arrow keys
window.addEventListener('keydown', handleKey);
//window.addEventListener('keyup', handleKey);