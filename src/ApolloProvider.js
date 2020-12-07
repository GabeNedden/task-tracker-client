import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
    uri: 'https://g-task.herokuapp.com/'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
    
)