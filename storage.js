import { Board, Square } from "./board.js";
/**
 * @param  {Board} board
 * @param  {String} difficulty
 */
export function saveBoard(difficulty, board) {
    localStorage.setItem(difficulty, JSON.stringify(board.squares));
}
/**
 * @param  {String} difficulty
 * @returns {Square[][]}
 */
export function loadBoard(difficulty) {
    return JSON.parse(localStorage.getItem(difficulty));
}