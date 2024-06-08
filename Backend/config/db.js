const mongoose = require('mongoose');

require('dotenv').config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database connected..."))
  .catch((err) => {
    console.log(`Error occured at database connection:${err}`);
  });
