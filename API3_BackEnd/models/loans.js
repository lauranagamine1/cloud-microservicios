
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
}

export default new loansModel();