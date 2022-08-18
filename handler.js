import sequelize from "./sequelize";
import Rsvp from './models/rsvp';
const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/test-connection", (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({
      message: "Database connection working",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

app.get("/guest", (req, res, next) => {
  const { query } = req;
  const { first_name, last_name } = query;

  if (name) {
    const matches = Rsvp.findAll({ where: { first_name, last_name }});
    
    return res.status(200).json({
      matches,
    });
  }
});

app.post("/reply", (req, res, next) => {
  return res.status(200).json({
    message: "Reply not set up.",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Something went wrong",
  });
});

module.exports.handler = serverless(app);
