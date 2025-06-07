class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 7;
        this.index = 3;
        this.directions = [];
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

    move(character) {
        let emptyCells = this.chooseCell(character);
        let emptyCell = random(emptyCells);
        if (emptyCell) {
            this.energy--;
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            if (this.energy <= 0) {
                this.die();
            }
            return true
        }
        else{
            return false
        }
    }

    eat() {
        let newCells = this.chooseCell(2);
        let newCell = random(newCells);
        if (newCell) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            if (this.energy >= 12) {
                this.mul();
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            if(!(this.move(0))){
                this.move(1)
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

    mul() {
        let emptyCells = this.chooseCell(0);
        let emptyCell = random(emptyCells);
        if (emptyCell) {
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = this.index;
            let newPredator = new Predator(newX, newY);
            predatorArr.push(newPredator)
            this.energy = 7
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }

}