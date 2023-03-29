const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getCombos= async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const combos = await db.collection('combos').find().toArray()
        if(combos.length > 0){
            return response.status(200).json({status:200,message : "Combos retrieved from database", data : combos})
        }else {
            throw new Error("Something went wrong trying to retrieve combos from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getCombo = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const combo = await db.collection('combos').findOne({_id : request.params.comboId})
        if(combo !== null) {
            return response.status(200).json({status : 200, message : "Combo retrieved from data" , data : combo})
        }else {
            throw new Error("Something went wrong trying to retrieve the combo from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addCombo = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchCombo = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deleteCombo = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

module.exports = {getCombos,getCombo,addCombo,patchCombo,deleteCombo}