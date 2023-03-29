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
    const newCombos = combos.map(e => {
        return {...e, _id : uuidv4()}
    })
    const newPizzas = pizzas.map(e => {
        return {...e, _id : uuidv4()}
    })
    const newPlaters = assietes.map(e => {
        return {...e, _id : uuidv4()}
    })
    const newPates = pates.map(e => {
        return {...e, _id : uuidv4()}
    })
    const newSousMarin = sousmarin.map(e => {
        return {...e, _id : uuidv4()}
    })
    const newSalades = salades.map(e => {
        return {...e, _id : uuidv4()}
    })
    const newPoutines = poutines.map(e => {
        return {...e, _id : uuidv4()}
    })
    const newCasseCroute = cassecroute.map(e => {
        return {...e, _id : uuidv4()}
    })


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
        await db.collection('combos').insertMany(newCombos)
        await db.collection('pizzas').insertMany(newPizzas)
        await db.collection('platters').insertMany(newPlaters)
        await db.collection('pastas').insertMany(newPates)
        await db.collection('salads').insertMany(newSalades)
        await db.collection('poutines').insertMany(newPoutines)
        await db.collection('snacks').insertMany(newCasseCroute)
        await db.collection('submarines').insertMany(newSousMarin)
        client.close()
    }catch(error){
        console.error(error.message)
    }
}

batchImport()