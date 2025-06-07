class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 6;
        this.energy = 5;
        this.endEnergy = Math.floor(Math.random() * (50 - 19)) + 20;
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

    step() {
        if (this.energy > this.endEnergy + 5) {
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
        else if (this.energy == this.endEnergy) {
            this.bbbomb();
            this.energy++;
        }
        else {
            this.energy++;
        }
    }

    bbbomb() {
        for (let item of this.directions) {
            let x1 = item[0];
            let y1 = item[1];
            if (x1 >= 0 && x1 < n && y1 >= 0 && y1 < m) {
                let entityIndex = matrix[y1][x1];
                this.removeEntity(x1, y1, entityIndex);
                matrix[y1][x1] = this.index;
                let bomb = new Bomb(x1, y1);
                bombArr.push(bomb);
            }
        }
    }


    removeEntity(x, y, entityIndex) {
        let entityArray = null;
        switch (entityIndex) {
            case 1:
                entityArray = grassArr;
                break;
            case 2:
                entityArray = grassEaterArr;
                break;
            case 3:
                entityArray = predatorArr;
                break;
            case 4:
                entityArray = bearArr;
                break;
            case 5:
                entityArray = treeArr;
                break;
        }

        if (entityArray) {
            for (let i = entityArray.length - 1; i >= 0; i--) {
                if (x === entityArray[i].x && y === entityArray[i].y) {
                    entityArray.splice(i, 1);
                    break;
                }
            }
        }

/*        if (jIndex == 1) {
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
        } */        
    }
}

