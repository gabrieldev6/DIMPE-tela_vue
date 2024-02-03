export default class User {
    private readonly _token: string
    readonly _id: number
    readonly _nome: string
    readonly _email: string
    
    constructor(token: string, id: number, nome: string, email: string) {
        this._token = token
        this._id = id
        this._nome = nome
        this._email = email
    }

    
    public get token() : string {
        return this._token
    }
    public get id() : string {
        return this._token
    }
    public get nome() : string {
        return this._token
    }
    public get email() : string {
        return this._token
    }
    
}