import React, {useCallback} from 'react'
import {  useMutation } from '@apollo/client';
import { Card, notification } from 'antd';
import { LikeOutlined, DislikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { UPDATE_MOVIE_MUTATION, DELETE_MOVIE_MUTATION } from '../../../graphql/queries';

const Movie = ({ movieProps, refetch }) => {
    const { title, likes, dislikes, description, id } = movieProps;

    const [updateMovie] = useMutation(UPDATE_MOVIE_MUTATION)
    const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
        onCompleted: ({ movie }) => {
            refetch();
            notification.info({
              message: `${movie.title} is now deleted`,
            });
        }
      })

    // Note: I do realize this isn't ideal, but I wanted to focus on frontend tasks for this exercise.
    // In ideal scenario, there would be two separate mutations to update likes and dislikes that would only require an id
    // Incrementing by one would take place on the backend to guarantee correct value of increment when multiple users are liking a movie.

    const handleLikeMovie =  useCallback(async () => {
        await updateMovie({ variables: {input: { title, dislikes, description, id, likes: (likes || 0) + 1}}})
    }, [updateMovie, title, dislikes, description, id, likes])

    const handleDislikeMovie = useCallback(async () => {
        await updateMovie({ variables: {input: { title, id, likes, description, dislikes: (dislikes || 0) + 1}}})
    }, [updateMovie, title, dislikes, description, id, likes])

    const handleDeleteMovie = useCallback(async () => {
        await deleteMovie({ variables: { id } })
    }, [deleteMovie, id])

    return <Card 
        title={title} 
        style={{ width: 300 }} 
        actions={[      
            <p onClick={handleLikeMovie}>{likes || 0} <LikeOutlined key="like" /></p>,
            <p onClick={handleDislikeMovie}>{dislikes || 0} <DislikeOutlined key="dislike"  /></p>,
            <DeleteOutlined key="delete" onClick={handleDeleteMovie} />
        ]}>
            <p>{description}</p>
        </Card>
}

export default Movie