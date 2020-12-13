class GrassEater extends Livingcreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    chooseCell(character) {
        this.getNewCoordinates();

        return super.chooseCell(character);
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

    move() {
        var empty = random(this.chooseCell(0));

        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = this.index
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