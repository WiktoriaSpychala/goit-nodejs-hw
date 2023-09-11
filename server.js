const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection = mongoose
  .connect(process.env.DATABASE_URL, {
    dbName: "db-contacts",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(3000, () => console.log("Database connection successful"))
)
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });