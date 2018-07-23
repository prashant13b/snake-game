const ctx = document.getElementById("snake").getContext("2d");

const pixel = 20;
const canvas = {
    width:500,
    height:500
}

let snake = [];
let score;
let direction;
let food;



document.onkeydown = (event) => {
    let key = event.keyCode
    if (key === 37 && direction!== "RIGHT"){
        direction = "LEFT"
    }
    else if(key === 38 && direction!== "DOWN" ){
        direction = "UP"
    }
    else if(key === 39 && direction!== "LEFT"){
        direction = "RIGHT"
    }
    else if(key === 40 && direction !== "UP"){
        direction = "DOWN"
    }

}

let getFood = () => {

    let x= Math.floor(Math.random()*(canvas.width/pixel))*pixel
    let y= Math.floor(Math.random()*(canvas.height/pixel))*pixel
    if (checkCollison({x,y})){
        return getFood()
    }
    else{
        return{x,y}
    }

}

let initGame = () => {
    score =0;
    snake[0]={
        x:9*pixel,
        y:10*pixel
    }
    food=getFood();
}

let drawSnake = (snake,index) => {
    ctx.save();
    ctx.fillStyle = (index===0) ? 'slateblue': 'mediumseagreen';
    ctx.fillRect(snake.x,snake.y,pixel,pixel);
    ctx.restore();
}

let drawFood = () => {
    ctx.fillStyle = "tomato"
    ctx.fillRect(food.x,food.y,pixel,pixel)
}

let checkCollison = head => {
    return snake.some(body => {
        return body.x === head.x && body.y === head.y
    })
}

let printScore = () => {
    ctx.fillStyle = "black"
    ctx.font="20px Arial";
    ctx.fillText(`Score : ${score}`,400,30)
}

initGame();
let draw = () => {

    ctx.clearRect(0,0,canvas.width,canvas.height)
    snake.forEach(drawSnake)
    drawFood();
   

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(snake[0].x===food.x&&snake[0].y===food.y){
        score++;
        food = getFood();
    }
    else{
        snake.pop();
    }

 
    if( direction === "LEFT") {
        if(snakeX<=0){
            snakeX= canvas.width;
        }
        else{
        snakeX -=pixel;
        }
    }
    if( direction === "DOWN") {
        if(snakeY>=canvas.height){
            snakeY=0
        }
        else{   snakeY +=pixel;
    }
}
    if( direction === "RIGHT") {
        if(snakeX>=canvas.width){
            snakeX= 0;
        }
        else{
        snakeX +=pixel;
        }
    }
    if( direction === "UP") {
        if(snakeY<=0){
            snakeY=canvas.height
        }
        else{   snakeY -=pixel;
    }
}
    let newHead = {
        x:snakeX,
        y:snakeY
    }
    
    if(checkCollison(newHead)){
        clearInterval(game);
    }
    printScore();
    snake.unshift(newHead);

}
    
    let game = setInterval(draw,100);