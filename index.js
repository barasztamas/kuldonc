import { delegate } from "./utils.js";
import { renderBoard } from "./render.js";
import { Board } from "./board.js";
import { Square } from "./square.js";
import * as settings from "./settings.js";
import { saveBoard, loadBoard } from "./storage.js";

export const boardTable = document.querySelector("table#board");
export let board = new Board(0);

const difficultyButtons =document.querySelector("#difficulty");
const storageDiv = document.querySelector("#storage")
const saveButton = document.querySelector("#save");
const loadButton = document.querySelector("#load");
const checkSave = document.querySelector("#checkSave");
const actualPreview = document.querySelector("#actualPreview");
const savedPreview = document.querySelector("#savedPreview");
const successText = document.querySelector("#success");
let difficulty = "";

/**
 * @param  {HTMLButtonElement} button
 */
function difficultyButtonClick() {
    difficulty = this.id;
    board = new Board(settings.size[difficulty], settings.castles[difficulty]);
    renderMain();
    showCheckSave(false);
    loadButton.disabled = !loadBoard(difficulty);
}
delegate(difficultyButtons, "click", "button", difficultyButtonClick);

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
            board.actual !== board.getSquare(event.target.closest("#board td")) || //mouse not over actual cell or no actual cell
            actualCell.color !== actualCell.castle || //actual cell not a castle
            !(actualCell.left||actualCell.right||actualCell.top||actualCell.bottom) //actual cell has no connections (is starting castle)
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

function saveButtonClick() {
    if (difficulty) {
        const savedSquares = loadBoard(difficulty);
        if (savedSquares) {
            const savedBoard=new Board(0);
            savedBoard.squares=savedSquares;
            renderBoard(board, actualPreview);
            renderBoard(savedBoard, savedPreview);
            showCheckSave();
        } else {
            saveBoard(difficulty, board);
            loadButton.disabled = false;
        }
    }
}
saveButton.addEventListener("click", saveButtonClick);

function showCheckSave(show=true) {
    checkSave.hidden = !show;
    boardTable.hidden = show;
    storageDiv.hidden = show;
    boardTable.parentNode.hidden = show;
    if (!show) {
        renderBoard(null, actualPreview);
        renderBoard(null, savedPreview);
    }
}

function loadButtonClick() {
    if (difficulty) {
        const loadedSquares = loadBoard(difficulty, board);
        if (loadedSquares) {
            board.squares = loadedSquares;
            renderMain();
        }
    }
}
loadButton.addEventListener("click", loadButtonClick);

function checkSaveButtonClick() {
    showCheckSave(false);
    if (this.id==="overwrite") {
        saveBoard(difficulty, board);
        loadButton.disabled = false;
    }
}
delegate(checkSave, "click", "button", checkSaveButtonClick);

function renderMain() {
    renderBoard(board, boardTable);
    successText.hidden = !board || !!board.actual || !board.isFull();
}