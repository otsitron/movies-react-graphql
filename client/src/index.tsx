import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'bulma/css/bulma.css';

const portalRoot = document.getElementById('root')
const root = createRoot(portalRoot || document.createElement('#root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
