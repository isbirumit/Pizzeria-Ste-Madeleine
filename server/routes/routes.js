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
router.get('/stm/pizzas/:pizzaId',getPizza)
router.post('/smt/pizza',addPizza)
router.patch('/stm/pizzas/:pizzaId',patchPizza)
router.delete('/stm/pizzas/:pizzaId',deletePizza)

//platers

const {
    getPlatters,
    getPlatter,
    addPlatter,
    patchPlatter,
    deletePlatter
} = require('../handlers/platters')

router.get('/stm/platters',getPlatters)
router.get('/stm/platters/:platterId',getPlatter)
router.post('/smt/platters',addPlatter)
router.patch('/stm/platters/:platterId',patchPlatter)
router.delete('/stm/platters/:platterId',deletePlatter)

//snacks

const {
    getSnacks,
    getSnack,
    addSnack,
    patchSnack,
    deleteSnack
} = require('../handlers/snacks')

router.get('/stm/snacks',getSnacks)
router.get('/stm/snacks/:snackId',getSnack)
router.post('/smt/snack',addSnack)
router.patch('/stm/snacks/:snackId',patchSnack)
router.delete('/stm/snacks/:snackId',deleteSnack)

//submarines

const {
    getSubmarines,
    getSubmarine,
    addSubmarine,
    patchSubmarine,
    deleteSubmarine
} = require('../handlers/submarines')

router.get('/stm/submarines',getSubmarines)
router.get('/stm/submarines/:submarineId',getSubmarine)
router.post('/smt/submarine',addSubmarine)
router.patch('/stm/submarines/:submarineId',patchSubmarine)
router.delete('/stm/submarines/:submarineId',deleteSubmarine)


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
router.get('/stm/poutines/:poutineId',getPoutine)
router.post('/smt/poutine',addPoutine)
router.patch('/stm/poutines/:poutineId',patchPoutine)
router.delete('/stm/poutines/:poutineId',deletePoutine)

//salads

const {
    getSalads,
    getSalad,
    addSalad,
    patchSalad,
    deleteSalad
} = require('../handlers/salads')

router.get('/stm/salads',getSalads)
router.get('/stm/salads/:saladId',getSalad)
router.post('/smt/salad',addSalad)
router.patch('/stm/salads/:saladId',patchSalad)
router.delete('/stm/salads/:saladId',deleteSalad)



module.exports = router