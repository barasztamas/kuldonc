import { delegate, Coordinates, tdLocation } from "./utils.js";
import { renderBoard } from "./render.js";
import { Board, Square } from "./board.js";
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
        if (event.button===0) {
            const tdCoordinates = tdLocation(this);
            const cell = board.getCell(tdCoordinates);
            board.removeLine(cell.castle);
            if (cell.castle && !cell.color) {
                board.actual = tdCoordinates;
                cell.color = cell.castle;
                renderMain();
            }
        } else if (event.button===2) {
            const tdCoordinates = tdLocation(this);
            const cell = board.getCell(tdCoordinates);
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
        const actualCell = board.getCell(board.actual);
        if (
            actualCell.color!==actualCell.castle || 
            !(actualCell.left||actualCell.right||actualCell.top||actualCell.bottom)
        ) {
            board.removeLine(actualCell.color);
        }
        board.actual = false;
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
            const toCoordinates = tdLocation(toTd);
            const toCell = board.getCell(toCoordinates);
            if (    
                    (
                        board.isConnected(toCoordinates, board.actual)
                        && board.connect(board.actual, toCoordinates, false)
                    ) || (
                        toCell.color===0
                        && toCoordinates.isNeighbour(board.actual)
                        && (toCell.castle===0 || toCell.castle===board.getCell(board.actual).color)
                        && board.connect(board.actual, toCoordinates, true) 
                    )
                )
            {
                renderMain();
            }
        }
    }
}
delegate(boardTable, "mouseover", "td", tdMouseOver);

function saveButtonClick() {
    if (difficulty) {
        const loadedSquares = loadBoard(difficulty);
        if (loadedSquares) {
            const loadedBoard=new Board(0);
            loadedBoard.squares=loadedSquares;
            renderBoard(board, actualPreview);
            renderBoard(loadedBoard, savedPreview);
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
    successText.hidden = show;
    boardTable.parentNode.hidden = show;
    if (!show) {
        renderBoard(null, actualPreview);
        renderBoard(null, savedPreview);
    }
}

function loadButtonClick() {
    if (difficulty) {
        const loadedSquares = loadBoard(difficulty);
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
    successText.innerHTML = !!board && !board.actual && board.isFull() ? "Adj' Isten egészségére!" : "";
}