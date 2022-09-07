import React from 'react'
import { Outlet, Link } from "react-router-dom";
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import Sequence from './Sequence'
import AudioLoader from './AudioLoader'
import Gallery from './Gallery'
import Welcome from '../Welcome'
import {Particles} from './Particles'

export default function NavBar(){
  const Components = styled.div`
    background-color: #082A3A;
    border-bottom: 2px solid GRAY;
  `
    
    
  const Wrapper = styled.div`
    z-index: 99999999;
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `


  const Logo = styled.h1`
    font-weight: bold;
    color: #FFFFFF;
  `

  const Left = styled.div`
    display: flex;
    cursor: pointer;
    margin-left: 20px;
  `

  const Right = styled.div`
    font-weight: bold;
  `

  const Menu = styled.ul`
    display: flex;
    list-style: none;
  `

  const MenuItems = styled.li`
    margin-right: 30px;
    font-size: 20px;
    color: #8099E9;
    cursor: Pointer;
  `

  return (
    <Components>
        <Wrapper>
            <Link to="/bolitas-con-rebotes/" style={{textDecoration: "none",}}>
              <Left> 
                <Logo>Bolitas Con Rebote</Logo>
              </Left>
            </Link>
            <Right>
              <Menu>
                <Link to="/bolitas-con-rebotes/sequence" style={{textDecoration: "none",}}>
                  <MenuItems>Crear Secuencia</MenuItems>
                </Link>
                <Link to="/bolitas-con-rebotes/audio_loader" style={{textDecoration: "none",}}>
                  <MenuItems>Cargar audio</MenuItems>
                </Link >
                <Link to="/bolitas-con-rebotes/gallery" style={{textDecoration: "none",}}>
                  <MenuItems>Galeria</MenuItems>
                </Link>
              </Menu>
            </Right>
            <Outlet />
        </Wrapper>
    </Components>
  )
}
