
import './App.css';
import HolaMundo from './HolaMundo';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './config/RouterConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Container>
        <RouterConfig></RouterConfig>
      </Container>
    </BrowserRouter>
  );
}

export default App;
