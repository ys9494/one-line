const { sequelize } = require("../data-access/models");

async function connectMysqlDB() {
  try {
    await sequelize.authenticate();
    console.log("🗄 Database connection success!");

    await sequelize.sync({ force: false });
    console.log("🗄 Database sync success!");
  } catch (err) {
    console.error("🗄 Database connection Error! " + err);
  }
}

async function disconnectMysqlDB() {
  try {
    await sequelize.close();
    console.log("🗄 Database connection closed successfully!");
  } catch (err) {
    console.error("🗄 Database close Error! " + err);
  }
}

module.exports = {
  connectMysqlDB,
  disconnectMysqlDB,
};
