const {MongoClient} = require('mongodb')
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


const { v4: uuidv4 } = require('uuid')


const getUsers = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    try {
        await client.connect()
        const db = client.db()
        const users = await db.collection('users').find().toArray()
        if(users.length > 0){
            return response.status(200).json({status:200, message : "Users retrieved from database" , data : users})
        }else {
            throw new Error("Something went wrong trying to retrieve users from database")
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const getUser = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    const userId = request.params.userId
    try {
        await client.connect()
        const db = client.db()
        const user = await db.collection('users').findOne({_id : userId})
        if(user === null){
            throw new Error ('user not found')
        }else {
            return response.status(200).json({status:200, message : 'User found', data : user})
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addUser = async (request,response) => {

}

module.exports = {getUser,getUsers,addUser}