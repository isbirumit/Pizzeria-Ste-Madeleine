const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getCombos= async (request,response) => {

}

const getCombo = async (request,response) => {
    
}

const addCombo = async (request,response) => {
    
}

const patchCombo = async (request,response) => {
    
}

const deleteCombo = async (request,response) => {
    
}

module.exports = {getCombos,getCombo,addCombo,patchCombo,deleteCombo}