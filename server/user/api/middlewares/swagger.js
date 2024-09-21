const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "A simple User authentication API",
    },
    servers: [
      {
        url: "https://user-api-64ni.onrender.com/",
        description: "Production server",
      },
      // {
      //   url: "http://localhost:3000/",
      //   description: "Local development server",
      // },
    ],
  },
  apis: ["./index.js", "./api/**/*.js"],
};

const specs = swaggerJsDoc(options);

const swaggerMiddleware = swaggerUI.serve;
const setupMiddleware = swaggerUI.setup(specs);

module.exports = {
  swaggerMiddleware,
  setupMiddleware,
};
