const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL-Express middleware
const {
    graphiqlExpress,
    graphqlExpress
} = require('apollo-server-express');
const {
    makeExecutableSchema
} = require('graphql-tools');

const {
    typeDefs
} = require('./schema');
const {
    resolvers
} = require('./resolvers');

// create Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

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

// cors

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

// set jwt authentication middleware
app.use(async (req, res, next) => {
    const token = req.headers["authorization"];

    if (token !== "null") {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        } catch (err) {
            console.error(err);
        }
    }
    console.log(token);
    next();
});

// create graphiql application 
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// connect Schema with GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
        Recipe,
        User,
        currentUser
    }
})));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});