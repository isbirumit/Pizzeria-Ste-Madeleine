const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getOrders = async (request,response) => {

}

const getOrder = async (request,response) => {
    
}

const addOrder = async (request,response) => {
    
}

const patchOrder = async (request,response) => {
    
}

const deleteOrder = async (request,response) => {
    
}

module.exports = {getOrders,getOrder,addOrder,patchOrder,deleteOrder}