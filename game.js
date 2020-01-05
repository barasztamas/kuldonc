import { delegate } from "./js/utils.js";
import { renderBoard } from "./js/render.js";
import { Board } from "./js/board.js";
import { Square } from "./js/square.js";
import { parseBoard } from "./js/storage.js";

const boardTable = document.querySelector("table#board");
const successText = document.querySelector("#success");

const levelSettings = JSON.parse(levelData);
const board = new Board(levelSettings.rows, levelSettings.cols, levelSettings.coordinates);
renderMain();

/**
 * @param  {Event} event
 */
function tdMouseDown(event) {
    if (!board.actual) {
        /** @type {Square} */
        const cell = board.getSquare(this);
        if (event.button===0) {
            if (cell.castle) {
                board.removeLine(cell.castle);
                board.actual = cell;
                cell.color = cell.castle;
                renderMain();
            }
        } else if (event.button===2) {
            board.removeLine(cell.color);
            renderMain();
        }
    }
}
delegate(boardTable, "mousedown", "td", tdMouseDown);
boardTable.addEventListener("contextmenu", event => {event.preventDefault()});

/**
 * @param  {Event} event
 */
function windowMouseUp(event) {
    if (board.actual && event.button===0) {
        /** @type {Square} */
        const actualCell = board.actual;
        if (
            !event.target.closest || //mouse outside window
            !event.target.closest("#board td") || //mouse outside board
            board.actual !== board.getSquare(event.target.closest("#board td")) || //mouse not over actual cell
            actualCell.color !== actualCell.castle || //actual cell not a castle
            actualCell === board._actualStart //actual cell is starting castle
        ) {
            board.removeLine(actualCell.color);
        } //in every case
        board.actual = null;
        renderMain();
    }
}
window.addEventListener("mouseup", windowMouseUp);

/**
 * @param  {Event} event
 */
function tdMouseOver(event) {
    if (board.actual) {
        const toTd = event.target.closest("#board td");
        if (toTd) {
            const toCell = board.getSquare(toTd);
            if (
                toCell &&
                (
                    (
                        board.actual.isConnected(toCell)
                        && board.actual.connect(toCell, false)
                    ) || (
                        toCell.color===0
                        && board.actual.isNeighbour(toCell)
                        && (toCell.castle===0 || toCell.castle===board.actual.color)
                        && board.actual.connect(toCell, true)
                    )
                )
            ) {
                renderMain();
            }
        }
    }
}
delegate(boardTable, "mouseover", "td", tdMouseOver);

function renderMain() {
    renderBoard(board, boardTable);
    if (board && board.actual && board.isFull()) {
        successText.hidden = true;
        fetch("api/level_solved.php?level_name=" + levelSettings.level_name);
    } else {
        successText.hidden = false;
    }
    successText.hidden = !board || !!board.actual || !board.isFull();
}
