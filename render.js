import { Square,Board } from "./board.js";

/**
 * @param {Square} square
 * @returns {String}
 */
function renderSquare(square) {
    return `<td class="
        ${square.color  ? `c${square.color} line`   : ""}
        ${square.actual ? "actual"                  : ""}
        ${square.left   ? "left"                    : ""}
        ${square.right  ? "right"                   : ""}
        ${square.top    ? "top"                     : ""}
        ${square.bottom ? "bottom"                  : ""}
        ${square.castle ? "castle"                  : ""}
    ">  ${square.castle ? square.castle             : ""}</td>`;
}
/**
 * @param {Board} board
 * @param {HTMLTableElement} table
 */
export function renderBoard(board, table) {
    if (board) {
        table.innerHTML = board.squares.map(row => {
            return "<tr>" + row.map(renderSquare).join("\n") + "</tr>";
        }).join("\n");
    } else {
        table.innerHTML = "";
    }
}
