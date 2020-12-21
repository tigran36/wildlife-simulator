class Predator extends GrassEater{
    
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
    // eats grasseaters, index 2
    
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 12 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;
        }
    }
    // multiplies just like grasseater

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
    // dies just like grasseater
}