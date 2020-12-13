class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

class GrassEater {

    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 9;
        this.index = index;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var empty = random(this.chooseCell(0));

        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy -= 1;
        }

    }
    eat() {
        var avGrass = random(this.chooseCell(1));
        if (avGrass) {
            var newX = avGrass[0]
            var newY = avGrass[1]
            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy += 2;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var newGrassEat = new GrassEater(newCell[0], newCell[1], this.index);
            grassEatArr.push(newGrassEat);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;
        }
    }

    die() {
        if (this.energy <= 0) {
            for (var i in grassEatArr) {
                if (this.x == grassEatArr[i].x && this.y == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0
        }
    }


}

class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 9;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var empty = random(this.chooseCell(0));

        if (empty) {
            var newX = empty[0]
            var newY = empty[1]


            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0

            // else if(matrix[newY][newX] == 1){
            //     matrix[newY][newX] = this.index
            //     matrix[this.y][this.x] = 1
            // }
            this.x = newX
            this.y = newY
            this.energy -= 1;
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;
        }
    }

    eat() {
        var avDeer = random(this.chooseCell(2));
        if (avDeer) {
            var newX = avDeer[0]
            var newY = avDeer[1]
            matrix[newY][newX] = this.index
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy += 2;
            for (var i in grassEatArr) {
                if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    die() {
        if (this.energy <= 0) {
            for (var i in PredatorArr) {
                if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0
        }
    }

}

class God {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    bomb() {
        var foundGR = this.chooseCell(2)
        var foundP = this.chooseCell(3)
        if (foundGR.length != 0 || foundP != 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                    if (matrix[y][x] != 0 && matrix[y][x] == 2) {
                        matrix[y][x] = 11
                        for (var i in grassEatArr) {
                            if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
                                grassEatArr.splice(i, 1);
                                break;
                            }
                        }
                    } else if (matrix[y][x] != 0 && matrix[y][x] == 3) {
                        matrix[y][x] = 11
                        for (var i in PredatorArr) {
                            if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                                PredatorArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}

class Bishop {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        var yntrvacner = []

        random(this.chooseCell(0)) ? yntrvacner.push(random(this.chooseCell(0))) : null;
        random(this.chooseCell(1)) ? yntrvacner.push(random(this.chooseCell(1))) : null;
        random(this.chooseCell(2)) ? yntrvacner.push(random(this.chooseCell(2))) : null;
        random(this.chooseCell(3)) ? yntrvacner.push(random(this.chooseCell(3))) : null;
        random(this.chooseCell(4)) ? yntrvacner.push(random(this.chooseCell(4))) : null;
        random(this.chooseCell(11)) ? yntrvacner.push(random(this.chooseCell(11))) : null;



        var newCell = random(yntrvacner)

        if (newCell) {
            console.log(newCell)
            var newX = newCell[0];
            var newY = newCell[1];
            var newBishop = new Bishop(newCell[0], newCell[1], 5);
            BishopArr.push(newBishop);

            if (matrix[newY][newX] === 0) {
                matrix[newY][newX] = this.index
                matrix[this.y][this.x] = 5
                // this.x = newX
                // this.y = newY
            }
            if (matrix[newY][newX] === 2) {
                matrix[newY][newX] = this.index
                matrix[this.y][this.x] = 5
                // this.x = newX
                // this.y = newY

                for (var i in grassEatArr) {
                    if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
                        grassEatArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 1) {
                matrix[newY][newX] = this.index
                matrix[this.y][this.x] = 5
                // this.x = newX
                // this.y = newY
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 3) {
                matrix[newY][newX] = this.index
                matrix[this.y][this.x] = 5
                // this.x = newX
                // this.y = newY
                for (var i in PredatorArr) {
                    if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                        PredatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 4) {
                matrix[newY][newX] = this.index
                matrix[this.y][this.x] = 5
                // this.x = newX
                // this.y = newY
                for (var i in GodArr) {
                    if (newX == GodArr[i].x && newY == GodArr[i].y) {
                        GodArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 11) {
                matrix[newY][newX] = this.index
                matrix[this.y][this.x] = 5
                // this.x = newX
                // this.y = newY

            }
        }


    }

}