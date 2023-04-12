const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const getOrders = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    try {
    } catch (error) {
    } finally {
        client.close();
    }
};

const getOrder = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    try {
        await client.connect();
        const db = client.db();
        const orders = await db.collection("orders").find().toArray();
        return response.status(200).json({ status: 200, data: orders });
    } catch (error) {
    } finally {
        client.close();
    }
};

const addOrder = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    const order = request.body;
    order._id = uuidv4();
    try {
        await client.connect();
        const db = client.db();
        await db
            .collection("users")
            .updateOne({ _id: order.userId }, { $set: { cart: [] } });
        const result = await db.collection("orders").insertOne(order);
        if (result.insertedId !== null) {
            return response.status(200).json({
                status: 200,
                message: "successfully inserted to orders",
                data: order,
            });
        } else {
            throw new Error("Something went wrong trying to insert the order");
        }
    } catch (error) {
        return response
            .status(404)
            .json({ status: 404, message: error.message });
    } finally {
        client.close();
    }
};

const patchOrder = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);

    try {
    } catch (error) {
    } finally {
        client.close();
    }
};

const deleteOrder = async (request, response) => {};

module.exports = { getOrders, getOrder, addOrder, patchOrder, deleteOrder };
