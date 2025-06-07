class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 6;
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y - 1], [this.x, this.y - 1], [this.x + 1, this.y - 1],
            [this.x - 1, this.y], [this.x + 1, this.y],
            [this.x - 1, this.y + 1], [this.x, this.y + 1], [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        let found = [];
        for (let dir of this.directions) {
            let x = dir[0];
            let y = dir[1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(dir);
                }
            }
        }
        return found;
    }

    step() {
        if (this.energy > 15) {
            for (var item of this.directions) {
                for (var i in bombArr) {
                    if (item[0] == bombArr[i].x && item[1] == bombArr[i].y) {
                        bombArr.splice(i, 1);
                        matrix[item[1]][item[0]] = 0;
                        break;
                    }
                }
            }
            for (var i in bombArr) {
                if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                    bombArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
        else if (this.energy == 11) {
            for (let dir of this.directions) {
                let x = dir[0];
                let y = dir[1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    let jIndex = matrix[y][x];
    
                    matrix[y][x] = this.index;
                    let bomb = new Bomb(x, y);
                    bombArr.push(bomb);
    
                    if (jIndex == 1) {
                        for (let i = 0; i < grassArr.length; i++) {
                            if (x === grassArr[i].x && y === grassArr[i].y) {
                                grassArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (jIndex == 2) {
                        for (let i = 0; i < grassEaterArr.length; i++) {
                            if (x === grassEaterArr[i].x && y === grassEaterArr[i].y) {
                                grassEaterArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (jIndex == 3) {
                        for (let i = 0; i < predatorArr.length; i++) {
                            if (x === predatorArr[i].x && y === predatorArr[i].y) {
                                predatorArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (jIndex == 4) {
                        for (let i = 0; i < bearArr.length; i++) {
                            if (x === bearArr[i].x && y === bearArr[i].y) {
                                bearArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (jIndex == 5) {
                        for (let i = 0; i < treeArr.length; i++) {
                            if (x === treeArr[i].x && y === treeArr[i].y) {
                                treeArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
            this.energy++;
        }
        else {
            this.energy++;
        }
    }
}