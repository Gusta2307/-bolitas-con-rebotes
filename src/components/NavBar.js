import {BrowserRouter as Router, Route} from 'react-router-dom'
import React from 'react'
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
    z-index: 999999999999999999999999;
      padding: 0px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: -1;
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
            <Left onClick={() => ReactDOM.render((<Welcome />), document.getElementById('root'))}> 
              <Logo>Bolitas Con Rebote</Logo>
            </Left>
            <Right>
              <Menu>
                <MenuItems onClick={() => ReactDOM.render((<Sequence />), document.getElementById('root'), () => {
                      Particles().forEach((el) => {
                          document.getElementById('root').firstChild.appendChild(el)
                      })
                  })}>Crear Secuencia</MenuItems>
                <MenuItems onClick={() => ReactDOM.render((<AudioLoader />), document.getElementById('root'), () =>{
                    Particles().forEach((el) => {
                      document.getElementById('root').firstChild.appendChild(el)
                  })
                })}>Cargar audio</MenuItems>
                <MenuItems onClick={() => ReactDOM.render((<Gallery />), document.getElementById('root'), () => {
                    Particles().forEach((el) => {
                      document.getElementById('root').firstChild.appendChild(el)
                  })
                })}>Galeria</MenuItems>
              </Menu>
            </Right>
        </Wrapper>
    </Components>
  )
}
