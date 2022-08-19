import React, {Component} from 'react';

export default class My_Audio extends Component{
    constructor(){
        super();
        this.file = './clave-mejorada.wav'
    }

    render(){
        return(
            <div>
                <audio id="audio-element">
                    <source src={this.file}></source>
                </audio>
            </div>
        )
    }

    playAudio(global_time, id) {
        console.log(id, "BOUNCE", (new Date() - global_time)/1000)
        document.getElementById("audio-element").play()
        return true
      }
}
