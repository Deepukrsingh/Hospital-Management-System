const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyBuCJy2f7k0HMw-P1Sj5q9XG0BZOr4llKQ');

const systemPrompt = `You are a helpful medical AI.`;

async function test() {
    try {
        console.log("Initializing model...");
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            systemInstruction: systemPrompt
        });

        console.log("Starting chat...");
        const chat = model.startChat({
            history: []
        });

        console.log("Sending message...");
        const result = await chat.sendMessage("mild fever");
        console.log("Response:", result.response.text());
    } catch (error) {
        console.error("ERROR:");
        console.error(error);
    }
}

test();
