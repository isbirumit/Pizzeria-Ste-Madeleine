const axios = require("axios");
require("dotenv").config();
const { WEATHER_KEY } = process.env;
const params = {
    access_key: WEATHER_KEY,
    query: "Montreal",
};

const getWeather = async (request, response) => {
    axios
        .get("http://api.weatherstack.com/current", { params })
        .then((res) => {
            const apiResponse = res.data;
            return response
                .status(200)
                .json({ status: 200, data: apiResponse.current });
        })
        .catch((error) => {
            response.status(404).json({ status: 404, error: error.message });
        });
};

module.exports = { getWeather };
