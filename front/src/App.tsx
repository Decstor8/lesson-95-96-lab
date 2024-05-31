import './App.css';
import Toolbars from './components/Toolbars';
import {Route, Routes} from 'react-router-dom';
import Register from './features/Users/Register';
import Login from './features/Users/Login';
import Cocktails from './features/Cocktails/Cocktails';

function App() {

  return (
      <>
        <header>
          <Toolbars />
        </header>
        <Routes>
            <Route path="/" element={<Cocktails />} />
            <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </>
  );
}

export default App;
