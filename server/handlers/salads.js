const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const { v4: uuidv4 } = require('uuid')

const getSalads = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const salads = await db.collection('salads').find().toArray()
        if(salads.length > 0){
            return response.status(200).json({status:200,message : "salads retrieved from database", data : salads})
        }else {
            throw new Error("Something went wrong trying to retrieve salads from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getSalad = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const salad = await db.collection('salads').findOne({_id : request.params.saladId})
        if(salad !== null) {
            return response.status(200).json({status : 200, message : "salad retrieved from data" , data : salad})
        }else {
            throw new Error("Something went wrong trying to retrieve the salad from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addSalad = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchSalad = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deleteSalad = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

module.exports = {getSalads,getSalad,addSalad,patchSalad,deleteSalad}