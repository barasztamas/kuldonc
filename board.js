import { Coordinates } from "./utils.js";

export class Board {
    /**
     * @param  { Number } size
     * @param  { Coordinates[][] } castles
     */
    constructor(size, castles){
        /** @type {Coordinates|false} */
        this._actual = false;
        /** @type {Square[][]|false} */
        this.squares=[];
        for (let rownum = 0; rownum < size; rownum++) {
            /** @type {Square[]} */
            const row=[];
            for (let colnum = 0; colnum < size; colnum++) {
                row.push(new Square());
            }
            this.squares.push(row);
        }
        if (castles) {
            for (let i = 0; i < castles.length; i++) {
                castles[i].forEach(castle => {
                    this.getCell(castle).castle = i+1;
                });
            }
        }
    }
    /**
     * @param  {Number} color
     */
    removeLine(color) {
        if (this.actual && this.getCell(this.actual).color===color) {
            this.actual=false;
        }
        for (let i = 0; i < this.squares.length; i++) {
            /** @type {Square[]} */
            const row = this.squares[i];
            for (let j = 0; j < row.length; j++) {
                /** @type {Square} */
                const square = row[j];
                if (square.color===color) {
                    this.squares[i][j] = new Square(square.castle);
                }
            }
        }
    }
    /**
     * @param  {Coordinates|false} coordinates
     */
    set actual(coordinates) {
        if (this._actual) {
            this.getCell(this._actual).actual = false;
        }
        if (coordinates) {
            this.squares[coordinates.row][coordinates.col].actual = true;
        }
        this._actual = coordinates;
    }
    get actual(){
        return this._actual;
    }
    
    /**
     * @param  {Coordinates} coordinates
     * @returns {Square}
     */
    getCell(coordinates) {
        return this.squares[coordinates.row][coordinates.col];
    }
    /**
     * @param  {Coordinates} a
     * @param  {Coordinates} b
     * @param  {boolean} toConnect
     */
    connect(a,b,toConnect=true){
        let success = false;
        const cellA = this.getCell(a);
        const cellB = this.getCell(b);
        if          (a.row === b.row   && a.col === b.col+1) {
            cellA.left=toConnect;
            cellB.right=toConnect;
            success=true;
        } else if   (a.row === b.row   && a.col === b.col-1) {
            cellA.right=toConnect;
            cellB.left=toConnect;
            success=true;
        } else if   (a.row === b.row+1 && a.col === b.col) {
            cellA.top=toConnect;
            cellB.bottom=toConnect;
            success=true;
        } else if   (a.row === b.row-1 && a.col === b.col) {
            cellA.bottom=toConnect;
            cellB.top=toConnect;
            success=true;
        }
        if (success) {
            if (toConnect) {
                if (a.equals(this.actual)) {
                    cellB.color = cellA.color;
                    this.actual = b;
                } else if (b.equals(this.actual)) {
                    cellA.color = cellB.color;
                    this.actual = a;
                }
            }
            if (!toConnect) {
                    if (a.equals(this.actual)) {
                    cellA.color = 0;
                    this.actual = b;
                } else if (b.equals(this.actual)) {
                    cellB.color = 0;
                    this.actual = a;
                }
            }
        }
        return success;
    }

    /**
     * @param  {Coordinates} a
     * @param  {Coordinates} b
     */
    isConnected(a,b){
        const cellA = this.getCell(a);
        const cellB = this.getCell(b);
        return (a.row === b.row     && a.col === b.col+1    && cellA.left   && cellB.right  )
            || (a.row === b.row     && a.col === b.col-1    && cellA.right  && cellB.left   )
            || (a.row === b.row+1   && a.col === b.col      && cellA.top    && cellB.bottom )
            || (a.row === b.row-1   && a.col === b.col      && cellA.bottom && cellB.top    )
    }

    isFull() {
        return this.squares.length && this.squares.every(row => { return row.every(cell => {return !!cell.color})});
    }
}

export class Square {
    /**
     * @param  {Number} castle=0
     */
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