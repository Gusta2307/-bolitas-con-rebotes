import React, {Component} from 'react';
import sonud_ball from './Sound/clave_mejorada.wav'

export default class My_Audio extends Component{
    constructor(){
        super();
        this.file = './clave-mejorada.wav'
        this.audio = new Audio(this.file)
    }

    componentDidMount(){
        this.audio = new Audio(this.file)
    }

    render(){
        return(
            <div>
                <audio id="audio-element">
                    <source src={sonud_ball}/>
                </audio>
            </div>
        )
    }

    playAudio(global_time, id) {
        console.log(id, "BOUNCE", (new Date() - global_time)/1000)
        console.log(document.getElementById("audio-element"))
        document.getElementById("audio-element").play()
        // new Audio(require(this.file)).play()
        return true
      }
}
