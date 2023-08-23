import { Movie } from './db.js'

export const resolvers = {
    Query: {
        movies: async () => await Movie.findAll(),
    },

    Mutation: {
        createMovie: async (_root, { input }) => await Movie.create(input),
        deleteMovie: async (_root, { id }) => await Movie.delete(id),
        updateMovie: async (_root, { input }) => await Movie.update(input)
    },
};