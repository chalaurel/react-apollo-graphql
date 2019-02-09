const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config({
    path: "variables.env"
});

// connects to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Database Connected.`))
    .catch(error => console.error(error));


// initialize app
const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});