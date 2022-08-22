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
          <Route path="/bolitas-con-rebotes" element={<Welcome/>}/>
          <Route path="sequence" element={<Sequence />} />
          <Route path="audio_loader" element={<AudioLoader />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="canvas" element={<App_P  />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

