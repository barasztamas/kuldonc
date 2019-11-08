import { delegate, Coordinates, tdLocation } from "./utils.js";
import { render } from "./render.js";
import { Board } from "./board.js";
import * as settings from "./settings.js";

export const boardTable = document.querySelector("table#board");
export let mainBoard = new Board(0);

const difficultyButtons =document.querySelector("#difficulty");

/**
 * @param  {HTMLButtonElement} button
 */
function difficultyButtonClick() {
    mainBoard = new Board(settings.size[this.id], settings.castles[this.id]);
    render();
}
delegate(difficultyButtons, "click", "button", difficultyButtonClick);