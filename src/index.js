import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from "./Welcome"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App_P from './App_Parche';
import Gallery from './components/Gallery';
import Sequence from './components/Sequence';
import AudioLoader from './components/AudioLoader';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
          <Route path="/bolitas-con-rebotes" element={<Welcome/>} />
          <Route path="/bolitas-con-rebotes/sequence" element={<Sequence />} />
          <Route path="/bolitas-con-rebotes/audio_loader" element={<AudioLoader />} />
          <Route path="/bolitas-con-rebotes/gallery" element={<Gallery />} />
          <Route path="/bolitas-con-rebotes/canvas" element={<App_P  />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

