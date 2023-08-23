import React, { useState,  useCallback } from 'react'
import {  useMutation } from '@apollo/client';
import { Modal, Input, Form } from 'antd';
import { CREATE_MOVIE_MUTATION } from '../../graphql/queries'

interface CreateMovieModalProps {
  refetch: () => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
}

const CreateMovieModal: React.FC<CreateMovieModalProps> = ({refetch, showAddModal, setShowAddModal}) => {

  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieDescription, setNewMovieDescription] = useState('');

  const [addMovie] = useMutation(CREATE_MOVIE_MUTATION, {
    onCompleted: () => {
      setNewMovieTitle('');
      setNewMovieDescription('');
      refetch();
    }
  })

  const handleAddMovie = useCallback(() => {
    addMovie({ variables: { input: { title: newMovieTitle, description: newMovieDescription } } })
    setShowAddModal(false);
  }, [addMovie, setShowAddModal, newMovieTitle, newMovieDescription])

return ( 
    <Modal title="Add Movie" open={showAddModal} onOk={handleAddMovie} okButtonProps={{ disabled: !newMovieTitle.length }} onCancel={() => setShowAddModal(false)}>
        <Form>
            <Input 
                style={{marginBottom: 10}}
                value={newMovieTitle}
                onChange={(e) => setNewMovieTitle(e.target.value)}
                placeholder="Enter movie title" />

            <Input.TextArea
                rows={4}
                value={newMovieDescription}
                onChange={(e) => setNewMovieDescription(e.target.value)}
                placeholder="Enter movie description"
            />
        </Form>
    </Modal>
   )
}

export default CreateMovieModal;