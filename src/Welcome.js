import React from 'react';
import styled from 'styled-components';
import Navbar from './components/NavBar';
import Intro from './components/Intro';
import {Particles} from './components/Particles';

export default function Welcome(){

    const Container = styled.div`
        height: 100vh;
        background-color: #082A3A;
    `;

    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
    const numBalls = 50;


    document.addEventListener("DOMContentLoaded", (event) => {
        // append child
        Particles().forEach((el) => {
            document.getElementById('root').firstChild.appendChild(el)
        })
    })

    return (
        <Container>
            <Navbar/>
            <Intro/>
        </Container>
    );
}