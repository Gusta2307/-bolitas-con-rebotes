import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import NavBar from './NavBar'
import App from '../App'

export default function Sequence(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const [countBalls, setCountBalls] = useState(1);


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
        // opacity: 0;
        // width: 0.1px;
        // height: 0.1px;
        // position: absolute;
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

    const  LabelAudio = styled.label`
        width: 100%;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #FFFFFF;
    `

    const AudioBox = styled.div`


        &:label {
            display: block;
            position: relative;
            width: 200px;
            height: 50px;
            border-radius: 25px;
            background: linear-gradient(40deg, #ff6ec4, #7873f5);
            box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: transform .2s ease-out;
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

    const onClickHandler = () => {
        let data = new FormData();
        data.append('file', selectedFile);

        console.log(checkBoxValue);
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

        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.open("POST", "http://127.0.0.1:8000/welcome")
        // xmlhttp.send()

        xmlhttp.open("POST", 'https://optimizer-apl.herokuapp.com/sound?balls='+countBalls+'&loop='+JSON.stringify(checkBoxValue))
        xmlhttp.send(data);

        
        xmlhttp.onabort = function() {
            console.log("aborted");
        }

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                // redirect to app page with response
                // var response = JSON.parse(this.responseText);
                // var A = new App(null, response.distribution_balls, response.loop, response.balls);
                // ReactDOM.render(A.render(), document.getElementById('root'));
                ReactDOM.render(<App/>, document.getElementById('root'));
            }
        }
    }


    return (
        <Container>
            <NavBar/>
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
                                <InputAudio type="file" accept='.mp3, .wav, .ogg' onInput={(e) => {
                                        // console.log(e);
                                        // still focus
                                        setSelectedFile(e.target.files[0])
                                        setIsFilePicked(true)
                                    }} />
                                <Label id='label'>Elija el archivo</Label>
                            </AudioBox>
                            {isFilePicked ? (
                                <div>
                                    <p>Filename: {selectedFile.name}</p>
                                    <p>Filetype: {selectedFile.type}</p>
                                    <p>Size in bytes: {selectedFile.size}</p>
                                    <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <p>Select a file to show details</p>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button onClick={onClickHandler}>Crear</Button>
                        </FormItem>

                    </Form>
                </Box>
            </Wrapper>
        </Container>
    )
}