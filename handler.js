const app = require("./app").app;

module.exports.handler = serverless(app);
