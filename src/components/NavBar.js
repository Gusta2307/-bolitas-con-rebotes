import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import Sequence from './Sequence'
import AudioLoader from './AudioLoader'

export default function NavBar(){
  const Components = styled.div`
    background-color: #082A3A;
    border-bottom: 2px solid GRAY;
  `
  

  const Wrapper = styled.div`
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
            <Left> 
              <Logo>Bolitas Con Rebote</Logo>
            </Left>
            <Right>
              <Menu>
                <MenuItems onClick={() => ReactDOM.render((<Sequence />), document.getElementById('root'))}>Crear Secuencia</MenuItems>
                <MenuItems onClick={() => ReactDOM.render((<AudioLoader />), document.getElementById('root'))}>Cargar audio</MenuItems>
                {/* <MenuItems>Descargar Gif</MenuItems> */}
                {/* <MenuItems>Algo 2</MenuItems> */} 
              </Menu>
            </Right>
        </Wrapper>
    </Components>
  )
}
