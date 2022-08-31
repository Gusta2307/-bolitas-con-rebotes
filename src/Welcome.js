import React from 'react';
import styled from 'styled-components';
import Navbar from './components/NavBar';
import Intro from './components/Intro';
import Particles from './components/Particles';

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Gallery from './components/Gallery';
import Sequence from './components/Sequence';
import AudioLoader from './components/AudioLoader';


export default function Welcome(){

    const Container = styled.div`
        height: 100vh;
        background-color: #082A3A;
    `;

    
    // document.addEventListener("DOMContentLoaded", (event) => {
    //     // append child
    //     Particles().forEach((el) => {
    //         document.getElementById('root').firstChild.appendChild(el)
    //     })
    // })

    return (
        <Container>
            {Array.from({length: 60}, (v, k) => k).map((v, k) => {
                return (
                    <Particles 
                        key={k} 
                        _key={k} 
                        x={ Math.random() * (k % 2 === 0 ? -11 : 11)}
                        y={ Math.random() * 12} 
                    />)
            })}
            <Navbar/>
            <Intro/>
        </Container>
    );
}