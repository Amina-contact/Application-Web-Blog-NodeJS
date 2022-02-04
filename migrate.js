const db = require('./models')
async function migrate() {
  await db.sequelize.sync({force: true})
  console.log("Done")
}
migrate()
