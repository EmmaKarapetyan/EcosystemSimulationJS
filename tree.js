class Tree {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 5;
        this.multiply = 0;
        this.energy = 2;

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
        if(this.energy <= 1){
            this.die()
        }
        else{
            this.multiply++;
            let emptyCells = this.chooseCell(0);
            let emptyCell = random(emptyCells);
            if (this.multiply >= 15) {
                if (emptyCell) {
                    let x = emptyCell[0]
                    let y = emptyCell[1]
                    matrix[y][x] = 5
                    let tree = new Tree(x, y)
                    grassArr.push(tree)
                    this.multiply = 0
                }
            }
        }
    }

    die(){
        matrix[this.y][this.x] = 0;
        for (var i in treeArr) {
            if (this.x == treeArr[i].x && this.y == treeArr[i].y) {
                treeArr.splice(i, 1);
                break;
            }
        }
    }

}

