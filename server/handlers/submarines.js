const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getSubmarines= async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const submarines = await db.collection('submarines').find().toArray()
        if(submarines.length > 0){
            return response.status(200).json({status:200,message : "submarines retrieved from database", data : submarines})
        }else {
            throw new Error("Something went wrong trying to retrieve submarines from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getSubmarine = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const submarine = await db.collection('submarines').findOne({_id : request.params.submarineId})
        if(submarine !== null) {
            return response.status(200).json({status : 200, message : "submarine retrieved from data" , data : submarine})
        }else {
            throw new Error("Something went wrong trying to retrieve the submarine from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addSubmarine = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchSubmarine = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deleteSubmarine = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

module.exports = {getSubmarines,getSubmarine,addSubmarine,patchSubmarine,deleteSubmarine}