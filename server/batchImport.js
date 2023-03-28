const {MongoClient} = require('mongodb');
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')


const batchImport = async () =>{

    const client = new MongoClient(MONGO_URI,option)

    const admin = {
        _id : uuidv4(),
        password : "PizzSteMad123!@#",
        name : "admin",
        lastName : "adminLastName",
        email : "admin@admin.com",
        phone : "5149999999",
        address : {
            street : "700 boul laurier",
            city : "ste-madeleine",
            zip : "J0H 3E8",
            province : "Quebec",
            country : "Canada",
        },
        favorite : [],
        recentlyViewed : [],
        orders : [],
        cart : [],
    }

    try{
        await client.connect()
        const db = client.db()
        const adminUser = await db.collection('users').insertOne(admin)
        client.close()
    }catch(error){
        console.error(error.message)
    }
}

batchImport()