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
    const userEmail = request.params.userEmail
    const userPassword = request.params.password
    console.log(userEmail)
    console.log(userPassword)
    try {
        await client.connect()
        const db = client.db()
        const user = await db.collection('users').findOne({email : userEmail})
        if(user === null){
            throw new Error ('user not found')
        }else {
            if(user.password !== userPassword){
                throw new Error('Password incorrect')
            }
            
            return response.status(200).json({status:200, message : 'User found', data : user})
        }
    } catch (error) {
        return response.status(404).json({status : 404,error : error.message})
    }finally{
        client.close()
    }
}

const addUser = async (request,response) => {
    const client = new MongoClient(MONGO_URI,option)
    const userInfo = request.body
    let failed = false;
    const failureList = []
    try {
        await client.connect()
        const db = client.db()
        const users = await db.collection('users').findOne({email: userInfo.email})
        if(users !== null){
            failed = true;
            failureList.push('Email already taken.')
        }
        if(userInfo.password !== userInfo.confirmPassword){
            failed = true;
            failureList.push('Password must be identical.')
        }
        if(userInfo.password.length < 8){
            failed = true;
            failureList.push('Password must be at least 8 char long.')
        }
        
        if(failed){
            throw new Error()
        }else {
            const user = {
                _id : uuidv4(),
                email : userInfo.email,
                firstName : userInfo.firstName,
                lastName : userInfo.lastName,
                password : userInfo.password,
                userType : 1,
                phone : userInfo.phone,
                address : {
                    street : userInfo.address,
                    city : userInfo.city,
                    zip : userInfo.zip,
                    province : userInfo.province,
                    country : userInfo.country
                },
                favorite : [],
                recentlyViewed : [],
                orders : [],
                cart : [],
            }
            const result = await db.collection('users').insertOne(user)
            console.log(result)
            if(result.insertedId !== undefined){
                return response.status(200).json({status:200,message : "Successfully created!",data : user})
            }else {
                return response.status(404).json({status:404,message : "Something went wrong creating the account, please retry again."})
            }
        }
    } catch (error) {
        return response.status(404).json({status:404, error : failureList})
    }finally{
        client.close()
    }
}

module.exports = {getUser,getUsers,addUser}