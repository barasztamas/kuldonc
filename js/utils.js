/**
 * @param  {Element} parent
 * @param  {String} type
 * @param  {String} selector
 * @param  {Function} fn
 */
export function delegate(parent, type, selector, fn) {

    function delegatedFunction(e) {
        const handlerElement = this;
        const sourceElement = e.target;
    
        const closestElement = sourceElement.closest(selector);
        if (handlerElement.contains(closestElement)) {
            const delegatedElement = closestElement;
            fn.call(delegatedElement, e);
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
    
    /**
     * @param  {Coordinates} other
     */
    equals(other){
        return this.row===other.row && this.col===other.col;
    }
    /**
     * @param  {Coordinates} other
     */
    isNeighbour(other){
        return (Math.abs(this.row-other.row)+Math.abs(this.col-other.col))===1;
    }

}
/**
 * @param {Date} date
 */
export function dateToString(date){
    return date.getFullYear() +"-"+ (date.getMonth()+1).toString().padStart(2,"0") +"-"+ date.getDate().toString().padStart(2,"0") +" "+ date.toLocaleTimeString("hu");
}