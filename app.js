const { Rsvp, sequelize }= require("./models");
const { Op } = require("sequelize");
const express = require("express");
const boolParser = require('express-query-boolean');
const { isNil } = require("lodash"); 
const cors = require('cors');

const errors = {
  nameNotProvided: "Full name not provided",
  missingData: "Missing necessary data to update",
  generic: "Something went wrong"
}

const nameLookupHelper = async (firstName, lastName) => await Rsvp.findAll({ 
  where: { 
    first_name: {
      [Op.like]: `%${firstName}%`
    }, last_name: {
      [Op.like]: `%${lastName}%`
    }
  }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(boolParser());
app.use(cors());

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
      const matches = nameLookupHelper(first_name, last_name);
      return res.status(200).json({
        matches,
      });
    } catch (error) {
      next(error)  
    }
  }
  return res.status(400).json({ message: errors.nameNotProvided });
});

app.post("/reply", async (req, res, next) => {
  const { body } = req;
  const { guest_id, attending } = body;
  if (guest_id && !isNil(attending)) { 
    try { 
      const result = await Rsvp.update({ attending }, { where: { guest_id }});
      return res.status(200).json({
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }
  return res.status(400).json({ message: errors.missingData + " RSVP" }); 
});

app.post("/meal", async() => {
  const { body } = req;
  const { guest_id, meal, vegetarian, vegan, gluten_free, allergies } = body; 

  if (guest_id && !isNil(meal)) { 
    try { 
      const result = await Rsvp.update({ 
        meal, 
        vegetarian, 
        vegan, 
        gluten_free, 
        allergies
      }, 
      { 
        where: { guest_id }
      });
      return res.status(200).json({
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }
  return res.status(400).json({ message: errors.missingData + " meal preference" }); 
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: errors.generic,
  });
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err,
  });
});

module.exports.app = app;