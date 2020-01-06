import { Board } from "./board.js";
import { Square } from "./square.js";

/**
 * @param  {Square[][]} squares
 */
export function stringifySquares(squares) {
    return JSON.stringify(squares, (key, value) => key==="parent" ? null : value);
}

/**
 * @param  {String} json
 * @param  {Board} board
 * @returns {Square[][]}
 */
export function parseBoard(json, board = null) {
    if (board) {
        return JSON.parse(
            json, 
            (key, value) => 
                value instanceof Object && !Array.isArray(value) && "row" in value && "col" in value && "parent" in value ?
                    new Square(value.row, value.col, board, value.castle, value.color, value.left, value.right, value.top, value.bottom) :
                    value
        );
    } else {
        return JSON.parse(json);
    }
}
