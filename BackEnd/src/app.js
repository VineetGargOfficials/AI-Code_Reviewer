const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');


const app = express();

// middleware
app.use(express.json());
app.use(cors());
// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// mount ai routes
app.use('/ai', aiRoutes);

module.exports = app;
