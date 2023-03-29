const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const { v4: uuidv4 } = require('uuid')

const getSalads = async (request,response) => {

}

const getSalad = async (request,response) => {
    
}

const addSalad = async (request,response) => {
    
}

const patchSalad = async (request,response) => {
    
}

const deleteSalad = async (request,response) => {
    
}

module.exports = {getSalads,getSalad,addSalad,patchSalad,deleteSalad}