import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import Movies from './components/movies';
import { client } from './graphql/queries';

function App() {
  return (
    <ApolloProvider client={client}>
      <main className="section">
        <Routes>
          <Route exact path="/"
            element={<Movies />}
          />
        </Routes>
      </main>
    </ApolloProvider>
  );
}

export default App;
