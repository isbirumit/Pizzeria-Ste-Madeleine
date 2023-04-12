const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const getPastas = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    try {
        await client.connect();
        const db = client.db();
        const pastas = await db.collection("pastas").find().toArray();
        if (pastas.length > 0) {
            return response.status(200).json({
                status: 200,
                message: "Pastas retrieved from database",
                data: pastas,
            });
        } else {
            throw new Error(
                "Something went wrong trying to retrieve pastas from database"
            );
        }
    } catch (error) {
        return response.status(404).json({ status: 404, error: error.message });
    } finally {
        client.close();
    }
};

const getPasta = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);
    try {
        await client.connect();
        const db = client.db();
        const pasta = await db
            .collection("pastas")
            .findOne({ _id: request.params.pastaId });
        if (pasta !== null) {
            return response.status(200).json({
                status: 200,
                message: "Pasta retrieved from data",
                data: pasta,
            });
        } else {
            throw new Error(
                "Something went wrong trying to retrieve the pasta from database"
            );
        }
    } catch (error) {
        return response.status(404).json({ status: 404, error: error.message });
    } finally {
        client.close();
    }
};

const addPasta = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);

    try {
    } catch (error) {
    } finally {
        client.close();
    }
};

const patchPasta = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);

    try {
    } catch (error) {
    } finally {
        client.close();
    }
};

const deletePasta = async (request, response) => {
    const client = new MongoClient(MONGO_URI, option);

    try {
    } catch (error) {
    } finally {
        client.close();
    }
};

module.exports = { getPastas, getPasta, addPasta, patchPasta, deletePasta };
