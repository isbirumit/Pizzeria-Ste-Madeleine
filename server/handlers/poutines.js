const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const { v4: uuidv4 } = require('uuid')

const getPoutines = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const poutines = await db.collection('poutines').find().toArray()
        if(poutines.length > 0){
            return response.status(200).json({status:200,message : "poutines retrieved from database", data : poutines})
        }else {
            throw new Error("Something went wrong trying to retrieve poutines from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getPoutine = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const poutine = await db.collection('poutines').findOne({_id : request.params.poutineId})
        if(poutine !== null) {
            return response.status(200).json({status : 200, message : "poutine retrieved from data" , data : poutine})
        }else {
            throw new Error("Something went wrong trying to retrieve the poutine from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addPoutine= async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchPoutine = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deletePoutine = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

module.exports = {getPoutines,getPoutine,addPoutine,patchPoutine,deletePoutine}