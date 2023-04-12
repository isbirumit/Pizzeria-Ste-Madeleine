const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const getCart = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    try {
        await client.connect();
        const db = client.db();
        const result = await db
            .collection("users")
            .find({ _id: request.params.userId })
            .toArray();
        if (!result) {
            throw new Error(
                "Something went wrong retrieving cart from database"
            );
        } else {
            return response.status(200).json({
                status: 200,
                message: "successfully retrieved data from db",
                data: result[0].cart,
            });
        }
    } catch (error) {
        return response.status(404).json({ status: 404, error: error.message });
    } finally {
        client.close();
    }
};

const addCart = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    const cart = {
        userId: request.body.userId,
        cartArr: request.body.cartArr,
    };
    try {
        await client.connect();
        const db = client.db();
        const result = await db
            .collection("users")
            .updateOne({ _id: cart.userId }, { $set: { cart: cart.cartArr } });
        if (result.modifiedCount > 0) {
            return response
                .status(200)
                .json({ status: 200, message: "Succesfully added to cart" });
        } else {
            throw new Error(
                "Something went wrong trying to add to cart, please contact the support"
            );
        }
    } catch (error) {
        return response.status(404).json({ status: 404, error: error.message });
    } finally {
        client.close();
    }
};

const patchCart = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    const body = {
        userId: request.body.userId,
        itemId: request.body.itemId,
    };
    try {
        await client.connect();
        const db = client.db();
        //deletes from cart here
        const deleted = await db
            .collection("users")
            .updateOne(
                { _id: body.userId },
                { $pull: { cart: { item_id: body.itemId } } }
            );
        if (deleted.modifiedCount > 0) {
            const user = await db
                .collection("users")
                .findOne({ _id: body.userId });
            return response.status(200).json({
                status: 200,
                message: "item successfully deleted",
                cartData: user.cart,
            });
        }
    } catch (error) {
        return response.status(404).json({ status: 404, error: error.message });
    } finally {
        client.close();
    }
};
module.exports = { addCart, getCart, patchCart };
