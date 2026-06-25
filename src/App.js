import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Tracker from './Tracker.js';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="streamer/:pseudo" element={<Tracker />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
