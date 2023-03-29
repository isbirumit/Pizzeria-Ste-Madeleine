const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getPizzas= async (request,response) => {

}

const getPizza = async (request,response) => {
    
}

const addPizza = async (request,response) => {
    
}

const patchPizza = async (request,response) => {
    
}

const deletePizza = async (request,response) => {
    
}

module.exports = {getPizzas,getPizza,addPizza,patchPizza,deletePizza}