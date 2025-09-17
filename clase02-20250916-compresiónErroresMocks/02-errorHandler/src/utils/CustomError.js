export class CustomError{
    static generateError(name, message, cause, code=400){
        let error=new Error(message, {cause})
        error.custom=true
        error.code=code
        error.name=name

        throw error
    }
}