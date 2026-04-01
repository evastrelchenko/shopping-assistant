const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant', // free and fast
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful shopping assistant. When a user describes what they're looking for,
          respond with exactly 3 product recommendations.
          Format your response as a JSON array like this:
          [
            {
              "name": "Product Name",
              "price": "$XX.XX",
              "description": "A brief 1-2 sentence description of why this fits what they need."
            }
          ]
          Only respond with the JSON array, nothing else.`
                },
                {
                    role: 'user',
                    content: message
                }
            ],
        });

        const rawText = completion.choices[0].message.content;
        const products = JSON.parse(rawText);

        res.json({ products });

    } catch (error) {
        console.error('Groq error:', error);
        res.status(500).json({ error: 'Failed to get recommendations' });
    }
});

module.exports = router;