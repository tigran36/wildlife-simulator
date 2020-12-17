var matrix = [];

var side = 60;

var grassArr = []
var grassEatArr = []
var PredatorArr = []
var GodArr = []
var BishopArr = []

function getselectsize() {
    let select = document.getElementById("size")
    return select.value
}


function changeColor() {
    let colorArr = ["red", "blue", "green", "yellow", "orange", "purple"]
    let colorNumber = getRanInt(0, colorArr.length)

    document.body.style.background = colorArr[colorNumber]
}

function refresh() {
    location.reload()
}

function armagedon() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 66
        }
    }
    grassArr.length = 0
    grassEatArr.length = 0
    PredatorArr.length = 0
    GodArr.length = 0
    BishopArr.length = 0
}

function genMatrix(matrixsize) {
    var matrix = [];
    for (var y = 0; y < matrixsize; y++) {
        matrix[y] = [];
        for (var x = 0; x < matrixsize; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 30) r = 0;
            else if (r < 60) r = 1;
            else if (r < 90) r = 2;
            else if (r < 98) r = 3;
            else if (r < 99) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

function getRanInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setup() {
    let matrixsize = getselectsize()
    matrix = genMatrix(matrixsize);
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var deer = new GrassEater(x, y, 2)
                grassEatArr.push(deer)
            }
            else if (matrix[y][x] == 3) {
                var wolf = new Predator(x, y, 3)
                PredatorArr.push(wolf)
            }
            else if (matrix[y][x] == 4) {
                var Zeus = new God(x, y, 4)
                GodArr.push(Zeus)
            }
            else if (matrix[y][x] == 5) {
                var Pix = new Bishop(x, y, 5)
                BishopArr.push(Pix)
            }
        }
    }
}



function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 11) {
                fill("orange");
            }
            else if (matrix[y][x] == 5) {
                fill("brown");
            }
            else if (matrix[y][x] == 66) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEatArr) {
        grassEatArr[i].move()
        grassEatArr[i].mul()
        grassEatArr[i].eat()
        grassEatArr[i].die()
    }
    for (var i in PredatorArr) {
        PredatorArr[i].move()
        PredatorArr[i].eat()
        PredatorArr[i].mul()
        PredatorArr[i].die()
    }
    for (var i in GodArr) {
        GodArr[i].bomb()
    }
    for (var i in BishopArr) {
        BishopArr[i].eat()
    }
}

