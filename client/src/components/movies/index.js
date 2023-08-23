import React from "react";
import Movies from "./Movies";
import { useQuery } from '@apollo/client';
import { Spin } from "antd";
import { MOVIES_QUERY } from "../../graphql/queries";

const MovieList = () => {
    const { data, loading, error, refetch } = useQuery(MOVIES_QUERY, { fetchPolicy: 'network-only' });
    if (loading) {
        return <Spin size="large" />
      }
      const { movies } = data;

      if (error) {
        return <p>Sorry, something went wrong.</p>;
      }

    return <Movies movies={ movies } refetch={refetch} />
}

export default MovieList;