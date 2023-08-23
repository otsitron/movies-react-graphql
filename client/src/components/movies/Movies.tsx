import { useState, useEffect } from 'react'
import { Card, Row, Col, Input, Divider, Button } from 'antd';
import { PlusOutlined, SortAscendingOutlined, SearchOutlined } from '@ant-design/icons';
import Movie from './movie/Movie';
import CreateMovieModal from '../create-movie-modal/CreateMovieModal';
import { MoviePropsType } from '../../types/Types';

interface MoviesProps {
  movies: MoviePropsType[];
  refetch: () => void;
}

const Movies: React.FC<MoviesProps> = ({ movies = [], refetch }) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredMovies, setFilteredMovies] = useState<MoviePropsType[]>(movies)
  const [sortOption, setSortOption] = useState<string | null>(null)

  useEffect(() => {
    const filtered = movies.filter(({title}: {title: string}) => title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sortOption === 'liked') {
      filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0))
    } else if (sortOption === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(filtered)
  }, [searchQuery, movies, sortOption])

  return (
    <div>
      <h1 className="title">
        Video Store
      </h1>
      <Row gutter={[30, 30]}>
        <Col>
          <Input 
            size="large"
            style={{width: 500}}
            placeholder="Search movie by title" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<SearchOutlined/>}
          />
        </Col>
        <Col>
          <Button 
            icon={<SortAscendingOutlined />}
            type={sortOption === 'liked' ? 'primary' : 'default'} 
            onClick={()=>setSortOption(sortOption === 'liked' ? null : "liked")}>Sort By Most Liked</Button>
        </Col>
        <Col>
          <Button 
            icon={<SortAscendingOutlined />}
            type={sortOption === 'title' ? 'primary' : 'default'} 
            onClick={()=>setSortOption(sortOption === 'title' ? null : 'title')}>Sort By Title</Button>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]} style={{marginBottom: 10}}>
        <Col>
            <Card 
              hoverable 
              onClick={() => setShowAddModal(true)} 
              style={{ width: 300 }}>
                  <h2>Add Movie</h2>
                  <PlusOutlined style={{ fontSize: 100, width: "100%", display: "block" }} />
            </Card>
        </Col>

        {filteredMovies.map((movie) => {
            return (<Col key={movie.id} className="gutter-row">
                <Movie movieProps={movie} refetch={refetch} />
            </Col>)
        })}
      </Row>

       <CreateMovieModal refetch={refetch} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />

    </div>
  );
}

export default Movies;
