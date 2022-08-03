import React from 'react';
import styled from 'styled-components';
import Navbar from './components/NavBar';
import Intro from './components/Intro';

export default function Welcome(){

    const Container = styled.div`
        height: 100vh;
        background-color: #082A3A;
    `;



    return (
        <Container>
            <Navbar />
            <Intro />
        </Container>
    );
}