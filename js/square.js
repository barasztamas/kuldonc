import { Coordinates } from "./utils.js";
import { Board } from "./board.js";

export class Square extends Coordinates {
    /**
     * @param  {Number} row
     * @param  {Number} col
     * @param  {Board} parent
     * @param  {Number} castle=0
     * @param  {Number} color=0
     * @param  {boolean} left=false
     * @param  {boolean} right=false
     * @param  {boolean} top=false
     * @param  {boolean} bottom=false
     */
     constructor(row, col, parent, castle=0, color=0, left=false, right=false, top=false, bottom=false){
        super(row,col);
        this.parent = parent;
        this.castle = castle;
        this.color = color;
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.actual = false;
    }

    /**
     * @param  {Square} other
     */
    isConnected(other){
        return (this.row === other.row      && this.col === other.col+1     && this.left    && other.right  )
            || (this.row === other.row      && this.col === other.col-1     && this.right   && other.left   )
            || (this.row === other.row+1    && this.col === other.col       && this.top     && other.bottom )
            || (this.row === other.row-1    && this.col === other.col       && this.bottom  && other.top    )
    }

    /**
     * @param  {Square} other
     * @param  {boolean} toConnect
     */
    connect(other,toConnect=true){
        let neighbours = false;
        if          (this.row === other.row   && this.col === other.col+1) {
            this.left       =toConnect;
            other.right     =toConnect;
            neighbours      =true;
        } else if   (this.row === other.row   && this.col === other.col-1) {
            this.right      =toConnect;
            other.left      =toConnect;
            neighbours      =true;
        } else if   (this.row === other.row+1 && this.col === other.col) {
            this.top        =toConnect;
            other.bottom    =toConnect;
            neighbours      =true;
        } else if   (this.row === other.row-1 && this.col === other.col) {
            this.bottom     =toConnect;
            other.top       =toConnect;
            neighbours      =true;
        }
        if (neighbours) {
            if (toConnect) {
                if (this === this.parent.actual) {
                    other.color = this.color;
                    this.parent.actual = other;
                } else if (other === this.parent.actual) {
                    this.color = other.color;
                    this.parent.actual = this;
                }
            }
            if (!toConnect) {
                    if (this === this.parent.actual) {
                    this.color = 0;
                    this.parent.actual = other;
                } else if (other === this.parent.actual) {
                    other.color = 0;
                    this.parent.actual = this;
                }
            }
        }
        return neighbours;
    }

}