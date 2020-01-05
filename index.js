import { delegate } from "./js/utils.js";

const levelsTable = document.querySelector("table#levels");

/**
 * @this  {HTMLTableDataCellElement}
 */
async function deleteClick(event) {
    const levelName=this.dataset.levelName;
    const tr = this.closest("tr");

    //const response = await fetch("api/delete_level.php", {method: 'POST', body: "level_name=" + levelName});
    const response = await fetch("api/delete_level.php?level_name=" + levelName);
    if (response.ok) {
        tr.parentNode.removeChild(tr);
    }
    
}
delegate(levelsTable, "click", "td.delete_level",deleteClick);
