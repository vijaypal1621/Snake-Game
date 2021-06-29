// defining the initial objects and state
function init(){
    
    var canvas = document.getElementById('mycanvas');
    W = canvas.height = 1000;
    H = canvas.width = 1000;
    pen = canvas.getContext('2d');
    cs = 67;

    snake = { // snake object
        initial_length : 5,
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
            this.cells.pop(); // basically we are removing the first cell and adding it to the last
            var oldHeadX=this.cells[0].x;
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
            this.cells.unshift({x:nextX,y:nextY}); // adding new cell at the begining

        }


    }
    snake.createSnake();

    //Add a event listener on the document object
    function keyPressed(e){
        
        if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }else if(e.key == "ArrowRight"){
            snake.direction = "right";
        }else if(e.key == "ArrowUp"){
            snake.direction = "up";
        }else if(e.key == "ArrowDown"){
            snake.direction = "down"; 
        }

        console.log(snake.direction);

    }
    document.addEventListener('keydown',keyPressed);



}

function draw(){

    // erase the prev scene cell which is at the beginning
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
}

function update(){
    // snake.updateSnake(); // during Inactivity of the user
}

function gameloop(){
    draw();
    update();
}

init();
var f= setInterval(gameloop,100);