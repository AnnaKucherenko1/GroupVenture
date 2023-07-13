
const app = require('./app');
const sequelize = require("./models/modelDB");
(async () => {
  try {
    await sequelize.sync({alter: true});
    console.log("Connected to PostgreSQL DB!")
    const port = 3333;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("NOT CONNECTED to the database:", error);
  }
})();
