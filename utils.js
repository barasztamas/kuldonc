export function delegate(parent, type, selector, fn) {

    function delegatedFunction(e) {
        const handlerElement = this;
        const sourceElement = e.target;
    
        const closestElement = sourceElement.closest(selector);
        if (handlerElement.contains(closestElement)) {
            const delegatedElement = closestElement;
            fn.call(delegatedElement, e)
        }
    }

    parent.addEventListener(type, delegatedFunction);
}

export class Coordinates{
    /**
     * @param  {Number} row
     * @param  {Number} col
     */
    constructor(row,col) {
        this.row=row;
        this.col=col;
    }
}

/**
 * @param  {HTMLTableDataCellElement} td
 * @returns {Coordinates} a
 */
export function tdLocation(td) {
    return new Coordinates (td.cellIndex, td.parentNode.rowIndex);
}