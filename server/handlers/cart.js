const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

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

module.exports = { addCart };
