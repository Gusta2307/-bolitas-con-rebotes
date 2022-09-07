import styled from 'styled-components';
import {vw} from '../utils'
import { useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';


export default function Canvas_Menu(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const Container = styled.div`
        // position: absolute;
    `

    const Wrapper = styled.div`
        // position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-color: #000;
        padding: 1.5vh;
    `

    const Left = styled.div`
        display: flex;
        flex-direction: column;
        align-self: left;
        border: 2px solid rgb(128, 128, 128);
        border-radius: 10px;
        padding: 1vh;
        float: left;
    `

    const Center = styled.div`
        max-height: 20vh;
        max-weight: 40vw;
        display: flex;
        flex-direction: row;
        // flex-wrap: wrap;
        padding: 1vh
    `

    const BoxSolution = styled.div`
        width: 2.5rem;
        height: 2.5rem;

        margin-left: 0.5rem;

        background-color: ${(props) => props.active? 'rgb(167,154,65)' : 'rgb(198, 48, 238)'}; 

        cursor: ${(props) => props.active? 'not-allowed' : 'pointer'}; 

        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 10px;

        font-weight: bold;
        color: #FFF;
        font-size: 20px;
        text-align: center;
    `

    const Right = styled.div`
        display: flex;
        right: 0;
    `

    const Items = styled.div`
        background-color: transparent;
        margin-right: 1vw;
        padding: .5vw;
        border: 2px solid rgb(128, 128, 128);
        border-radius: 15px;
        cursor: pointer;
    `

    const Label = styled.label`
        font-size: 20px;
        cursor: pointer;
        font-weight: bold;
        color: #FFF;
    `

    const Text = styled.label`
        font-size: 20px;
        font-weight: bold;
        color: #FFF;
        margin-bottom: 1vh;
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
            link.setAttribute('download', props.name+'.webm');
            link.click();
        }
    }

    const resetHandler = () => {
        props.onReset()
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Text>Nombre: {props.name}</Text>
                    <Text>Cantidad de pelotas: {props.balls}</Text>
                    <Text>Secuencia Cíclica: {props.loop?"SI":"NO"}</Text>
                </Left>
                <Center>
                    {
                        // console.log(props.solutions)
                        props.solutions.map((el, index) =>{
                            return (<BoxSolution
                            active={index === props.sol_act? true:false}
                            key={index}
                            onClick={() =>{
                                    navigate('/bolitas-con-rebotes/canvas', {
                                        state: {
                                            is_loop: props.loop?"SI":"NO",
                                            balls: props.balls,
                                            name: props.name,
                                            sol_active: index,
                                            throws: props.solutions[index],
                                            times: props.times,
                                            solutions: props.solutions
                                        }
                                    })
                                    // reload page
                                    // window.location.reload();
                                    
                                }
                            }
                            >
                                {index+1}
                            </BoxSolution>)
                        })
                    }
                </Center>
                <Right>
                    <Items>
                        <Label onClick={resetHandler} >Reset</Label>
                    </Items>
                    <Items>
                        <LabelDownload download video={props.video} href={props.video} onClick={donwloadHandler}>Download</LabelDownload>
                    </Items>
                </Right>
            </Wrapper>
        </Container>
    )
}