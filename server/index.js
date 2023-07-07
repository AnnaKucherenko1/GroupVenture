
const app = require('./app');
const sequelize = require("./models/modelDB");
(async () => {
  try {
    await sequelize.sync();
    console.log("Connected to the db at port 5433");
    const port = 3333;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("NOT CONNECTED to the database:", error);
  }
})();
