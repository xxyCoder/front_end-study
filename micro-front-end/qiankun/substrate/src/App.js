import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import './registerApp'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to="/react">React应用</Link>
        <Link to="/vue">Vue应用</Link>
        <Link to="/static">static应用</Link>
      </BrowserRouter>
      <div id='container'>
      </div>
    </div>
  );
}

export default App;
