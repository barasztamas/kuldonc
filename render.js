import { Square,Board } from "./board.js";

/**
 * @param {Square} square
 * @returns {String}
 */
function renderSquare(square) {
    return `<td class="
        ${square.color  ? `c${square.color} ${square.actual ? "actual" : "line"}` : ""}
        ${square.left   ? "left"            : ""}
        ${square.right  ? "right"           : ""}
        ${square.top    ? "top"             : ""}
        ${square.bottom ? "bottom"          : ""}
    ">${square.castle   ? square.castle     : ""}</td>`;
}
/**
 * @param  {Board} board
 * @returns {String}
 */
export function renderBoard(board) {
    return board.squares.map(row => {
        return "<tr>" + row.map(renderSquare).join("") + "</tr>";
    }).join("\n");
}