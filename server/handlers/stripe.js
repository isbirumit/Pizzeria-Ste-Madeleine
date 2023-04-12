const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const getPublicKey = async (request, response) => {
    response.send({ publishableKey: process.env.STRIPE_PUBLIC_KEY });
};

const createPayment = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: request.body.cart.map((item) => {
                return {
                    quantity: 1,
                    price_data: {
                        currency: "cad",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: (item.price * 100).toFixed(0),
                    },
                };
            }),
            success_url: `${process.env.SERVER_URL}/successfull`,
            cancel_url: `${process.env.SERVER_URL}/`,
        });
        await client.connect();
        const db = client.db();
        await db
            .collection("users")
            .updateOne({ _id: request.body.userId }, { $set: { cart: [] } });
        const result = await db.collection("orders").insertOne(request.body);

        return response.status(200).json({ link: session.url });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};

const getOrderSucces = async (request, response) => {};

module.exports = { getPublicKey, createPayment };
