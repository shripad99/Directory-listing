const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()

const app = express();
const apiRoutes = require('./routes/api');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connected');
    }
)


app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});