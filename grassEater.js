class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = 2;
        this.directions = [];
        this.inTree = false;
    }

    chooseCell(character) {
        this.getNewCoordinates();
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
        let emptyCells = this.chooseCell(0);
        let emptyCell = random(emptyCells);
        if (emptyCell) {
            this.energy--;
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    eat() {
        let newGrassCells = this.chooseCell(1);
        let newTreeCells = this.chooseCell(5);
        let newCell = random(newTreeCells.concat(newGrassCells))
        if (newCell) {
            this.energy++;
            if (this.inTree == true) {
                matrix[this.y][this.x] = 5;
                this.inTree = false;
            }
            else {
                matrix[this.y][this.x] = 0;
                this.inTree = false;
            }
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY;
            if (this.energy > 12) {
                this.mul();
            }
            if (this.inArr(newCell, newGrassCells)) {
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                for (var i in treeArr) {
                    if (newX == treeArr[i].x && newY == treeArr[i].y) {
                        if (treeArr[i].energy <=1 ) {
                            treeArr.splice(i, 1);
                            this.inTree = false;
                        }
                        else {
                            treeArr[i].energy--;
                            this.inTree = true;
                        }
                        break;
                    }
                }
            }
        }
        else {
            this.move();
        }
    }

    mul() {
        let emptyCells = this.chooseCell(0);
        let emptyCell = random(emptyCells);
        if (emptyCell) {
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 2;
            let newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater)
            this.energy = 8
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    inArr(item, arr) {
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i][0] == item[0] && arr[i][1] == item[1] ) {
                return true
            }
        }
        return false
    }
}


