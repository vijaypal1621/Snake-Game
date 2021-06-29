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
            pen.fillStyle="red";
            for(var i=0;i<this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
            
        }

    }
    snake.createSnake();

}

function draw(){
    snake.drawSnake();
}

function update(){
    
}

function gameloop(){
    draw();
    update();
}

init();
var f= setInterval(gameloop,100);