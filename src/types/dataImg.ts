export class DataImg  {
    id_frame: number
    caminho: string
    nome: string
    indice_lista: number
    altura: number
    largura: number
    constructor(id_frame: number, caminho: string, nome: string, indice_lista: number, altura: number, largura: number) {
        this.id_frame = id_frame
        this.caminho = caminho
        this.nome = nome
        this.indice_lista = indice_lista
        this.altura = altura
        this.largura = largura
    }
}