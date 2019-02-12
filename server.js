const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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

// create graphiql application 
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// connect Schema with GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});