var randomNumberBetween = (min, max) => {
    return min + Math.random()*(max-min)
}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(vector){
        this.x += vector.x
        this.y += vector.y
    }
    static random(minX,maxX, minY, maxY){
        return new Vector( 
            randomNumberBetween(minX,maxX),
            randomNumberBetween(minY,maxY)
        )
    }
}
class Barrier{
    constructor(width, height){
        this.pos = Vector.random(0, width, 0, height)
        this.vel= Vector.random(0,0);
        this.acc = new Vector( 0,0)

    }
    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc*0;
    }
}
class Canvas{
    constructor(){
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
       
        document.body.appendChild(this.canvas)

        this.canvas.width = 1080;
        this.canvas.height = 500;
        this.setup();
        requestAnimationFrame(() => this.update());
        }
    setup(){
        const NUM_BARRIERS = 5;
        this.barrier =[];

        for(let i = 0; i < NUM_BARRIERS; i++){
            this.barrier.push(new Barrier(
            randomNumberBetween(0, this.canvas.width),
            randomNumberBetween(0, this.canvas.height)
            ))
        }
    }
      update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for(let block of this.barrier){ 
            block.update();
            this.ctx.fillStyle = 'rgba(255,255, 255, 1)';
            this.ctx.beginPath();
            this.ctx.fillRect( 10, 10, 20 , 5 );
            this.ctx.fill();
        }
        requestAnimationFrame(() => this.update());
      }
    
}

new Canvas()


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

