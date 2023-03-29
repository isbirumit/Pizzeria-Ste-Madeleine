const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const { v4: uuidv4 } = require('uuid')

const getPoutines = async (request,response) => {

}

const getPoutine = async (request,response) => {
    
}

const addPoutine= async (request,response) => {
    
}

const patchPoutine = async (request,response) => {
    
}

const deletePoutine = async (request,response) => {
    
}

module.exports = {getPoutines,getPoutine,addPoutine,patchPoutine,deletePoutine}