


// defining the initial objects and state
function init(){
    
    var canvas = document.getElementById('mycanvas');
    W = canvas.height = 600;
    H = canvas.width = 600;
    pen = canvas.getContext('2d');
    cs = 40;
    game_over = false;
    game_pause = false;
    score = 5;

    // create a Image Object for food
    food_img = new Image();
    food_img.src = "Assets/food.png";

    // create a new trophy
    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    food = getRandomFood();

    snake = { // snake object
        initial_length : 2,
        color: "blue",
        cells : [],
        direction:"right", // default direction

        createSnake : function(){
            for(var i=this.initial_length;i>0;i--){
                this.cells.push({
                    x:i,
                    y:0
                });
            }
        }
            ,
        drawSnake: function(){
            pen.fillStyle=this.color;
            for(var i=0;i<this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
            
        },
        updateSnake : function(){

            // check if snake has eaten the food, increase the length by 1
            // also generate next food location            
            var oldHeadX=this.cells[0].x;
            console.log(oldHeadX);
            var oldHeadY=this.cells[0].y;

            var nextX,nextY;

            if(this.direction == "right"){
                nextX=oldHeadX + 1;
                nextY=oldHeadY;
            }else if(this.direction == "left"){
                nextX=oldHeadX - 1;
                nextY=oldHeadY;
            }else if(this.direction == "down"){ // down side is positive
                nextX=oldHeadX;
                nextY=oldHeadY + 1; 
            }else{
                nextX=oldHeadX;
                nextY=oldHeadY - 1;
            }

            if(checkMatchCoordinates(nextX,nextY)){
                game_over=true;
            }

            if(oldHeadX== food.x && oldHeadY == food.y){
                food = getRandomFood();
                while(true){
                    if(checkMatchCoordinates(food.x,food.y)){
                        food=getRandomFood();
                    }else{
                        break;
                    }
                }
                score++;
            }else{
                // only when food is not eaten
                this.cells.pop(); // basically we are removing the first cell and adding it to the last

            }
            
            
            this.cells.unshift({x:nextX,y:nextY}); // adding new cell at the begining

            // if snake goes out of window
            // then game is over

            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].x <= -1 || this.cells[0].y <= -1 || this.cells[0].x > last_x-1 || this.cells[0].y > last_y-1 ){
                game_over = true;
            }




        }


    }
    snake.createSnake();

    //Add a event listener on the document object
    function keyPressed(e){
        if(e.key == "ArrowLeft"){
            if(snake.direction != "right")
            snake.direction = "left";
        }else if(e.key == "ArrowRight"){
            if(snake.direction != "left")
            snake.direction = "right";
        }else if(e.key == "ArrowUp"){
            if(snake.direction != "down")
            snake.direction = "up";
        }else if(e.key == "ArrowDown"){
            if(snake.direction != "up")
            snake.direction = "down"; 
        }else if(e.code=="Space"){
            game_pause = game_pause ^ 1;
        }

    }
    document.addEventListener('keydown',keyPressed);



}


function checkMatchCoordinates(x,y){
    for(var i=0;i<snake.cells.length;i++){    
        if(x == snake.cells[i].x && y == snake.cells[i].y){
            return true;
        }
    }    
    return false;
}

function draw(){

    // erase the prev scene cell which is at the beginning
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle = "white";
    pen.font = "30px Roboto";
    pen.fillText(score,50,50);
} 

function update(){
     snake.updateSnake(); // during Inactivity of the user
}

function getRandomFood(){ // to get a random food co-ordinates
    var foodX= Math.round(Math.random()*(W-cs)/cs);
    var foodY= Math.round(Math.random()*(H-cs)/cs);

    var food = { // food object
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food; 
}

function gameloop(){
    if(game_over){
        clearInterval(f);
        alert("game is over ");
        return;
    }
    if(!game_pause){        
        draw();
        update();
    }

}

init();
var f= setInterval(gameloop,125);