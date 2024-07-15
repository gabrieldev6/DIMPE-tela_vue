export class BoundingBox {
    id: number
    x: number
    y: number
    heigth: number
    width: number
    classe: string
    acertividade: number

    constructor(id: number, x:number, y:number, heigth:number, width:number, classe:string, acertividade:number) {
        this.id = id
        this.x = x
        this.y = y
        this.heigth = heigth
        this.width = width
        this.classe = classe
        this.acertividade = acertividade
    }

}