class Grass {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 1;
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
        let emptyCells = this.chooseCell(0);
        let emptyCell = random(emptyCells);
        if (this.multiply >= 8) {
            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]
                matrix[y][x] = 1
                let gr = new Grass(x, y)
                grassArr.push(gr)
                this.multiply = 0
            }
        }
    }



}

