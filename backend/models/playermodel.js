import mongoose, { Schema } from 'mongoose';

const playerSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  points: { type: Number, required: true },
});

const Player = mongoose.model('Player', playerSchema);
export default Player;

