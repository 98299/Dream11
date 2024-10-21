import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }], // Reference Player model
  totalPoints: { type: Number, required: true },
});

const TeamPlayer = mongoose.model('Team', teamSchema);
export default TeamPlayer;