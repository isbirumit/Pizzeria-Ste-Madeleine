const router = require('express').Router()

//users
const {
    getUser,
    getUsers,
    addUser
} = require('../handlers/users')

router.get('/stm/users',getUsers)
router.get('/stm/users/:userId',getUser)
router.post('/stm/user',addUser)


//orders
const {
    getOrders,
    getOrder,
    addOrder,
    patchOrder,
    deleteOrder
} = require('../handlers/orders')

router.get('/stm/orders',getOrders)
router.get('/stm/orders/:orderId',getOrder)
router.post('/stm/order',addOrder)
router.patch('/stm/orders/:orderId',patchOrder)
router.delete('/stm/orders/:orderId',deleteOrder)

//Combos

const {
    getCombos,
    getCombo,
    addCombo,
    patchCombo,
    deleteCombo
} = require('../handlers/combos')

router.get('/stm/combos',getCombos)
router.get('/stm/combos/:comboId',getCombo)
router.post('/smt/combo',addCombo)
router.patch('/stm/combos/:comboId',patchCombo)
router.delete('/stm/combos/:comboId',deleteCombo)

//Pizzas

const {
    getPizzas,
    getPizza,
    addPizza,
    patchPizza,
    deletePizza
} = require('../handlers/pizzas')

router.get('/stm/pizzas',getPizzas)
router.get('/stm/pizzas/:comboName',getPizza)
router.post('/smt/pizza',addPizza)
router.patch('/stm/pizzas/:comboName',patchPizza)
router.delete('/stm/pizzas/:comboName',deletePizza)

//platers

const {
    getPlaters,
    getPlater,
    addPlater,
    patchPlater,
    deletePlater
} = require('../handlers/platers')

router.get('/stm/platers',getPlaters)
router.get('/stm/platers/:comboName',getPlater)
router.post('/smt/plater',addPlater)
router.patch('/stm/platers/:comboName',patchPlater)
router.delete('/stm/platers/:comboName',deletePlater)

//snacks

const {
    getSnacks,
    getSnack,
    addSnack,
    patchSnack,
    deleteSnack
} = require('../handlers/snacks')

router.get('/stm/snacks',getSnacks)
router.get('/stm/snacks/:comboName',getSnack)
router.post('/smt/snack',addSnack)
router.patch('/stm/snacks/:comboName',patchSnack)
router.delete('/stm/snacks/:comboName',deleteSnack)

//submarines

const {
    getSubmarines,
    getSubmarine,
    addSubmarine,
    patchSubmarine,
    deleteSubmarine
} = require('../handlers/submarines')

router.get('/stm/submarines',getSubmarines)
router.get('/stm/submarines/:comboName',getSubmarine)
router.post('/smt/submarine',addSubmarine)
router.patch('/stm/submarines/:comboName',patchSubmarine)
router.delete('/stm/submarines/:comboName',deleteSubmarine)


//pastas

const {
    getPastas,
    getPasta,
    addPasta,
    patchPasta,
    deletePasta
} = require('../handlers/pastas')

router.get('/stm/pastas',getPastas)
router.get('/stm/pastas/:pastaId',getPasta)
router.post('/smt/pasta',addPasta)
router.patch('/stm/pastas/:pastaId',patchPasta)
router.delete('/stm/pastas/:pastaId',deletePasta)

//poutines

const {
    getPoutines,
    getPoutine,
    addPoutine,
    patchPoutine,
    deletePoutine
} = require('../handlers/poutines')

router.get('/stm/poutines',getPoutines)
router.get('/stm/poutines/:comboName',getPoutine)
router.post('/smt/poutine',addPoutine)
router.patch('/stm/poutines/:comboName',patchPoutine)
router.delete('/stm/poutines/:comboName',deletePoutine)

//salads

const {
    getSalads,
    getSalad,
    addSalad,
    patchSalad,
    deleteSalad
} = require('../handlers/salads')

router.get('/stm/salads',getSalads)
router.get('/stm/salads/:comboName',getSalad)
router.post('/smt/salad',addSalad)
router.patch('/stm/salads/:comboName',patchSalad)
router.delete('/stm/salads/:comboName',deleteSalad)



module.exports = router