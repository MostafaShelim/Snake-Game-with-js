//id ta k niye asha
let canvas = document.getElementById('snake');

//canvas property and method use kora jnno context use kora
let ctx = canvas.getContext('2d');

//snake array create kora
let box = 32;
let snake = [];
snake[0] = {
    x : box * 9,
    y : box * 10
}
//food creat kora randomly
let food = {
    x : Math.floor(Math.random()*17 + 1)*box,
    y : Math.floor(Math.random()*15 + 3)*box
};
// background Image ta k niye asha
let groundImg = new Image();
groundImg.src = 'img/ground.png';

//food Image ta k niye asha
let foodImg = new Image();
foodImg.src = 'img/food.png';

// audio gula niye asha
let dead = new Audio();
let eat = new Audio();
let right = new Audio();
let left = new Audio();
let up = new Audio();
let down = new Audio();
dead.src = 'audio/dead.mp3';
eat.src = 'audio/eat.mp3';
right = 'audio/right.mp3';
left = 'audio/left.mp3';
up = 'audio/up.mp3';
down = 'audio/down.mp3';

//arrow key gular eventListener songjog kora
document.addEventListener('keydown', direction);
let d;
function direction(event){
    let keyCode = event.keyCode;
    if(keyCode == 37 && d != 'right') {d = 'left'; left.play();}
    else if(keyCode == 38 && d != 'down') {d = 'up'; up.play();}
    else if(keyCode == 39 && d != 'left') {d = 'right'; right.play();}
    else if(keyCode == 40 && d != 'up') {d = 'down'; down.play();}
}
// collision check kora
function collision(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y) return true;
    }
    return false;
}
let score = 0;
// full structure draw kora
function draw(){
    //ground Image
    ctx.drawImage(groundImg, 0, 0);

    //snake create 
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i==0) ? 'black' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    //food Image
    ctx.drawImage(foodImg, food.x, food.y);

    //snake new head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // snake food ate and increasing size
    snakeX = (d == 'left') ? snakeX - box : snakeX;
    snakeX = (d == 'right') ? snakeX + box : snakeX;
    snakeY = (d == 'up') ? snakeY - box : snakeY;
    snakeY = (d == 'down') ? snakeY + box : snakeY;
    
    // snake etes food check
    if(snakeX == food.x && snakeY == food.y){
        eat.play();
        score++;
        food = {
            x : Math.floor(Math.random()*17 + 1)*box,
            y : Math.floor(Math.random()*15 + 3)*box
        };
    }else snake.pop();

    // newHead variable
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over check
    if(snakeX > box * 17 || snakeX < box || snakeY > box * 17 || snakeY < 3 * box || collision(newHead, snake)){
        dead.play();
        clearInterval(game);
    }
    //sob thik thakle newHead unshift kora
    snake.unshift(newHead);
    
    // text of score creat kora
    ctx.fillStyle = 'orange';
    ctx.fillText(score, box*2, box*1.6);
    ctx.font = "45px Changa one";
}
// setInterval call kora 

let game = setInterval(draw, 150);