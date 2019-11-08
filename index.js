import { delegate, Coordinates, tdLocation } from "./utils.js";
import { renderBoard } from "./render.js";
import { Board } from "./board.js";
import * as settings from "./settings.js";

const boardTable = document.querySelector("table#board");

board.innerHTML = renderBoard(new Board(settings.size.easy, settings.castles.easy));
