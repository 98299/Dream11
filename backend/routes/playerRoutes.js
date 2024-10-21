import { Router } from 'express';
import Player from '../models/playermodel.js';
const router = Router();

router.get('/', async (req, res) => {
  try {
    const players = await Player.find();  // Fetch all players from the database
    res.json(players);  // Send the list of players as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});
// POST /players - Create a new player
router.post('/', async (req, res) => {
  try {
    const { name, role, points } = req.body;
    const player = new Player({ name, role, points });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create player' });
  }
});

export default router;

