import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import withApollo from 'next-with-apollo'
import cookie from 'cookie'

const uri = `http://localhost:4444/graphql`
const httpLink = createHttpLink({ uri, fetch })

const authLink = setContext((_, { headers }) => {
    // Get token from cookie
    let cookies

    //server side  ??
    if (headers) { 
        cookies = cookie.parse(headers.cookie || '')
    }
    
    //client side ??
    if (typeof window !== 'undefined') {
        cookies = cookie.parse(document.cookie || '')
    }
    
    const token = cookies && cookies.jwt || ''

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '', //Has token ?
        }
    }
})

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache().restore(initialState || {})
        });
    }/* , {
    render: ({ Page, props }) => {
        return (
            <ApolloProvider client={props.apollo}>
                <Page {...props} />
            </ApolloProvider>
        );
    }
} */
);