import React, {Component} from 'react';

export default class My_Audio extends Component{
    constructor(){
        super();
        this.file = './ping-pong-ball.mp3'
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

    playAudio() {
        const audioEl = document.getElementById("audio-element")
        console.log(audioEl)
        // audioEl.autoPlay = true
        let _audio = new Audio(this.file)
        _audio.play()
        // audioEl.play()
      }
}
