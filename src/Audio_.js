import React, {Component} from 'react';

export default class My_Audio extends Component{
    constructor(){
        super();
        this.file = '../public/ball.mp3'
    }

    render(){
        return(
            <div>
                <audio className="audio-element" autoplay={"true"} muted={"muted"}>
                    <source src={this.file}></source>
                </audio>
            </div>
        )
    }

    playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.mute = true
        audioEl.play()
      }
}
