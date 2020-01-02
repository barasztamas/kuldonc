import { Coordinates } from "./utils.js";

export const size = {
    easy : 5,
    medium : 9,
    hard : 9
}

export const castles = {
    /** @type {Coordinates[][]} */
    easy : [
        [new Coordinates(1,1), new Coordinates(4,0)],
        [new Coordinates(2,2), new Coordinates(0,3)],
        [new Coordinates(3,0), new Coordinates(3,3)]
    ],
    /** @type {Coordinates[][]} */
    medium : [
        [new Coordinates(1,0), new Coordinates(8,1)],
        [new Coordinates(0,0), new Coordinates(2,1)],
        [new Coordinates(6,7), new Coordinates(8,8)],
        [new Coordinates(5,3), new Coordinates(7,3)],
        [new Coordinates(0,7), new Coordinates(1,8)],
        [new Coordinates(2,4), new Coordinates(6,8)],
        [new Coordinates(2,6), new Coordinates(4,3)],
        [new Coordinates(1,3), new Coordinates(7,4)],
        [new Coordinates(0,3), new Coordinates(7,1)],
        [new Coordinates(3,7), new Coordinates(8,7)],
        [new Coordinates(1,5), new Coordinates(3,5)]
    ],
    /** @type {Coordinates[][]} */
    hard : [
        [new Coordinates(0,0), new Coordinates(3,6)],
        [new Coordinates(0,8), new Coordinates(4,8)],
        [new Coordinates(0,4), new Coordinates(7,6)],
        [new Coordinates(2,1), new Coordinates(5,2)],
        [new Coordinates(0,6), new Coordinates(1,7)],
        [new Coordinates(2,3), new Coordinates(8,3)],
        [new Coordinates(2,0), new Coordinates(7,1)],
        [new Coordinates(1,6), new Coordinates(8,8)]
    ]

} 