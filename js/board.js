import { Coordinates } from "./utils.js";
import { Square } from "./square.js";

export class Board {
    /**
     * @param  { Number } rows
     * @param  { Number } cols
     * @param  { Coordinates[][] } castles
     */
    constructor(rows, cols, castles){
        /** @type {Square} */
        this._actual = null;
        /** @type {Square} */
        this._actualStart = null;
        /** @type {Square[][]} */
        this.squares=[];
        for (let rownum = 0; rownum < rows; rownum++) {
            /** @type {Square[]} */
            const row=[];
            for (let colnum = 0; colnum < cols; colnum++) {
                row.push(new Square(rownum, colnum, this));
            }
            this.squares.push(row);
        }
        if (castles) {
            for (let i = 0; i < castles.length; i++) {
                castles[i].forEach(castle => {
                    this.getSquare(castle).castle = i+1;
                });
            }
        }
    }
    /**
     * @param  {Number} color
     */
    removeLine(color) {
        if (this.actual && this.actual.color===color) {
            this.actual=null;
        }
        for (let i = 0; i < this.squares.length; i++) {
            /** @type {Square[]} */
            const row = this.squares[i];
            for (let j = 0; j < row.length; j++) {
                /** @type {Square} */
                const square = row[j];
                if (square.color===color) {
                    this.squares[i][j] = new Square(i, j, this, square.castle);
                }
            }
        }
    }
    /**
     * @param  {Square} square
     */
    set actual(square) {
        if (square && !this._actual) {
            this._actualStart=square;
        }
        if (this._actual) {
            this._actual.actual = false;
        }
        if (square) {
            square.actual = true;
            this._actual = square;
        } else {
            this._actual = null;
            this._actualStart = null;
        }
    }
    get actual(){
        return this._actual;
    }
    
    /**
     * @param  {Coordinates | HTMLTableDataCellElement} param
     * @returns {Square}
     */
    getSquare(param) {
        if ("cellIndex" in param && "parentNode" in param && "rowIndex" in param.parentNode) {
            return this.squares[param.parentNode.rowIndex][param.cellIndex];
        } else if (param instanceof Coordinates || ("row" in param && "col" in param)) {
            return this.squares[param.row][param.col];
        }
    }

    isFull() {
        return this.squares.length &&
            this.squares.every(row => { return row.every(cell => {return !!cell.color})});
    }
}
