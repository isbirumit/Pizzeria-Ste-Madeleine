const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const getFastFoodExtras= async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const extras = await db.collection('extras_fastfood').find().toArray()
        if(extras.length > 0){
            return response.status(200).json({status:200,message : "Fast Food extras retrieved from database", data : extras})
        }else {
            throw new Error("Something went wrong trying to retrieve extras from database")
        } 
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}


module.exports = {getFastFoodExtras}