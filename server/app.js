const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/db');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', taskRoutes);

// Sync database and start server
(async () => {
  await sequelize.sync();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
