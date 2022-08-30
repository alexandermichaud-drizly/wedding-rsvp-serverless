const { Rsvp, sequelize }= require("./rsvp_model");
const { Op } = require("sequelize");
const express = require("express");
const app = express();

app.get("/test-api", (req, res, next) => res.status(200).json({ message: "great success"}));

app.get("/test-connection", async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({
      message: "Database connection established",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

app.get("/guest", async (req, res, next) => {
  const { query } = req;
  const { first_name, last_name } = query;

  if (first_name && last_name) {
    try {
      const matches = await Rsvp.findAll({ where: { first_name: {
        [Op.like]: `${first_name}%`
      }, last_name: {
        [Op.like]: `${last_name}%`
      } }});
      return res.status(200).json({
        matches,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }
  return res.status(400).json({ message: "Full name not provided"});
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

module.exports.app = app;