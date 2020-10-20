const db = require("./models");
const express = require("express");
const cors = require("cors");
const stockRoutes = require("./routes/stock");
const shareholderRoutes = require("./routes/shareholder");
const apiRoutes = require("./routes/api");
const passport = require("./config/passport/passport");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/stock", stockRoutes);
app.use("/shareholder", shareholderRoutes);
app.use("/api", apiRoutes);

db.sequelize.sync({ force: false }).then(() => {
  // console.log("Database synced");
  app.listen(8000, () => console.log("server is running"));
});
