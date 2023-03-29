const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getPizzas= async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const pizzas = await db.collection('pizzas').find().toArray()
        if(pizzas.length > 0){
            return response.status(200).json({status:200,message : "pizzas retrieved from database", data : pizzas})
        }else {
            throw new Error("Something went wrong trying to retrieve pizzas from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getPizza = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    console.log(request.params.pizzaId)
    try {
        await client.connect()
        const db = client.db()
        const pizza = await db.collection('pizzas').findOne({_id : request.params.pizzaId})
        if(pizza !== null) {
            return response.status(200).json({status : 200, message : "pizza retrieved from data" , data : pizza})
        }else {
            throw new Error("Something went wrong trying to retrieve the pizza from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addPizza = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const patchPizza = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

const deletePizza = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    
    try {
        
    } catch (error) {
        
    }finally{
        client.close()
    }
}

module.exports = {getPizzas,getPizza,addPizza,patchPizza,deletePizza}