const {MongoClient} = require('mongodb');
require('dotenv').config()
const {MONGO_URI} = process.env
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const { v4: uuidv4 } = require('uuid')

const combos = require('../data/combo.json')
const pizzas = require('../data/pizza.json')
const assietes = require('../data/assietes.json')
const pates = require('../data/pates.json')
const sousmarin = require(`../data/sousmarin.json`)
const salades = require(`../data/salades.json`)
const poutines = require(`../data/poutines.json`)
const cassecroute = require('../data/cassecroute.json')
// const extras = require('../data/extras.json') // WIP

const batchImport = async () =>{

    const client = new MongoClient(MONGO_URI,option)

    const admin = {
        _id : uuidv4(),
        password : "PizzSteMad123!@#",
        firstName : "admin",
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
        userType : 3,
        favorite : [],
        recentlyViewed : [],
        orders : [],
        cart : [],
    }

    try{
        await client.connect()
        const db = client.db()
        const adminUser = await db.collection('users').insertOne(admin)
        await db.collection('combos').insertMany(combos)
        await db.collection('pizzas').insertMany(pizzas)
        await db.collection('platters').insertMany(assietes)
        await db.collection('pastas').insertMany(pates)
        await db.collection('salads').insertMany(salades)
        await db.collection('poutines').insertMany(poutines)
        await db.collection('snacks').insertMany(cassecroute)
        await db.collection('submarines').insertMany(sousmarin)
        client.close()
    }catch(error){
        console.error(error.message)
    }
}

batchImport()