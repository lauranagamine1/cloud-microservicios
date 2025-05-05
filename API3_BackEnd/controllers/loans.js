import loansModel from '../models/loans.js';
class loansController{
    constructor(){   
    }

    async create(req, res){
        try{
            const data = await loansModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }}
    
    async getAll(req, res){
        try{
            const data = await loansModel.getAll();
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }}

    async getOne(req, res){
        try{
            res.status(201).json({status: 'getOne-ok'});
        }catch(e){
            res.status(500).send(e);
        }}



}

export default new loansController();