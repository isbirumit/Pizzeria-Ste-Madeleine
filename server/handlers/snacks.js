const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getSnacks= async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const snacks = await db.collection('snacks').find().toArray()
        if(snacks.length > 0){
            return response.status(200).json({status:200,message : "snacks retrieved from database", data : snacks})
        }else {
            throw new Error("Something went wrong trying to retrieve snacks from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getSnack = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const snack = await db.collection('snacks').findOne({_id : request.params.snackId})
        if(snack !== null) {
            return response.status(200).json({status : 200, message : "snack retrieved from data" , data : snack})
        }else {
            throw new Error("Something went wrong trying to retrieve the snack from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addSnack = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchSnack = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deleteSnack = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

module.exports = {getSnacks,getSnack,addSnack,patchSnack,deleteSnack}