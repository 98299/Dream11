import { Router } from 'express';
import  TeamPlayer  from '../models/teammodel.js';
import Player from '../models/playermodel.js';
const router = Router();

// POST /teams - Create a new team
router.post('/', async (req, res) => {
  try {
    const { name, players } = req.body;

    // Validate number of players
    if (!players || players.length > 11) {
      return res.status(400).json({ error: 'Max 11 players allowed' });
    }

    // Ensure all provided player IDs are valid and exist in the database
    const validPlayers = await Player.find({ _id: { $in: players } });
    if (validPlayers.length !== players.length) {
      return res.status(400).json({ error: 'Invalid or non-existent player IDs' });
    }

    // Calculate total points for the team
    const totalPoints = validPlayers.reduce((sum, player) => sum + player.points, 0);

    // Create and save the team
    const team = new TeamPlayer({ name, players, totalPoints });
    await team.save();

    res.status(201).json(team);  // Return the created team as response
  } catch (error) {
    console.error('Error creating team:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to create team' });
  }
});


// GET /teams/:id - Retrieve team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await TeamPlayer.findById(req.params.id).populate('players');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

export default router;
