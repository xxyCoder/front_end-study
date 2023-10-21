import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Page1 from './page1';
import Page2 from './page2';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/react" >React</Link>
        <Link to="/vue" >Vue</Link>

        <Routes>
          <Route path='/react/*' element={<Page1></Page1>}></Route>
          <Route path='/vue/*' element={<Page2></Page2>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
