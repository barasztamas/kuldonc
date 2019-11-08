import { Coordinates } from "./utils.js";

export class Board {
    /**
     * @param  { Number } size
     * @param  { Coordinates[][] } castles
     */
    constructor(size, castles){
        /** @type {Coordinates|false} */
        this._actual = false;
        /** @type {Square[][]} */
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
            // this.squares = squares;
            // for (let i = 0; i < this.squares.length; i++) {
            //     /** @type {Square[]} */
            //     const row = this.squares[i];
            //     for (let j = 0; j < row.length; j++) {
            //         /** @type {Square} */
            //         const square = row[j];
            //         if (square.actual) {
            //             this.actual = new Coordinates(i,j);
            //         }
            //     }
            // }
    }
    /**
     * @param  {Number} color
     */
    removeLine(color) {
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
            this.squares[this._actual.row][this._actual.col].actual = false;
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
     * @param  {Coordinates} coordinates
     * @param  {Square} square
     */
    setCell(coordinates, square) {
        this.squares[coordinates.row][coordinates.col] = square;
    }
    
    /**
     * @param  {Coordinates} a
     * @param  {Coordinates} b
     */
     connect(a,b){
        let success = false;
        const cellA = this.getCell(a);
        const cellB = this.getCell(b);
        if          (a.row === b.row   && a.col === b.col+1) {
            cellA.left=true;
            cellB.right=true;
            success=true;
        } else if   (a.row === b.row   && a.col === b.col-1) {
            cellA.right=true;
            cellB.left=true;
            success=true;
        } else if   (a.row === b.row+1 && a.col === b.col) {
            cellA.top=true;
            cellB.bottom=true;
            success=true;
        } else if   (a.row === b.row-1 && a.col === b.col) {
            cellA.bottom=true;
            cellB.top=true;
            success=true;
        }
        if (success) {
            cellA.color ? cellB.color=cellA.color : cellA.color=cellB.color;
        }
        return success;
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