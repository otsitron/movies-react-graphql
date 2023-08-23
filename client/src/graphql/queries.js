import { gql, ApolloClient, InMemoryCache } from '@apollo/client'

const GRAPHQL_URL = 'http://localhost:9000/graphql'

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export const MOVIES_QUERY = gql`
    query getMovies {
        movies {
            id
            title
            likes
            dislikes
            description
        }
    }
`;

export const CREATE_MOVIE_MUTATION = gql`
    mutation CreateMovieMutation($input: CreateMovieInput!) {
        movie: createMovie(input: $input ) {
            id
        }
    }
`;

export const DELETE_MOVIE_MUTATION = gql`
    mutation DeleteMovieMutation($id: ID!) {
        movie: deleteMovie(id: $id) {
            id
            title
        }
    }
`;

export const UPDATE_MOVIE_MUTATION = gql`
    mutation UpdateMovieMutation($input: UpdateMovieInput!) {
        movie: updateMovie(input: $input ) {
            id
            title
            likes
            dislikes
            description
        }
    }
`;