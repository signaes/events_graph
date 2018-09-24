import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import TicketsList from './components/TicketsList';
import store from './redux/store';
import './App.css';

const client = new ApolloClient({
  uri: 'http://dev.lets.events/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <TicketsList />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
