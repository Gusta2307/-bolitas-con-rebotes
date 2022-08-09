import styled from "styled-components";


export default function Loading(props) {
    const Container = styled.div`
        height: 100vh;
        width: 100vw;
        margin: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000000;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
    `
        
    const Box = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const Circle = styled.div`
        width: 3vw;
        height: 3vw;
        background-color: ${props => props.color};
        border-radius: 100%;
        margin: 2vw;
        background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
        animation: bounce 1.5s 0.5s linear infinite;
        animation-delay: ${props => props.delay};

        @keyframes bounce {
            0%, 50%, 100% {
                transform: scale(1);
                filter: blur(0px);
            }
            25% {
                transform: scale(0.6);
                filter: blur(3px);
            }
            75% {
                filter: blur(3px);
                transform: scale(1.4);
            }
        }
    `

    return(
        props.loading ?
        <Container>
            <Box>
                <Circle color="yellow" delay="0s"/>
                <Circle color="red" delay="0.1s"/>
                <Circle color="blue" delay="0.2s"/>
                <Circle color="violet" delay="0.3s"/>
            </Box>
        </Container>:<></>
    )
}