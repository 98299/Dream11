import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
//const playerRoutes = require('./routes/playerRoutes');
//const teamRoutes = require('./routes/teamRoutes');
import player from "./routes/playerRoutes.js"
import Team from "./routes/Teammodel.js"

const app = express();
app.use(cors());
app.use(json());

connect('mongodb+srv://yakshita178:DBINmdAsidTdJYOh@event.kyhgg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

//app.use('/players', playerRoutes);
//app.use('/teams', teamRoutes);
app.use('/players',player);
app.use('/teams',Team);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
