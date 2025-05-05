import { MongoClient } from "mongodb";


class dbClient{
    constructor(){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB }/?retryWrites=true&w=majority&appName=Cluster0`;
        this.client = new MongoClient(queryString);
        this.conectarBD();
    }
    async conectarBD(){
        try{
            await this.client.connect();
            this.db = this.client.db('biblioteca');
            console.log("Conectado al servidor de la base de datos");
        }catch(e){
            console.log(e);
        }
    }
}

export default new dbClient();