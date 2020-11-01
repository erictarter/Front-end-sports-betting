const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

// GET NFL GAMES

const nflGames = [
  {
    away: {
      name: 'dallas',
      moneyline: '+110'
    },
    home: {
      name: 'seattle',
      moneyline: '-120'
    }
  }
];

app.get('/nfl', function(req, res) {
  res.send(nflGames);
});

app.post('/nfl', (req, res) => {
  const game = {
    away: req.body.away,
    home: req.body.home
  };
  // nflGames.push(game);
  console.log(game);
  res.send(game);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on`));
