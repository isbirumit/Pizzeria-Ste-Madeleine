const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getPlaters= async (request,response) => {

}

const getPlater = async (request,response) => {
    
}

const addPlater = async (request,response) => {
    
}

const patchPlater = async (request,response) => {
    
}

const deletePlater = async (request,response) => {
    
}

module.exports = {getPlaters,getPlater,addPlater,patchPlater,deletePlater}