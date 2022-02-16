import React, { Component } from 'react';
import Ball from "./Ball"
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
  }


  loop = () => {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const ball1 = new Ball(
      this.ctx, this.width*0.4, this.height/2, 0, 0,
      "rgb(" + "100" + "," + "23" + "," + "1" + ")",
      30,
      this.balls.length%2
    ).draw();

    const ball2 = new Ball(
      this.ctx, this.width*0.6, this.height/2, 0, 0,
      "rgb(" + "200" + "," + "200" + "," + "1" + ")",
      30,
      this.balls.length%2
    ).draw();

    // Believer
    // var time_aux = [0, 3, 4.8, 5.5, 6, 8.6]

    // Claves
    var time_aux = [0, 3, 6, 9.5, 11 ]
    var index = 0

    while (this.balls.length < time_aux.length){
      const size = 15 //this.random(10, 20);

      const x = this.width*0.4 //this.balls.length%2? this.width*0.6: this.width*0.4 //this.random(0 + size, this.width - size);
      const y = this.height/2 //this.random(0 + size, this.height - size);

      const speedX = 0//this.random(-7, 7);
      const speedY = 0//this.random(-7, 7);

      const red = this.random(0, 255);
      const green = this.random(0, 255);
      const blue = this.random(0, 255);

      const ball = new Ball(
        this.ctx, x, y, speedX, speedY,
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        0,
        time_aux[index]
      );
      index += 1


      this.balls.push(ball);

      // ball.draw()
      // ball.state == 1? ball.update_state_1(this.width, this.height): ball.update_state_0(this.width, this.height);
    }

    for (let i = 0; i < this.balls.length; i++){
      console.log(this.balls[i].initial_time)
      if (this.balls[i].initial_time <= this.time){
        this.balls[i].draw();
        this.balls[i].state == 1? this.balls[i].update_state_1(this.width, this.height): this.balls[i].update_state_0(this.width, this.height);

        // this.time += this.balls[0].state == 0? 0.1: 0.2
      }
      // this.balls[i].collisionDetect(this.balls);
      // this.sleep(500)
    }
    this.time += 0.15//this.balls[0].state == 0? 0.1: 0.25
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
