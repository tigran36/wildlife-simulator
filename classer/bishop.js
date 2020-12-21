class Bishop extends Livingcreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y + 1]
        ];
    }
    // has a smaller viewpoint as it moves/multiples like a chess bishop
    // crates a diagonal line from where it appeared and separates the canvas

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }


    eat() {
        var yntrvacner = []

        random(this.chooseCell(0)) ? yntrvacner.push(random(this.chooseCell(0))) : null;
        random(this.chooseCell(1)) ? yntrvacner.push(random(this.chooseCell(1))) : null;
        random(this.chooseCell(2)) ? yntrvacner.push(random(this.chooseCell(2))) : null;
        random(this.chooseCell(3)) ? yntrvacner.push(random(this.chooseCell(3))) : null;
        random(this.chooseCell(4)) ? yntrvacner.push(random(this.chooseCell(4))) : null;
        random(this.chooseCell(11)) ? yntrvacner.push(random(this.chooseCell(11))) : null;
        // makes an array and adds all possible cells 

        var newCell = yntrvacner.length != 0 ? random(yntrvacner) : null;
        // finds out if the array isn't empty and choses a random cell ut of the available ones

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            var newBishop = new Bishop(newCell[0], newCell[1], this.index);
            BishopArr.push(newBishop);

            if (matrix[newY][newX] === 0) {
                matrix[newY][newX] = this.index
                
            }
            if (matrix[newY][newX] === 2) {
                matrix[newY][newX] = this.index
                

                for (var i in grassEatArr) {
                    if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
                        grassEatArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 1) {
                matrix[newY][newX] = this.index

                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 3) {
                matrix[newY][newX] = this.index

                for (var i in PredatorArr) {
                    if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                        PredatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 4) {
                matrix[newY][newX] = this.index

                for (var i in GodArr) {
                    if (newX == GodArr[i].x && newY == GodArr[i].y) {
                        GodArr.splice(i, 1);
                        break;
                    }
                }
            }
            if (matrix[newY][newX] === 11) {
                matrix[newY][newX] = this.index
            }
        }
        // can eat/multiply on anything 
    }
}