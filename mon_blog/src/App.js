import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ConnexionPage from './components/ConnexionPage';
import CreationPage from './components/CreationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<ConnexionPage />} />
          <Route path="/creation" element={<CreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;