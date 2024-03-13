import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Prospectos from '../Prospectos/Prospectos';
import ProspectoForm from '../Prospectos/ProspectoForm';
import ProspectoEdit from '../Prospectos/ProspectoEdit';
// import Dashboard from '../Dashboard';

const App = () => {


  return (

    <Router>

      <Routes>
        <Route path="/" element={<Prospectos />} />
        <Route path="/prospectos" element={<ProspectoForm />} />
        <Route path="/prospectos/:id" element={<ProspectoEdit />} />
      </Routes>

    </Router>

  );
};

export default App;
