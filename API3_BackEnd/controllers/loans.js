import loansModel from '../models/loans.js';
class loansController{
    constructor(){   
    }

    async create(req, res){
        try {
            const savedLoan = await loansModel.create(req.body); // 
            res.status(201).json(savedLoan);
        } catch (e) {
            console.error("ERROR EN POST /loans:", e);
            res.status(400).json({ error: e.message });
        }
    }
    
    
    async getAll(req, res){
        try {
            const data = await loansModel.getAll();
            res.status(200).json(data);
        } catch(e) {
            console.error("ERROR EN GET /loans:", e); // Agrega esto
            res.status(500).json({ error: "Error interno del servidor" }); // respuesta amigable
        }
    }
    

    async getOne(req, res){
        try{
            res.status(201).json({status: 'getOne-ok'});
        }catch(e){
            res.status(500).send(e);
        }}



}

export default new loansController();