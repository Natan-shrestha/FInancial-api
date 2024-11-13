const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const logger = require('./config/logger');

const app = express();
app.use(express.json());

// Use the API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
