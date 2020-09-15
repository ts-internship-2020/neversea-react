import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from "@apollo/client/link/context"
import { env } from "../utils/env"
import { createUploadLink } from 'apollo-upload-client'
import omitDeep from 'omit-deep-lodash'


const httpLink = createUploadLink({
  uri: `${env.REACT_APP_GQL_HTTP_PROTOCOL}://${env.REACT_APP_GQL}/graphql`,
  onError: onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  }),
})

const authLink = (token) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })
}

const omitTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = omitDeep(operation.variables, ['__typename'])
  }
  return forward(operation)
})


const retryLink = new RetryLink({
  delay: {
    initial: 200,
    max: 2000,
    jitter: true
  },
  attempts: {
    max: 3
  }
});

const myAppLink = (token) => {
  return ApolloLink.from([omitTypenameLink, retryLink, authLink(token).concat( httpLink )])
}

const cache = new InMemoryCache({
  typePolicies: {
    Page: {
      keyFields: ["page", "pageSize"]
    }
  }
})

export const client = (oidcUser) => {
  const token = oidcUser?.access_token || '';
  return new ApolloClient({
    link: myAppLink(token),
    cache
  })
}