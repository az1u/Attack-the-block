//creating a asset to move around
let mover = document.querySelector('.mover')
let modifier = 10

window.addEventListener('load', () =>{
mover.style.top = 0
mover.style.left = 0
mover.style.position = 'absolute'

})


window.addEventListener('keydown' , (e) =>{
    keysPressed[e.key] = true;


    switch(e.key){
        case 'ArrowUp': 
            mover.style.top = parseInt(mover.style.top) - modifier + 'px'; 
            break
        case 'ArrowDown': 
            mover.style.top = parseInt(mover.style.top) + modifier + 'px'; 
            break
        case 'ArrowRight': 
            mover.style.left = parseInt(mover.style.left) + modifier + 'px'; 
            break
        case 'ArrowLeft': 
            mover.style.left = parseInt(mover.style.left) - modifier + 'px'; 
            break   
        }
})

// DIAGONAL DIRECTION CONTROL FOR PLAYER 
let keysPressed = {}
window.addEventListener('keydown', (event) =>{
keysPressed[event.key] = true;
if (keysPressed['ArrowDown'] && event.key == 'ArrowRight') {
            mover.style.left = parseInt(mover.style.left)  + modifier + 'px';
            mover.style.top = parseInt(mover.style.top) + modifier + 'px';
        }
else if (keysPressed['ArrowUp'] && event.key == 'ArrowRight') {
            mover.style.left = parseInt(mover.style.left)  + modifier + 'px';
            mover.style.top = parseInt(mover.style.top) - modifier + 'px';
        }
else if (keysPressed['ArrowDown'] && event.key == 'ArrowLeft') {
            mover.style.left = parseInt(mover.style.left)  - modifier + 'px';
            mover.style.top = parseInt(mover.style.top) + modifier + 'px';
        }
else if (keysPressed['ArrowLeft'] && event.key == 'ArrowUp') {
            mover.style.left = parseInt(mover.style.left)  - modifier + 'px';
            mover.style.top = parseInt(mover.style.top) - modifier + 'px';
    }
})


document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });

