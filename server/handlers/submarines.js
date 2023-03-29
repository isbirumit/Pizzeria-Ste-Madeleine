const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getSubmarines= async (request,response) => {

}

const getSubmarine = async (request,response) => {
    
}

const addSubmarine = async (request,response) => {
    
}

const patchSubmarine = async (request,response) => {
    
}

const deleteSubmarine = async (request,response) => {
    
}

module.exports = {getSubmarines,getSubmarine,addSubmarine,patchSubmarine,deleteSubmarine}