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