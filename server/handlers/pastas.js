const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const { v4: uuidv4 } = require('uuid')

const getPastas = async (request,response) => {

}

const getPasta = async (request,response) => {
    
}

const addPasta= async (request,response) => {
    
}

const patchPasta = async (request,response) => {
    
}

const deletePasta = async (request,response) => {
    
}

module.exports = {getPastas,getPasta,addPasta,patchPasta,deletePasta}