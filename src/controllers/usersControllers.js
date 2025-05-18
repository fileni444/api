const users = require('../models/Users')

class UsersControllers{
    async listAll(req,res){
        let result = await users.findAll()
        !result.validated
        ?res.status(404).json({sucess:false, message: result.error})
        :res.status(200).json({sucess:true, values: result.values})
    }

    async listOne(req,res){
        
        if(isNaN(req.params.id)){
            res.status(400).json({sucess: false, message: "ID Inválido!"})
        }else{
            let result = await users.findById(req.params.id)
            if(!result.validated){
                res.status(404).json({sucess:false, message: result.error})
            }else{
                result.values == undefined
                ?res.status(406).json({sucess: false, message: "Usuário não Encontrado!"})
                :res.status(200).json({sucess:true, values: result.values})
            }
        
        }

        

    }
}

module.exports = new UsersControllers()