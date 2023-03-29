const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getPlatters= async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const platters = await db.collection('platters').find().toArray()
        if(platters.length > 0){
            return response.status(200).json({status:200,message : "platters retrieved from database", data : platters})
        }else {
            throw new Error("Something went wrong trying to retrieve platters from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getPlatter = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const platter = await db.collection('platters').findOne({_id : request.params.platterId})
        if(platter !== null) {
            return response.status(200).json({status : 200, message : "platter retrieved from data" , data : platter})
        }else {
            throw new Error("Something went wrong trying to retrieve the platter from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addPlatter = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchPlatter = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deletePlatter = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

module.exports = {getPlatters,getPlatter,addPlatter,patchPlatter,deletePlatter}