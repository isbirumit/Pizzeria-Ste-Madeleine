const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getOrders = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const getOrder = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const addOrder = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchOrder = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deleteOrder = async (request,response) => {
    
}

module.exports = {getOrders,getOrder,addOrder,patchOrder,deleteOrder}