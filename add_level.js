import { delegate } from "./js/utils.js";
import { renderBoard } from "./js/render.js";
import { Board } from "./js/board.js";
import { Square } from "./js/square.js";
import { parseBoard, stringifySquares } from "./js/storage.js";

const boardTable = document.querySelector("table#board");
const rowsInput = document.querySelector("input#rows");
const colsInput = document.querySelector("input#cols");
const squaresInput = document.querySelector("#squares");
const coordinatesInput = document.querySelector("#coordinates");
const saveButton = document.querySelector("button#save");

let board = new Board(0,0);
/** @type {Coordinates[][]} */
let castleCoordinates = [];
let maxColor = 0;

if (squaresData && coordinatesData) {
    const squares = parseBoard(squaresData, board);
    rowsInput.value = squares.length;
    colsInput.value = squares[0].length;
    board.squares = squares;
    castleCoordinates = JSON.parse(coordinatesData);
    maxColor = castleCoordinates.reduce((acc, curr) => Math.max(acc, curr[0].color), 0);
    renderMain();
}

function rowColChange() {
    board = new Board(parseInt(rowsInput.value), parseInt(colsInput.value));
    renderMain();
}
rowsInput.addEventListener("change", rowColChange);
colsInput.addEventListener("change", rowColChange);

/**
 * @param  {Event} event
 */
function tdMouseDown(event) {
    if (!board.actual) {
        /** @type {Square} */
        const cell = board.getSquare(this);
        if (event.button===0) {
            if (!cell.color) {
                board.actual = cell;
                cell.color = ++maxColor;
                renderMain();
            }
        } else if (event.button===2) {
            castleCoordinates = castleCoordinates.filter((elem) => elem[0].color!==cell.color);
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
            (actualCell === board._actualStart) //actual cell is starting cell
        ) {
            board.removeLine(actualCell.color);
            --maxColor;
        } else {
            castleCoordinates.push([board._actualStart, actualCell]);
        }
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
    squaresInput.value = stringifySquares(board.squares);
    coordinatesInput.value = JSON.stringify(castleCoordinates, ["row","col","color"]);
    renderBoard(board, boardTable);
    saveButton.disabled = !board || !!board.actual || !board.isFull();
}
