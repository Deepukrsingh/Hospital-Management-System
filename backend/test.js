const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
    try {
        console.log("Initializing model...");

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
        });

        console.log("Generating response...");

        const result = await model.generateContent("mild fever");

        console.log(result.response.text());

    } catch (error) {
        console.error("FULL ERROR:");
        console.error(error);
    }
}

test();