import 'dotenv/config';
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API key is required' });
    }

    const validApiKey = process.env.API_KEY;

    if (apiKey !== validApiKey) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    next();
};

export default validateApiKey;