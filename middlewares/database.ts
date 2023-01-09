import mongoose, { mongo } from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const connectToDB = (handler: NextApiHandler) =>

    async (req: NextApiRequest, res: NextApiResponse) => {



    console.log('Mongo está conectado?', mongoose.connections[0].readyState === 1 ? 'Sim' : 'Não');

    if(mongoose.connections[0].readyState === 1){

        return handler(req, res);

    }

    const {DB_CONNECTION_STRING} = process.env;
    if(!DB_CONNECTION_STRING){
        return res.status(500).json({error: 'Env DB_CONNECTION_STRING não informada.'});
    }

    mongoose.connection.on('connected', () => console.log('Conectado com sucesso'));

    mongoose.connection.on('errir', error => console.log('Ocorreu erro ao connectar com o banco:', error));

    await mongoose.connect(DB_CONNECTION_STRING)

    return handler(req, res);

}
