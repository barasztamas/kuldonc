import { Board } from "./board.js";
import { Square } from "./square.js";
/**
 * @param  {Board} board
 * @param  {String} difficulty
 */
export function saveBoard(difficulty, board) {
    localStorage.setItem(difficulty, JSON.stringify(board.squares, (key, value) => key==="parent" ? null : value));
}
/**
 * @param  {String} difficulty
 * @param  {Board} board
 * @returns {Square[][]}
 */
export function loadBoard(difficulty, board = null) {
    if (board) {
        return JSON.parse(
            localStorage.getItem(difficulty), 
            (key, value) => 
                value instanceof Object && !Array.isArray(value) && "row" in value && "col" in value && "parent" in value ?
                    new Square(value.row, value.col, board, value.castle, value.color, value.left, value.right, value.top, value.bottom) :
                    value
        );
    } else {
        return JSON.parse(localStorage.getItem(difficulty));
    }
}