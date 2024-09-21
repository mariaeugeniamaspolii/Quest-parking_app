const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3030;

const { mongodbLink } = require("./configs");
mongoose.connect(mongodbLink);

const dbConnection = mongoose.connection;
dbConnection.once("open", () => {
    console.log("Successful DB connection");
});

app.use(express.json());
app.use(express.urlencoded({
    limit: "50mb",
    extended: false
}));

app.use(cors());

app.get("/", (req, res) => {
    res.send("Server running...");
});

// api endpoints
app.use("/api", require("./api"));

require("./user/api/routes/swagger.routes")(app);
require("./user/api/routes/ping.routes")(app);
require("./user/api/routes/auth.routes")(app);
require("./user/api/routes/user.routes")(app);
require("./user/api/routes/error.routes")(app);

const server = app.listen(port, () => {
    console.info("QuestData listening on http://localhost:" + port);
});
