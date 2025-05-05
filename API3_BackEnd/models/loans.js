
import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";

class loansModel{

    async create(prestamo){
        const colLoans = dbClient.db.collection('loan');
        return await colLoans.insertOne(prestamo);
    }
    async getAll(prestamo){
        const colLoans = dbClient.db.collection('loan');
        return await colLoans.find({}).toArray();
    }
    async getOne(id){
        const colLoans = dbClient.db.collection('loan');
        return await colLoans.findOne({_id: new ObjectId(id)});
    }
}

export default new loansModel();