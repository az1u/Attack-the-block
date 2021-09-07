var randomNumberBetween = (min, max) => {
    return min + Math.random()*(max-min)
}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    static add(vector1, vector2){
        return new Vector(vector1.x +vector2.x, vector1.y +vector2.y)
    }
    static mult(vector, scalar){
        return new Vector( vector.x*scalar, vector.y*scalar)
    }
    static sub(vector1, vector2){
        return   new Vector(vector1.x- vector2.x, vector1.y-vector2.y)
    }
    static div(vector, scalar){
        return new Vector( vector.x/scalar, vector.y/scalar)
    }
    mag(){
        return Math.sqrt(Math.pow(this.x, 2)+ Math.pow(this.y, 2))
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
        this.pos = Vector.random(1080, 1080, 0, height)
        this.vel= Vector.random(-0.1, .01, 0, 0);
        this.acc = new Vector(-.01, 0);
        this.height = 10
        this.width = 25 
    }
    update(){
        this.pos = Vector.add(this.pos, this.vel)
        this.vel = Vector.add(this.vel, this.acc)
        this.acc = Vector.mult(this.acc, 1)
    
        //creates wrap around for 
        if( this.pos.x < 0){
            this.pos = Vector.random(1080, 1080, 0, 500)
            this.vel= Vector.random(-0.1, 0, 0, 0);
            this.acc = new Vector(-0.01, 0);
        }   
    }
    checkCollision(object){
        const v = Vector.sub(this.pos, object.pos)
        const dist = v.mag()
        console.log(dist)
    }
}
class Projectile{
    constructor(vector){
            this.pos = new Vector(25, 275)
            this.vel = new Vector(0, 0)
            this.acc = new Vector( 0, 0)
            this.radius = 3
    }
    update(){
        this.pos = Vector.add(this.pos, this.vel)
        this.vel = Vector.add(this.vel, this.acc)
        this.acc = Vector.mult(this.acc, 0)
    }
    handleEdges(width){
    if(this.pos.x >= width){
        this.vel.x = 0
    }
    }
}
class EnemyJet{
    constructor(width, height){
        this.pos = new Vector(1045, 450)
        this.vel= Vector.random(0, 0, -.01, .03);
        this.acc = new Vector(0, -1.5);
        this.radius =  35
    }
    update(){
        this.pos = Vector.add(this.pos, this.vel)
        this.vel = Vector.add(this.vel, this.acc)
        this.acc = Vector.mult(this.acc, 0)
    }
    handleEdges(width, height){
        if(this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= height){
            this.vel.y = -this.vel.y
        }

    }
}
class Player{
    constructor(){
    //creating an asset to move around
    this.pos = new Vector(0, 250)
    this.vel= Vector.random(0, 0, 0, 0);
    this.acc = new Vector(0, 0);
    this.height =50;
    this.width = 50;
    }
    update(){
        this.pos = Vector.add(this.pos, this.vel)
        this.vel= Vector.add(this.vel, this.acc)
        this.acc = Vector.mult(this.acc, 0)
    }
    checkCollision(object){
        const v = Vector.sub(this.pos, object.pos)
        const dist = v.mag()

    if(dist <=this.width + object.width || dist <= this.height + object.height){
        console.log('hit')
        }
    }

}
class Canvas{
    constructor(){
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        
        this.canvas.style.cursor = 'none'
        this.canvas.width = 1080;
        this.canvas.height = 500;
        this.setup();   

        this.canvas.addEventListener('mousemove', (e) => {
            const mousePos = new Vector(e.x, e.y)
            this.player[0].pos = mousePos
            // this.gun[0].pos.x = e.x +25
            // this.gun[0].pos.y = e.y +25
        })
        this.canvas.addEventListener('click', (e) => {
            this.gun[0].pos.x = e.x +25
            this.gun[0].pos.y = e.y +25
            this.gun[0].vel = new Vector(.05, 0)
            this.gun[0].acc = new Vector(10, 0)
            
        })

        requestAnimationFrame(() => this.update());
        }
    setup(){
        this.enemy = [new EnemyJet(1030,250)]
        this.player = [new Player(50, 250)]
        const playerShots = 100;
        this.gun = []
        const NUM_BARRIERS = 7;
        this.barrier =[];

        for(let i = 0; i < NUM_BARRIERS; i++){
            this.barrier.push(new Barrier(
            randomNumberBetween(0, this.canvas.width),
            this.canvas.height
            ))
        }
        for(let i = 0; i < playerShots; i++){
            this.gun.push(new Projectile())
        }
    }
      update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
// constant collision detection loop between player and flying objects
        for(let i = 0; i < this.barrier.length; i++){
            const objectPos = this.barrier[i]
            const playerPos = this.player
            
            for (let p of playerPos){
                p.checkCollision(objectPos)
                
            }        
        }     
// build object shape
        for(let block of this.barrier){ 
            block.update();
            this.ctx.fillStyle = '#ff0000';
            this.ctx.beginPath();
            this.ctx.fillRect( block.pos.x, block.pos.y , block.width , block.height );
            this.ctx.fill();
        }
    //build enemy shape
        for(let fighter of this.enemy){ 
            fighter.update();
            fighter.handleEdges(this.canvas.width, this.canvas.height)
            this.ctx.fillStyle = '#ff0';
            this.ctx.beginPath();
            this.ctx.arc(fighter.pos.x, fighter.pos.y, fighter.radius,0, 2*Math.PI)
            this.ctx.fill();
        }
    // build player & hitbox
        for(let defender of this.player){ 
            defender.update();
            this.ctx.fillStyle = '#ff0';
            this.ctx.beginPath();
            this.ctx.fillRect(defender.pos.x, defender.pos.y , defender.width , defender.height);
            this.ctx.fill();
        }
 //build projectile
        for(let bullet of this.gun){ 
            bullet.update();
            bullet.handleEdges(this.canvas.width)
            this.ctx.fillStyle = '#00ff00';
            this.ctx.beginPath();
            this.ctx.arc(bullet.pos.x, bullet.pos.y, bullet.radius,0, 2*Math.PI)
            this.ctx.fill();
        }
        requestAnimationFrame(() => this.update());
      }
    
}

new Canvas()

































// window.addEventListener('keydown' , (e) =>{
//     keysPressed[e.key] = true;


//     switch(e.key){
//         case 'ArrowUp': 
//             mover.style.top = parseInt(mover.style.top) - modifier + 'px'; 
//             break
//         case 'ArrowDown': 
//             mover.style.top = parseInt(mover.style.top) + modifier + 'px'; 
//             break
//         case 'ArrowRight': 
//             mover.style.left = parseInt(mover.style.left) + modifier + 'px'; 
//             break
//         case 'ArrowLeft': 
//             mover.style.left = parseInt(mover.style.left) - modifier + 'px'; 
//             break   
//         }
// })

// // DIAGONAL DIRECTION CONTROL FOR PLAYER 
// let keysPressed = {}
// window.addEventListener('keydown', (event) =>{
// keysPressed[event.key] = true;
// if (keysPressed['ArrowDown'] && event.key == 'ArrowRight') {
//             mover.style.left = parseInt(mover.style.left)  + modifier + 'px';
//             mover.style.top = parseInt(mover.style.top) + modifier + 'px';
//         }
// else if (keysPressed['ArrowUp'] && event.key == 'ArrowRight') {
//             mover.style.left = parseInt(mover.style.left)  + modifier + 'px';
//             mover.style.top = parseInt(mover.style.top) - modifier + 'px';
//         }
// else if (keysPressed['ArrowDown'] && event.key == 'ArrowLeft') {
//             mover.style.left = parseInt(mover.style.left)  - modifier + 'px';
//             mover.style.top = parseInt(mover.style.top) + modifier + 'px';
//         }
// else if (keysPressed['ArrowLeft'] && event.key == 'ArrowUp') {
//             mover.style.left = parseInt(mover.style.left)  - modifier + 'px';
//             mover.style.top = parseInt(mover.style.top) - modifier + 'px';
//     }
// })


// document.addEventListener('keyup', (event) => {
//     delete keysPressed[event.key];
//  });

