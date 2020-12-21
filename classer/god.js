class God extends Livingcreature{
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
    // stays in one place, when a grasseater or a predator touches it, it dies and the cell/square the animal died in turns orange(11)
}