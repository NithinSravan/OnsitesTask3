let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let cells = [];
let columns;
let rows ;

let begin=false;
let loop;

window.onload = function () {
    canvas.width = window.innerWidth;
    canvas.height =0.8* window.innerHeight;
    columns = canvas.width/4;
    rows =canvas.height/3;
    window.addEventListener('click', clicked)
    createGrid();
    game();
}
let mouse = {
    x: undefined,
    y: undefined
};
function dist(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return (Math.sqrt((dx * dx) + (dy * dy)));
}
window.addEventListener("click", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})
function clicked() {
    window.removeEventListener('click', clicked)
    for(let i=cells.length-1;i>=0;i--){
        cells[i].makeAlive();
    }
  
}
class Cell
{
    constructor ( x, y)
    {
        this.side = canvas.width/140;
        this.x= x;
        this.y = y;
        this.alive = 0;
        this.tempState;
    }

    draw() {
        ctx.beginPath();
        if(this.alive)
        ctx.fillStyle = 'rgb(34, 35, 77)';
        else
        ctx.fillStyle = 'rgb(190, 240, 255)';
        ctx.strokeStyle="#000";
        ctx.strokeRect(this.x* this.side, this.y * this.side, this.side, this.side);
        ctx.fillRect(this.x* this.side, this.y * this.side, this.side, this.side);
    }
    makeAlive(){
        window.addEventListener('click', clicked)
  
        if ((mouse.x >= this.x* this.side) && (mouse.y >= this.y * this.side) && (mouse.x < this.x*this.side + this.side) && (mouse.y <  this.y * this.side + this.side)) {
           if(!this.alive)
            this.alive=1;
            else
            this.alive=0;
        }
    }
}


function createGrid()
{
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            cells.push(new Cell( x, y));
        }
    }
}

function checkState(x, y)
{
    if (x < 0 || x >=columns || y < 0 || y >=rows){
        return 0;
    }
    return cells[x+(y*columns)].alive;
}

function checkNeighbours ()
{
      
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {

            let aliveNeighbours = checkState(x - 1, y - 1) + checkState(x, y - 1) + checkState(x + 1, y - 1) + checkState(x - 1, y) + checkState(x + 1, y) + checkState(x - 1, y + 1) + checkState(x, y + 1) + checkState(x + 1, y + 1);
            let index =  x + y * columns;

            if (aliveNeighbours == 2){
                cells[index].tempState = cells[index].alive;
            }else if (aliveNeighbours == 3){
                cells[index].tempState = 1;
            }else{
                cells[index].tempState = 0;
            }
        }
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].alive = cells[i].tempState;
    }
}

function start(){
    begin=true;
}
function stop(){
    begin=false;
}

function game() {
    loop= setInterval( () => {
    if(begin)
        checkNeighbours();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < cells.length; i++) {
            cells[i].draw();
        }
    }, 200)

}
