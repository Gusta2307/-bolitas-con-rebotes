import React, { Component } from 'react';
import Ball from "./Ball"
import Ball_Throw from './Ball_throw';
import My_Audio from './Audio_';

 
export default class App extends Component{

  constructor(){
    super();
    this.canvas = null;
    this.ctx = null;

    this.width = null;
    this.height = null

    this.balls = []

    this.time = 0
    this.time_aux = 0
  }


  loop = () => {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const ball1 = new Ball(
      this.ctx, this.width*0.4, this.height/2,
      "rgb(" + "100" + "," + "23" + "," + "1" + ")",
      30,
    ).draw();

    const ball2 = new Ball(
      this.ctx, this.width*0.6, this.height/2,
      "rgb(" + "200" + "," + "200" + "," + "1" + ")",
      30,
    ).draw();

    // Believer
    // var time_aux = [0, 3, 4.8, 5.5, 6, 8.6]

    // Claves
    var time_aux = [0]
    var index = 0

    while (this.balls.length < time_aux.length){
      const size = 15 //this.random(10, 20);

      const x = this.width*0.4 //this.balls.length%2? this.width*0.6: this.width*0.4 //this.random(0 + size, this.width - size);
      const y = this.height/2 //this.random(0 + size, this.height - size);
      var red = this.random(0, 255);
      var green = this.random(0, 255);
      var blue = this.random(0, 255);

      const ball1 = new Ball(
        this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        0, 
        [new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 2.5551751647444356, 1.0551751647444354
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 4.912318021887285, 1.0551751647444354
        )]
      );

      red = this.random(0, 255);
      green = this.random(0, 255);
      blue = this.random(0, 255);

      const ball2 = new Ball(
        this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        0, 
        [new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 1.0551751647444354, 2.3155577404928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 1.4837465933158553, 2.3155577404928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 4.269460879030145, 2.3155577404928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 6.198032307601575, 2.3155577404928653
        )]
      );

      red = this.random(0, 255);
      green = this.random(0, 255);
      blue = this.random(0, 255);

      const ball3 = new Ball(
        this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        0, 
        [new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 0.19803230760157442, 2.1530180604928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 2.7694608790301456, 2.1530180604928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 4.483746593315855, 2.1530180604928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 5.983746593315855, 2.1530180604928653
        ),]
      );

      red = this.random(0, 255);
      green = this.random(0, 255);
      blue = this.random(0, 255);

      const ball4 = new Ball(
        this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        0, 
        [new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 3.6266037361730055, 2.1530180604928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 5.555175164744435, 2.1530180604928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 6.6266037361730055, 2.1530180604928653
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 7.055175164744435, 2.1530180604928653
        ),]
      );

      red = this.random(0, 255);
      green = this.random(0, 255);
      blue = this.random(0, 255);

      const ball5 = new Ball(
        this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        0, 
        [new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 0.8408894504587154, 2.5245373304928656
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 1.9123180218872855, 2.5245373304928656
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 3.1980323076015758, 2.5245373304928656
        ),
        new Ball_Throw(
          -5.46845298527163, 1, 1, 0, 5.340889450458715, 2.5245373304928656
        ),]
      );



      this.balls.push(ball1);
      this.balls.push(ball2);
      this.balls.push(ball3);
      this.balls.push(ball4);
      this.balls.push(ball5);

      // ball.draw()
      // ball.state == 1? ball.update_state_1(this.width, this.height): ball.update_state_0(this.width, this.height);
    }
    this.time_aux == 0 && (this.time_aux = new Date())
    for (let i = 0; i < this.balls.length; i++){
      // console.log(this.balls[i].initial_time)
      this.balls[i].draw();
      if (this.balls[i].list_of_throw.length && this.balls[i].list_of_throw[0].initial_time <= ((new Date() - this.time_aux)/1000)){
        // console.log(this.balls[i].list_of_throw[0].initial_time)
        this.balls[i].apply_throw(this.width, this.height)
      }
    }

    // this.time_aux = (new Date() - this.time_aux)/1000
    
    
    
    // console.log(this.time)
    // this.time += this.time_aux  
    
    requestAnimationFrame(this.loop)
  }


  random(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentDidMount() {
    //set up the canvas
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    // console.log(this.width*0.4, this.width*0.6)
    //start the animation
    this.loop();
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  render() {
    return (
      <>
        <My_Audio></My_Audio>
        <div>
          <canvas ref="canvas" id='canvas' />
        </div>
      </>
    );
  }
}
