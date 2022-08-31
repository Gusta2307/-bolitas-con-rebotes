import React, {useState} from 'react'
import styled from 'styled-components'
import Loading from './Loading'
import NavBar from './NavBar'
import {urlAPI} from './Config'
import Particles from './Particles'
import sonud_ball from '../Sound/clave_mejorada.wav'
import { useNavigate } from "react-router-dom";

const P = Array.from({length: 60}, (v, k) => k).map((v, k) => {
    return (
        <Particles 
            key={k} 
            _key={k} 
            x={ Math.random() * (k % 2 === 0 ? -11 : 11)}
            y={ Math.random() * 12} 
        />)
})

const Container = styled.div`
    height: 100vh;
    background-color: #082A3A;
`

export default function Sequence(){
    const navigate = useNavigate();

    const [seqItemsList, activeSeqItem] = useState([0,0,0,0,   0,0,0,0,0,  0,0,0,0,0,  0,0,0,0,0,   0,0,0,0,0])
    const [bpmValue, setBpmValue] = useState(120)
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const [countBalls, setCountBalls] = useState(1);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(null)

    const [times, setTimes] = useState([])

    const [errorMSG, setErrorMSG] = useState(false)



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
        
        // glass effect
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px  0 rgba(0,0,0,0.37);
        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;


        z-index: 1000;
    `


    const Title = styled.h1`
        font-size: 50px;
        font-weight: bold;
        aling-items: center;
        color: #FFFFFF;
    `

    const Form = styled.div`
        :only-child {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    `

    const FormItem = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
    `

    const Input = styled.input`
        width: ${props => props.width? props.width: " 4vw"};
        height: 2vh;
        border-radius: 10px;
        border: 2px solid rgba(255, 255, 255, 0.18);
        padding: 10px;
        margin-top: 10px;
        color: #000000;
        background-color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
        margin-left: 1vw;
    `
    const InputCheckBox = styled.input`
        height: 100%;
        width: 100%;
    `

    const CheckBox = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 2vw;
    `

    const Label = styled.label`
        // width: 100%;
        // height: 100%;
        font-size: 2rem;
        font-weight: bold;
        color: #FFFFFF;
    `

    const LabelERROR = styled.label`
        width: 100%;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #FF0000;

        display: ${props => props.showMsg? 'block' : 'none'}
    `

    const Seq = styled.div`
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-right: 10px;
    `

    const SeqItem = styled.div`
        background-color: ${(props) => seqItemsList[props.id]? '#0AFCA0' : '#0F6CA0'};
        height: 2em;
        width: 2em;
        display: flex;
        flex-direction: row;
        margin: 2px;
        border-radius: 10%;

        // transition: background-color 0.5s;

        //hover
        &:hover {
            background-color: #0AFCA0;
        }
    `

    const Button = styled.button`
        background-color: #1F6CAB;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
        border: none;
        border-radius: 10px;
        margin-top: 10px;
        cursor: pointer;
    `

    const TactiveSeqItem = (index) => {
        activeSeqItem(seqItemsList.map(
            (item, i) => i === index ? Number(!item) : item
        ))
    }

    const PlaySounds = () => {
        var _sampleRate = 44100;
        var _minuteInSeconds = 60;
        var _beatsPerMinute =  bpmValue;
        var _totalSteps = seqItemsList.length;
        var _currentStep = 0;
        var _isPlaying;

        var initialTime;

        var calculateBPM = function() {

            return Math.round(((_sampleRate * _minuteInSeconds) / (_beatsPerMinute * _totalSteps)) / _totalSteps);      
        }

        setTimes([])

        const playAudio = function() {
            if(_currentStep < _totalSteps) {
                if(seqItemsList[_currentStep] === 1) {
                    setTimes(times => [...times,(new Date() - initialTime)/1000])
                    const sound = new Audio(sonud_ball)
                    sound.play()
                }
                _currentStep++;
            }else if(_currentStep >= _totalSteps){
                _currentStep = 0;
                clearInterval(_isPlaying);
            }
        }

        initialTime = new Date();
        _isPlaying = setInterval(function() {

            playAudio()

          }, calculateBPM());
    }

    const Create = () => {

        // obtener secuencia de tiempos
        if(times.length > 0) {
            var xmlhttp = new XMLHttpRequest();
            setLoading(true)
            xmlhttp.open("POST", urlAPI+'sequence?times='+JSON.stringify(times)+'&balls='+countBalls+'&loop='+JSON.stringify(Number(checkBoxValue)))
            xmlhttp.send();


            xmlhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    // redirect to app page with response
                    setLoading(false);
                    var response = JSON.parse(this.responseText);
                    if(response.prob_sol === 1){
                        setErrorMSG(false)
                        navigate('/canvas', {state: {
                            is_loop:response.loop?"SI":"NO", 
                            balls:response.balls,
                            name: name,
                            throws:response.distribution_balls, 
                            times:response.times}})
                        // ReactDOM.render(<App times={response.times} loop={response.loop} throws={response.distribution_balls}/>, document.getElementById('root'));
                    }
                    else{
                        setErrorMSG(true)
                    }
                }
            }

            xmlhttp.onerror = function() {
                setLoading(false)
                setErrorMSG(true)
            }
        }
        else{
            setErrorMSG(true)
        }
    }


    return (
        <Container>
            {
                P.map((el) => {
                    return el
                })
            }
            <NavBar/>
            <Loading loading={loading}/>
            <Wrapper>
                <Box>
                    <Title>Crear Secuencia de Audio</Title>
                    <Form>
                        <FormItem>
                            <Label>Nombre de la secuencia:</Label>
                            <Input style={{width: '18vw'}} type="text" placeholder="Nombre de la secuencia" value={name} onChange={(e) => {setName(e.target.value)}}/>
                        </FormItem>
                        <FormItem>
                            <FormItem>
                                <Label>Cantidad de pelotas:</Label>
                                <Input type="number" min="1" value={countBalls} onChange={(e) => setCountBalls(e.target.value)} />
                            </FormItem>
                            <CheckBox>
                                <InputCheckBox type="checkbox" checked={checkBoxValue} onChange={(e) => {setCheckBoxValue(e.target.checked)}} />
                                <Label>Secuencia ciclica?</Label>
                            </CheckBox>
                            <FormItem>
                                <Label>BPM:</Label>
                                <Input width={"5vw"} type="number" min="1" value={bpmValue} onChange={(e) => setBpmValue(e.target.value)} placeholder="BPM" />
                            </FormItem>
                        </FormItem>
                        <FormItem>
                            <Seq>
                                <SeqItem id='0' onClick={() => TactiveSeqItem(0)}/>
                                <SeqItem id='1' onClick={() => TactiveSeqItem(1)}/>
                                <SeqItem id='2' onClick={() => TactiveSeqItem(2)}/>
                                <SeqItem id='3' onClick={() => TactiveSeqItem(3)}/>
                                <SeqItem id='4' onClick={() => TactiveSeqItem(4)}/>
                                <SeqItem id='5' onClick={() => TactiveSeqItem(5)}/>
                                <SeqItem id='6' onClick={() => TactiveSeqItem(6)}/>
                                <SeqItem id='7' onClick={() => TactiveSeqItem(7)}/>
                                <SeqItem id='8' onClick={() => TactiveSeqItem(8)}/>
                                <SeqItem id='9' onClick={() => TactiveSeqItem(9)}/>
                                <SeqItem id='10' onClick={() => TactiveSeqItem(10)}/>
                                <SeqItem id='11' onClick={() => TactiveSeqItem(11)}/>
                                <SeqItem id='12' onClick={() => TactiveSeqItem(12)}/>
                                <SeqItem id='13' onClick={() => TactiveSeqItem(13)}/>
                                <SeqItem id='14' onClick={() => TactiveSeqItem(14)}/>
                                <SeqItem id='15' onClick={() => TactiveSeqItem(15)}/>
                                <SeqItem id='16' onClick={() => TactiveSeqItem(16)}/>
                                <SeqItem id='17' onClick={() => TactiveSeqItem(17)}/>
                                <SeqItem id='18' onClick={() => TactiveSeqItem(18)}/>
                                <SeqItem id='19' onClick={() => TactiveSeqItem(19)}/>
                                <SeqItem id='20' onClick={() => TactiveSeqItem(20)}/>
                                <SeqItem id='21' onClick={() => TactiveSeqItem(21)}/>
                                <SeqItem id='22' onClick={() => TactiveSeqItem(22)}/>
                                <SeqItem id='23' onClick={() => TactiveSeqItem(23)}/>
                            </Seq>
                            <Button onClick={PlaySounds}>Play</Button>
                        </FormItem>
                        <FormItem>
                            <Button onClick={Create}>Crear</Button>
                        </FormItem>
                        <LabelERROR showMsg={errorMSG}>No se pudo crear la secuencia.</LabelERROR>
                    </Form>
                </Box>
            </Wrapper>
        </Container>
    )
}