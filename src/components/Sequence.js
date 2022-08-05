import React, {useState} from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'
import MyAudio from '../Audio_'

export default function Sequence(){
    const [seqItemsList, activeSeqItem] = useState([0,0,0,0,   0,0,0,0,0,  0,0,0,0,0,  0,0,0,0,0,   0,0,0,0,0])

    const [ball, setBall] = useState(0)

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
        
        z-index: 100;
        
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
        width: 300px;
        height: 40px;
        border-radius: 20px;
        border: 2px solid rgba(255, 255, 255, 0.18);
        padding: 10px;
        margin-top: 10px;
        color: #000000;
        background-color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
    `
    const InputCheckBox = styled.input`
        height: 100%;
        width: 100%;
    `

    const CheckBox = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
    `

    const Label = styled.label`
        width: 100%;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #FFFFFF;
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
        const time = new Date()
        var tempo = 140
        var last = time
        var bounces = []
        for(let i = 0; i < seqItemsList.length;){
            if (new Date() - last >= tempo){
                if(seqItemsList[i] === 1){
                    const sound = new Audio('./clave.wav')
                    sound.play()
                    bounces.push((new Date() - time)/1000)
                }
                i++
                last = new Date()
            }
        }
        console.log(bounces)
    }

    const CountBalls = (e) => {
        // console.log(e.target.value)
        setBall(Number(e.target.value))
    }

    const Create = () => {
        console.log(ball)
    }

    // const sound = new Audio('./clave.wav')
    // sound.play()

    return (
        <Container>
            <NavBar/>
            <Wrapper>
                <Box>
                    <Title>Crear Secuencia de Audio</Title>
                    <Form>
                        <FormItem>
                            <Input type="number" min="1" placeholder="Cantidad de pelotas" />
                            <CheckBox>
                                <InputCheckBox type="checkbox" id="lopp" />
                                <Label>Secuencia ciclica?</Label>
                            </CheckBox>
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

                    </Form>
                </Box>
            </Wrapper>
        </Container>
    )
}