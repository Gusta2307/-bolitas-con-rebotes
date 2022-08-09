import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import NavBar from './NavBar'
import Loading from './Loading'
import App from '../App'
import {urlAPI} from './Config'

export default function Sequence(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const [countBalls, setCountBalls] = useState(1);
    const [loading, setLoading] = useState(false);

    const [errorMSG, setErrorMSG] = useState(false)

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

    const Form = styled.div`data
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
        margin-bottom: 1vh;
    `

    const InputBall = styled.input`
        width: 50px;
        // height: 40px;
        border-radius: 10px;
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

    const InputAudio = styled.input`
        display: inline-block;
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 50px;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
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

    
    const LabelERROR = styled.label`
        width: 100%;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #FF0000;

        display: ${props => props.showMsg? 'block' : 'none'}
    `

    const  LabelAudio = styled.label`
        position: relative;
        z-index: 0;
        display: inline-block;
        width: 100%;
        cursor: pointer;
        color: #000;
        padding: 10px 0;
        text-transform:uppercase;
        font-size:15px;
        font-weight: bold;
        // margin-left: 10px;
        `
        
    const AudioBox = styled.div`
        background: #75fd92;
        position: relative;
        // width: 150px;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
        margin-right: 1vw;
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

    const onClickHandler = () => {
        let data = new FormData();
        data.append('file', selectedFile);

        console.log(checkBoxValue, data);
        //http://127.0.0.1:8000
        //https://optimizer-apl.herokuapp.com
        // fetch('http://127.0.0.1:8000/sound?balls='+countBalls+'&loop='+JSON.stringify(checkBoxValue), {
        //     method: 'POST',
        //     body: data,
        //     mode: 'no-cors',
        // }).then(res => {
        //     console.log(res);
        // })

        // fetch('http://127.0.0.1:8000/welcome', {
        //     method: 'GET',
        //     mode: '',
        // }).then(res => {
        //     console.log(res);
        // })
        setLoading(true);
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", urlAPI+'sound?balls='+countBalls+'&loop='+JSON.stringify(checkBoxValue))
        xmlhttp.send(data);

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                // redirect to app page with response
                setLoading(false);
                var response = JSON.parse(this.responseText);
                if(response.prob_sol === 1){
                    ReactDOM.render(<App loop={response.loop} throws={response.distribution_balls}/>, document.getElementById('root'));
                }
                else{
                    setErrorMSG(true)
                }

            }
        }
    }


    return (
        <Container>
            <NavBar/>
            <Loading loading={loading}/>
            <Wrapper>
                <Box>
                    <Title>Cargar Secuencia de Audio</Title>
                    <Form>
                        <FormItem>
                            <div>
                                <Label>Cantidad de pelotas: </Label>
                                <InputBall type="number" min="1" value={countBalls} onChange={(e) => {
                                    setCountBalls(e.target.value)}
                                    } placeholder="" />
                            </div>
                            <CheckBox>
                                <InputCheckBox type="checkbox" value={checkBoxValue} onChange={(e) => {setCheckBoxValue(e.target.checked)}} />
                                <Label>Secuencia ciclica?</Label>
                            </CheckBox>
                        </FormItem>
                        <FormItem>
                            <AudioBox>
                                <InputAudio type="file" accept='.mp3, .wav, .ogg' placeholder='Hola' onInput={(e) => {
                                        // console.log(e);
                                        // still focus
                                        setSelectedFile(e.target.files[0])
                                        setIsFilePicked(true)
                                    }} />
                                <LabelAudio >Elija el archivo</LabelAudio>
                            </AudioBox>
                            {isFilePicked ? ( <div><Label>{selectedFile.name}</Label></div> ) : null}
                                {/* <div>
                                    <p>Filename: {selectedFile.name}</p>
                                    <p>Filetype: {selectedFile.type}</p>
                                    <p>Size in bytes: {selectedFile.size}</p>
                                    <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                    </p>
                                </div>
                            ) :<></>} */}
                        </FormItem>
                        <FormItem>
                            <Button onClick={onClickHandler}>Crear</Button>
                        </FormItem>
                        <LabelERROR showMsg={errorMSG}>No se pudo crear la secuencia.</LabelERROR>
                    </Form>
                </Box>
            </Wrapper>
        </Container>
    )
}