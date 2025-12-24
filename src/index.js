import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Guest from './models/guestModel.js';
import Rsvp from './models/rsvpModel.js';
import validateApiKey from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(validateApiKey);

// Routes
app.get('/api/invitation/:code', async (req, res) => {
    const { code } = req.params;
    const guest = await Guest.findOne({ where: { code } })
    if (guest) {
        res.json(guest);
    }
    else {
        res.status(404).json({ message: 'Guest not found' });
    }
});

app.get('/api/rsvp', async (req, res) => {
    const {limit, page} = req.query;
    const rsvps = await Rsvp.findAndCountAll({
        limit: limit ? parseInt(limit) : undefined,
        offset: page ? (parseInt(page) - 1) * (limit ? parseInt(limit) : 10) : undefined,
        order: [['createdAt', 'DESC']],
    });

    const response = {
        total: rsvps.count,
        totalPages: limit ? Math.ceil(rsvps.count / parseInt(limit)) : 1,
        isNextPage: page ? (parseInt(page) * (limit ? parseInt(limit) : 10) < rsvps.count) : false,
        isPrevPage: page ? (parseInt(page) > 1) : false,
        rsvps: rsvps.rows,
    }

    res.status(200).json(response);
});

app.post('/api/rsvp', async (req, res) => {
    const { name, isPresence, total, comment, guestId } = req.body;
    try {
        const newRsvp = await Rsvp.create({
            name,
            isPresence,
            total,
            comment,
            guestId
        });
        res.status(200).json(newRsvp);
    } catch (error) {
        res.status(400).json({ message: 'Error creating RSVP', error: error.message });
    }
});

    
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});