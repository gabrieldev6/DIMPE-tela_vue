export class Mwp {
    cx: number
    cy: number
    homeX: number
    homeY: number
    zoom: number

    constructor(cx: number, cy: number, homeX: number, homeY: number, zoom: number) {
        this.cx = cx
        this.cy = cy
        this.homeX = homeX
        this.homeY = homeY
        this.zoom = zoom
    }
}