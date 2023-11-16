import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ConnexionPage from './components/ConnexionPage';
import CreationPage from './components/CreationPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ajout de l'état isLoggedIn

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} /> {/* Passer isLoggedIn à Home */}
          <Route path="/connexion" element={<ConnexionPage setIsLoggedIn={setIsLoggedIn} />} /> {/* Passer setIsLoggedIn à ConnexionPage */}
          <Route path="/creation" element={<CreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;