const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getSnacks= async (request,response) => {

}

const getSnack = async (request,response) => {
    
}

const addSnack = async (request,response) => {
    
}

const patchSnack = async (request,response) => {
    
}

const deleteSnack = async (request,response) => {
    
}

module.exports = {getSnacks,getSnack,addSnack,patchSnack,deleteSnack}