import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Manager />} />
            {/* Add more routes as needed */}
            {/* For example: */}
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
