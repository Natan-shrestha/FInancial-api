const axios = require('axios');
const Joi = require('joi');
const logger = require('../config/logger');
require('dotenv').config();

const { CONNECT24_API_BASE_URL, CONNECT24_API_TOKEN } = process.env;

// Define validation schema for transaction details
const transactionSchema = Joi.object({
  fromAccount: Joi.string().required(),
  toAccount: Joi.string().required(),
  amount: Joi.number().positive().required()
});

exports.executeTransaction = async (req, res) => {
  const { error } = transactionSchema.validate(req.body);

  if (error) {
    logger.error(`Validation Error: ${error.message}`);
    return res.status(400).json({ error: "Invalid transaction data" });
  }

  try {
    const response = await axios.post(`${CONNECT24_API_BASE_URL}/transactions`, req.body, {
      headers: { Authorization: `Bearer ${CONNECT24_API_TOKEN}` }
    });
    res.json(response.data);
  } catch (err) {
    logger.error(`Transaction Failed: ${err.message}`);
    res.status(err.response?.status || 500).json({ error: "Transaction failed" });
  }
};
