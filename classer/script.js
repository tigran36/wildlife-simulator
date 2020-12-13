var matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 2, 0],
    [0, 4, 1, 0, 0],
    [1, 1, 5, 3, 0],
    [1, 1, 0, 4, 0],
    [1, 1, 0, 2, 0]
];

var element = document.getElementsByTagName("button");
var element = document.getElementsByClassName("power");
function changeColor(newColor) {
    document.body.style.background = newColor
  }
function grassnumber() {
    document.write(grassArr.length)
}

console.log(element)
function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
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

function genRandomMatrix(w, h) {
    var matrix = []
    for (var i = 0; i < h; i++) {
        matrix[i] = [];
        for (var j = 0; j < w; j++) {

            matrix[i][j] = getRanInt(0, 5)

        }
    }
    return matrix
}

function beginingOfLife() {
    if (grassEatArr.length === 0 && PredatorArr.length === 0) {
        setup()
    }
}

setInterval(beginingOfLife, 10000)


var side = 60;

var grassArr = []
var grassEatArr = []
var PredatorArr = []
var GodArr = []
var BishopArr = []

function setup() {
    var w = getRanInt(8, 20)
    var h = getRanInt(8, 20)
    matrix = genMatrix(w, h);
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
console.log(grassArr)

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

// //ES5

// let obj = {};
// let obj1 = new Object();

// obj1.hasOwnProperty()


// var arr = []; //or 
// var arr1 = new Array;

// Array.__proto__ = Object;

// Object.__proto__ = null

// Array.prototype.vazel = function () {
//     //some code
// }

// var matrix = [];

// matrix.vazel()

// foo.__proto__ = Function();

// function foo () {
//     //some code
// }


// arr1.__proto__ = Array;
// arr.push()


// class Animal {
//     constructor() {
//         this.jump = true;
//     }
// }

// function Grass(x, y, index) {
//     this.x = x;
//     this.y = y;
//     this.index = index;
// }

// Grass.prototype.move() = function () {
//     //some code
// }

// Grass.__proto__ = Animal

// Grass.prototype.energy = 15

// var grass = new Grass(1,2,1)
// var grass1 = new Grass(2,3,1)


// grass.move()
// grass1.move()

// //ES6
// class Animal {
//     constructor() {
//         this.jump = true;
//     }
// }
// class GrassEater extends Animal {
//     constructor(x, y, index) {
//         this.x = x;
//         this.y = y;
//         this.index = index;
//     }

//     move() {
//         //some
//     }
// }

// var grassEater = new GrassEater(4,5,2)




