import { delegate, Coordinates, tdLocation } from "./utils.js";
import { render } from "./render.js";
import { Board, Square } from "./board.js";
import * as settings from "./settings.js";
import { saveBoard, loadBoard } from "./storage.js";

export const boardTable = document.querySelector("table#board");
export let mainBoard = new Board(0);

const difficultyButtons =document.querySelector("#difficulty");
const saveButton = document.querySelector("#save");
const loadButton = document.querySelector("#load");
const checkSave = document.querySelector("#checkSave");
let difficulty = "";

/**
 * @param  {HTMLButtonElement} button
 */
function difficultyButtonClick() {
    difficulty = this.id;
    mainBoard = new Board(settings.size[this.id], settings.castles[this.id]);
    render();
}
delegate(difficultyButtons, "click", "button", difficultyButtonClick);

/**
 * @param  {Event} event
 */
function tdMouseDown(event) {
    if (!mainBoard.actual) {
        if (event.button===0) {
            const tdCoordinates = tdLocation(this);
            const cell = mainBoard.getCell(tdCoordinates);
            mainBoard.removeLine(cell.castle);
            if (cell.castle) {
                mainBoard.actual = tdCoordinates;
                cell.color = cell.castle;
                render();
            }
        } else if (event.button===2) {
            const tdCoordinates = tdLocation(this);
            const cell = mainBoard.getCell(tdCoordinates);
            mainBoard.removeLine(cell.color);
            render();
        }
    }
}
delegate(boardTable, "mousedown", "td", tdMouseDown);
boardTable.addEventListener("contextmenu", event => {event.preventDefault()});

/**
 * @param  {Event} event
 */
function windowMouseUp(event) {
    if (mainBoard.actual && event.button===0) {
        const actualCell = mainBoard.getCell(mainBoard.actual);
        if (
            actualCell.color!==actualCell.castle || 
            !(actualCell.left||actualCell.right||actualCell.top||actualCell.bottom)
        ) {
            mainBoard.removeLine(actualCell.color);
        }
        mainBoard.actual = false;
        render();
    }
}
window.addEventListener("mouseup", windowMouseUp);

/**
 * @param  {Event} event
 */
function tdMouseOut(event) {
    if (mainBoard.actual) {
        const fromTd = event.target.closest("#board td");
        if (fromTd) {
            const fromTdCoordinates = tdLocation(fromTd);
            if (fromTdCoordinates.row===mainBoard.actual.row && fromTdCoordinates.col===mainBoard.actual.col) {
                const toTd = event.relatedTarget.closest("#board td");
                if (toTd) {
                    const toTdCoordinates = tdLocation(toTd);
                    const toCell = mainBoard.getCell(toTdCoordinates);
                    if (
                        !mainBoard.disconnect(fromTdCoordinates, toTdCoordinates) 
                        && toCell.color===0
                        && (toCell.castle===0 || toCell.castle===mainBoard.getCell(fromTdCoordinates).color)
                    ) {
                        mainBoard.connect(fromTdCoordinates, toTdCoordinates);
                    }
                    render();
                }
            }
        }
    }
}
delegate(boardTable, "mouseout", "td", tdMouseOut);

function saveButtonClick() {
    if (difficulty) {
        const loadedBoard = loadBoard(difficulty);
        if (loadedBoard) {
            showCheckSave();
        } else {
            saveBoard(difficulty, mainBoard);
        }
    }
}
saveButton.addEventListener("click", saveButtonClick);

function showCheckSave(show=true) {
    checkSave.hidden = !show;
    difficultyButtons.hidden = show;
    boardTable.hidden = show;
}

function loadButtonClick() {
    if (difficulty) {
        const loadedBoard = loadBoard(difficulty);
        if (loadedBoard) {
            mainBoard.squares = loadedBoard;
            render();
        }
    }
}
loadButton.addEventListener("click", loadButtonClick);

function checkSaveButtonClick() {
    console.log(this.id);
    showCheckSave(false);
    if (this.id==="overwrite") {
        saveBoard(difficulty, mainBoard);
    }
}
delegate(checkSave, "click", "button", checkSaveButtonClick);

