import styled from 'styled-components';
import ReactDOM from 'react-dom'
import App from '../App'


export default function Canvas_Menu(props) {
    const Container = styled.div`
        // width: auto;
        // height: auto;
        background-color: #000;
    `        
        
    const Wrapper = styled.div`
        width: fit-content;
        height: fit-content;
        align-self: right;
        display: flex;
        z-index: 10000000;
        background-color: #000;
        flex-direction: row;
        padding: 1.5vh;
        margin-left: auto;
    `

    const Items = styled.div`
        background-color: transparent;
        margin-right: 1vw;
        padding: .5vw;
        border: 2px solid rgb(128, 128, 128 );
        border-radius: 15px;
        cursor: pointer;
    `
        
    const Label = styled.label`
        font-size: 20px;
        cursor: pointer;
        font-weight: bold;
        color: #FFF;
    `

    const LabelDownload = styled(Label)`
        color: ${props => props.video != null? '#FFF' : 'rgb(128, 128, 128)'};
        cursor: ${props => props.video != null? 'pointer' : 'not-allowed'};
    `

    const donwloadHandler = () => {
        // Download video
        if (props.video != null) {
            const link = document.createElement('a');
            link.href = props.video;
            link.setAttribute('download', 'video.webm');
            link.click();
        }
    }
    
    const resetHandler = () => {
        props.onReset()
    }

    return (
        <Container>
            <Wrapper>
                <Items>
                    <Label onClick={resetHandler} >Reset</Label>
                </Items>
                <Items>
                    <LabelDownload download video={props.video} href={props.video} onClick={donwloadHandler}>Download</LabelDownload>
                </Items>
            </Wrapper>
        </Container>
    )
}