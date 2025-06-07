class Bear {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.treeEnergy = 20;
        this.index = 4;
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
        let newCells = this.chooseCell(character);
        let newCell = random(newCells);
        if (newCell) {
            this.treeEnergy++;
            matrix[this.y][this.x] = 0;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
            return true;
        }
        return false;
    }

    step() {
        if (this.energy <= 0) {
            this.die();
        }
        else if (this.energy >= 40) {
            this.mul();
        }
        else{
            let geCells = this.chooseCell(2);
            let geCell = random(geCells);
            if (geCell) {
                this.energy--;
                let geX = geCell[0];
                let geY = geCell[1];
                matrix[geY][geX] = 0;
                for (var i in grassEaterArr) {
                    if (geX == grassEaterArr[i].x && geY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }

            let pCells = this.chooseCell(3);
            let pCell = random(pCells);
            if (pCell) {
                this.energy++;
                let pX = pCell[0];
                let pY = pCell[1];
                matrix[pY][pX] = 0;
                for (var i in predatorArr) {
                    if (pX == predatorArr[i].x && pY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }

            if (this.treeEnergy >= 11) {
                this.plant();
            }
            else{
                this.treeEnergy++;
            }
        }
    }

    plant() {
        let nX = this.x;
        let nY = this.y;
        
        if (this.move(0) == false) {
            this.move(1);
            this.energy--;
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }

        let newTree = new Tree(nX, nY);
        treeArr.push(newTree);
        this.treeEnergy = 1;
        matrix[nY][nX] = 5;
    }

    mul() {
        let emptyCells = this.chooseCell(0);
        let emptyCell = random(emptyCells);
        if (emptyCell) {
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = this.index;
            let newBear = new Bear(newX, newY);
            bearArr.push(newBear)
            this.energy = 5
        }
        else {
            let emptyCells = this.chooseCell(1);
            let emptyCell = random(emptyCells);
            if (emptyCell) {
                let newX = emptyCell[0];
                let newY = emptyCell[1];
                matrix[newY][newX] = this.index;
                let newBear = new Bear(newX, newY);
                bearArr.push(newBear)
                this.energy = 5 
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in bearArr) {
            if (this.x == bearArr[i].x && this.y == bearArr[i].y) {
                bearArr.splice(i, 1);
                break;
            }
        }
    }
}



