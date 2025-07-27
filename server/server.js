const express = require('express');
const cors = require('cors');
const connectionDb = require('./db');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

let db;

app.get('/players', async (req, res) => {
  try {
    const players = await db.all('SELECT * FROM players');
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/players/:player_name', async (req, res) => {
  const { player_name } = req.params;
  try {
    const player = await db.get(
      'SELECT * FROM players WHERE LOWER(player_name) = ?',
      player_name.toLowerCase()
    );
    return player
      ? res.json(player)
      : res.status(404).json({ message: 'Player not found' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/player', async (req, res) => {
  const { player_name, number, age, qualification } = req.body;
  try {
    await db.run(
      'INSERT INTO players (player_name, number, age, qualification) VALUES (?, ?, ?, ?)',
      player_name,
      number,
      age,
      qualification
    );
    res.json({ message: 'Player added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Insert failed', error: err.message });
  }
});

const startServer = async () => {
  db = await connectionDb();
  console.log('Connected to DB');
  app.listen(process.env.PORT || 4000, () => console.log('Server running on http://localhost:4000'));
};

startServer()