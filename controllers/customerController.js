const axios = require('axios');
const Joi = require('joi');
const logger = require('../config/logger');
require('dotenv').config();

const { FI_API_BASE_URL, FI_API_TOKEN } = process.env;

// Define validation schema for customer ID
const customerSchema = Joi.object({
  id: Joi.string().required()
});

exports.getCustomerData = async (req, res) => {
  const { id } = req.params;
  const { error } = customerSchema.validate({ id });

  if (error) {
    logger.error(`Validation Error: ${error.message}`);
    return res.status(400).json({ error: "Invalid Customer ID" });
  }

  try {
    const response = await axios.get(`${FI_API_BASE_URL}/customers/${id}`, {
      headers: { Authorization: `Bearer ${FI_API_TOKEN}` }
    });
    res.json(response.data);
  } catch (err) {
    logger.error(`Failed to fetch customer data: ${err.message}`);
    res.status(err.response?.status || 500).json({ error: "Unable to fetch customer data" });
  }
};
