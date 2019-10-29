export class Board {
    squares=[];
    constructor(size, castles, lines){
        for (let x = 0; x < size; x++) {
            const row=[];
            for (let y = 0; y < size; y++) {
                row.push(new Square());
            }
            this.squares.push(row);
        }
        if (castles) {
            for (let i = 0; i < castles.length; i++) {
                [0,1].forEach(j => {
                    const c = castles[i][j];
                    this.squares[c[0]][c[1]].castle = i+1;
                });
            }
        }
        this.lines = lines;
    }

    addLine(line){
        const e = line[0];
        const s = this.squares[e[0]][e[1]];
        const color = s.castle;
        this.removeLine(color);
        s.color = color;
        for (let i = 0; i < line.length - 1; i++) {
            const e0 = line[i];
            const e1 = line[i+1];
            const s0 = this.squares[e0[0]][e0[1]];
            const s1 = this.squares[e1[0]][e1[1]];
            if (e1[0]-e0[0] === 0 && e1[0]-e0[1] === 1) {
                s0.right = true;
                s1.left = true;
            } else if (e1[0]-e0[0] === 0 && e1[0]-e0[1] === -1) {
                s0.left = true;
                s1.right = true;
            } else if (e1[0]-e0[0] === 1 && e1[0]-e0[1] === 0) {
                s0.bottom = true;
                s1.top = true;
            } else if (e1[0]-e0[0] === -1 && e1[0]-e0[1] === 0) {
                s0.top = true;
                s1.bottom = true;
            } else {
                throw 'Invaid line';
            }
            s1.color = color;
        }
    }

    removeLine(color) {
        for (let i = 0; i < this.squares.length; i++) {
            const row = this.squares[i];
            for (let j = 0; j < row.length; j++) {
                const square = row[j];
                if (square.color===color) {
                    this.squares[i][j] = new Square(square.castle);
                }
            }
        }
    }
}

class Square {
    constructor(castle = 0){
        this.castle = castle;
        this.color = 0;
        this.actual = false;
        this.left = false;
        this.right = false;
        this.top = false;
        this.bottom = false;
    }
}