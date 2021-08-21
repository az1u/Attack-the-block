//creating a asset to move around
let mover = document.querySelector('.mover')
let modifier = 10

window.addEventListener('load', () =>{
mover.style.top = 0
mover.style.left = 0
mover.style.position = 'absolute'

})

window.addEventListener('keydown' , (e) =>{
  
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