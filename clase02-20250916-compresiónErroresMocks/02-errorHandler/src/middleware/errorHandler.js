export const errorHandler=(error, req, res, next)=>{


    if(error.custom){
        console.log(error.message, error.cause)
        res.setHeader('Content-Type','application/json');
        return res.status(error.code).json({error:`${error.name}:${error.message}`})
    }else{
        console.log(error.message)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

}