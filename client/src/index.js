import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';

import App from './components/App';
import Navbar from './components/Navbar';
import withSession from './components/withSession';

import Search from './components/Recipe/Search';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/Profile';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include' //allows to send the token to backend
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);

      // if(networkError.statusCode === 401) {
      //   localStorage.setItem('token', '')
      // }
    }
  }
});
// to pass prop's down to specific routes will change component prop to render
const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/profile" component={Profile} />
        <Route path="/recipe/add" component={AddRecipe} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);


ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
