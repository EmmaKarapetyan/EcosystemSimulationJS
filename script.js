var matrix = [];
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let bearArr = [];
let treeArr = [];
let bombArr = [];
var side = 100;

let n = 10;
let m = 10;



function setup() {
    createMatrix();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    createHero(1, 60)
    createHero(2, 7)
    createHero(3, 2)
    createHero(4, 1)
    createThisHero(6, 5)

    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[i].length; ++j) {
            if (matrix[i][j] == 1) {
                let grass = new Grass(j, i)
                grassArr.push(grass)
            }
            else if (matrix[i][j] == 2) {
                let grassEater = new GrassEater(j, i)
                grassEaterArr.push(grassEater)
            }
            else if (matrix[i][j] == 3) {
                let predator = new Predator(j, i)
                predatorArr.push(predator)
            }
            else if (matrix[i][j] == 4) {
                let bear = new Bear(j, i)
                bearArr.push(bear)
            }
            else if (matrix[i][j] == 5) {
                let tree = new Tree(j, i)
                treeArr.push(tree)
            }
            else if (matrix[i][j] == 6) {
                let bomb = new Bomb(j, i)
                bombArr.push(bomb)
            }
        }
    }
}


function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("brown");
            }
            else if (matrix[y][x] == 5) {
                fill("aqua");
            }
            else if (matrix[y][x] == 6) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul()
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (var i in predatorArr) {
        predatorArr[i].eat()
    }

    for (var i in bearArr) {
        bearArr[i].step()
    }

    for (var i in treeArr) {
        treeArr[i].mul()
    }

    for (var i in bombArr) {
        bombArr[i].step()
    }

}

function createMatrix() {
    for (let i = 0; i < n; i++) {
        matrix.push([])
        for (let j = 0; j < m; j++) {
            matrix[i].push(0)
        }
    }
}

function createHero(index, count) {
    for (let i = 0; i < count; i++) {
        let x = Math.round(random(0, matrix[0].length - 1))
        let y = Math.round(random(0, matrix.length - 1))
        if (matrix[y][x] == 0) {
            matrix[y][x] = index
        }
        else {
            count++
        }
    }
}

function createThisHero(index, count) {
    for (let i = 0; i < count; i++) {
        let x = Math.round(random(0, matrix[0].length - 1))
        let y = Math.round(random(0, matrix.length - 1))
        if (matrix[y][x] == 0 && checkHeros(x, y, index)) {
            matrix[y][x] = index
        }
        else {
            count++
        }
    }
}

function checkHeros(x, y, index) {
    var dir = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
    ];

    for (var i of dir) {
        if (i[0] >= 0 && i[1] >= 0 && i[0] < m && i[1] < n) {
            if (matrix[i[1]][i[0]] == index) {
                return false;
            }
        }
    }
    return true;
}
