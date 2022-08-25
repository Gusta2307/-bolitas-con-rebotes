import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom'
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import GJSON from './Gallery_JSON';
import {random} from '../utils'

export default function Intro(){
    const navigate = useNavigate()

    const Container = styled.div`
        height: calc(100vh - 50px);
        color: #FFFFFF;

        // center items
        display: flex;
        justify-content: center;   
        flex-direction: column; 
        align-items: center;
    `

    const Wrapper = styled.div`
        padding: 20px 20px;

        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        z-index: 100;
        
        // glass effect
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px  0 rgba(0,0,0,0.37);
        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;
    `

    const Title = styled.h1`
        font-size: 50px;
        font-weight: bold;
        aling-items: center;
    `

    const Subtitle = styled.h2`
        font-size: 30px;
        font-weight: bold;
        margin-top: 10px;
        aling-items: center;
    `

    const Description = styled.p`
        font-size: 20px;
        margin-top: 10px;
        aling-items: center;
    `

    const Button = styled.button`
        background-color: #1F6CAB;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
        border: none;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;

        transition: background-color 0.5s ease-in-out;
        transition: color 0.5s ease-in-out;

        &:hover {
            background-color: #00E6F6;
            color: #082a3a;
        }
    `

    return (
        <Container>
            <Wrapper>
                <Title>Bienvenido a BCR</Title>
                <Subtitle>Subtitle</Subtitle>
                <Description>Description</Description>
                <Button onClick={() => {
                    const gjson = GJSON()
                    const el = gjson[new Date() % gjson.length]
                    console.log(el)
                    navigate('/canvas', {state: {is_loop:el.loop, throws:el.throws, times:el.times, balls:el.balls, name:el.name}})
                    
                    
                }}>Play Demo</Button>
            </Wrapper>
            <Outlet />
        </Container>
    )
}