import styled from "styled-components"
import NavBar from "./NavBar"
import Gallery_JSON from "./Gallery_JSON"
import {useState} from "react"
import ReactDOM from "react-dom"
import App from "../App"


export default function Gallery(props){
    const Container = styled.div`
        height: 100vh;
        background-color: #082A3A;
    `

    const Wrapper = styled.div`
        height: calc(100vh - 50px);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    `

    const Box = styled.div`
        padding: 20px 20px;
        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 1000;

        // glass effect
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px  0 rgba(0,0,0,0.37);
        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;

        // margin-right: 1vw;
    `
    
    const BoxSeq = styled.div`
        padding: 20px 20px;
        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 1000;

        // glass effect
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px  0 rgba(0,0,0,0.37);
        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;

        margin-right: 1vw;
        margin-bottom: 1vw;
    `

    const BoxItems = styled.div`
        max-width: 85vw;
        max-height: 60vh;
        display: flex;
        flex-wrap: wrap;

        // overflow
        overflow: auto;

        &::-webkit-scrollbar {
            width: .3rem;
        }

        &::-webkit-scrollbar-thumb {
            background: #6fcf97;
            border-radius: 20px;
        }
    `
    
    const TitleBox = styled.div`
        display: absolute;
        justify-content: center;
        justify-self: center;
        align-content: center;
        align-self: center;
        
        &:after {
            width: 100%;
            content: "";
            display: block !important;
            border-bottom: 2px solid #CCC;
            margin-bottom: 2vh;
            // padding-top: .5rem;
        }
    `

    const Title = styled.h1`
        font-size: 50px;
        font-weight: bold;
        aling-items: center;
        color: #FFFFFF;
        margin: 2vh;
    `

    const SubTitle = styled.h2`
        font-size: 30px;
        font-weight: bold;
        aling-items: center;
        color: #FFFFFF;
        margin-right: 0vw !important;
        margin-bottom: 0px;
        margin-top: 0px;
        // margin: 2vh;

        &:after {
            width: 100%;
            content: "";
            display: block !important;
            border-bottom: 3px solid #CCC;
            border-radius: 10px;
            // margin-bottom: 1vh;
            padding-top: .5rem;
        }
    `

    const Text = styled.h3`
        font-size: 20px;
        font-weight: bold;
        aling-items: center;
        color: #FFFFFF;
        margin-bottom: 0px;
    `

    const DemoButton = styled.button`
        font-weight: bold;
        color: #FFF;
        background-color: #1F6CAB;
        cursor: pointer;
        padding: 10px;
        border: none;
        border-radius: 10px;
        margin-top: 2vh;
    `

    const PlayAudio = () =>{
        console.log("AAAAAAAAAAA", props.path)
        // Play audio
        const audio = new Audio(props.path)
        audio.play()
    }

    function PlayButton(props){
        const PlayButton = styled.button`
            font-weight: bold;
            color: #FFF;
            background-color: #af1232;
            cursor: pointer;
            padding: 10px;
            border: none;
            border-radius: 10px;
            margin-left: .5vw;
            
            // if props.path is '' then disable button
            &:disabled {
                color: #000;
                background-color: #CCC;
                cursor: not-allowed;
            }
        `

        const PlayAudio = () =>{
            console.log("AAAAAAAAAAA", props.path)
            // Play audio
            const audio = new Audio(props.path)
            audio.play()
        }

        return(
            <PlayButton disabled={props.disabled} onClick={PlayAudio}>
                Play
            </PlayButton>
        )
    }

    return (
        <Container>
            <NavBar/>
            <Wrapper>
                <Box>
                    <TitleBox>
                        <Title>Galeria</Title>
                    </TitleBox>
                    <BoxItems>
                        {/*create element dynamically*/}
                        {
                            Gallery_JSON().map((item, index, array) => {
                                var disable = item.pathAudio === "" ? true : false
                                return (
                                    <BoxSeq>
                                        <SubTitle>{item.name}</SubTitle>
                                        <Text>Pelotas: {item.balls}</Text>
                                        <Text>Secuencia ciclica: {item.loop}</Text>
                                        <Text>Audio: <PlayButton disabled={disable} path={item.pathAudio} ></PlayButton></Text>
                                        <DemoButton onClick={() => ReactDOM.render((<App loop={item.loop === "NO"?false:true} throws={item.throws} times={item.times}/>), document.getElementById('root'))}>Play Demo</DemoButton>
                                    </BoxSeq>
                                )
                            })
                        }
                    </BoxItems>
                </Box>
            </Wrapper>
        </Container>
    )
}