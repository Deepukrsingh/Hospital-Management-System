const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Get symptom checker response from Gemini
// @route   POST /api/ai/symptom-checker
// @access  Private
const checkSymptoms = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const systemPrompt = `You are a helpful, empathetic, and highly knowledgeable medical AI assistant for the Medicure Hospital System. 
Your goal is to help patients understand their symptoms and provide general medical information.
IMPORTANT RULES:
1. Always include a clear disclaimer at the beginning or end of your response stating: "Disclaimer: I am an AI, not a doctor. This information is for educational purposes and should not replace professional medical advice. Please consult a doctor or book an appointment through Medicure for a proper diagnosis."
2. Ask clarifying questions if the symptoms are vague.
3. Suggest the patient book an appointment with a relevant specialist (e.g., Cardiologist, Neurologist) if the symptoms warrant it.
4. If symptoms sound like a medical emergency (e.g., severe chest pain, difficulty breathing, sudden numbness), explicitly tell them to seek emergency medical care immediately (call 911).
5. Keep your responses concise, well-formatted, and easy to read.`;

        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            systemInstruction: systemPrompt
        });

        // We can format the history if needed, but for simplicity we'll send a combined prompt
        // Or we can use the chat API
        const chat = model.startChat({
            history: history || []
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        res.json({ response: responseText });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ message: 'Failed to process AI response' });
    }
};

module.exports = {
    checkSymptoms
};
