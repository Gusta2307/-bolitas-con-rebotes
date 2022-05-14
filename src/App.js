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

  //   var throws = [
  //     [[-5.467519199250946, 1, 1, 0, 1.4837072200277996, 0], [-5.837291666666657, 1, 2, 0, 2.578245641860764, 0], [-5.83729166666666, 1, 2, 0, 4.935388499003614, 0]], 
  
  //     [[-5.837291666666659, 1, 2, 0, 0.863959927575044, 0], [-5.467519199250946, 1, 1, 0, 3.19799293431352, 0], [-5.467519199250946, 1, 1, 0, 6.62656436288495, 0]], 
      
  //     [[-5.467519199250946, 1, 1, 0, 0.19799293431351866, 0], [-5.837291666666713, 1, 2, 0, 4.506817070432187, 0]], 
      
  //     [[-5.467519199250946, 1, 1, 0, 1.0551357914563797, 0], [-5.467519199250946, 1, 1, 0, 2.7694215057420895, 0], [-5.83729166666666, 1, 2, 0, 4.292531356146474, 0], [-5.467519199250946, 1, 1, 0, 6.197992934313519, 0], [-5.467519199250946, 1, 1, 0, 7.0551357914563795, 0]]
  // ]

    var throws = [[[-5.467519199250946, 1, 1, 0, 1.4837072200277996, 0], [-5.467519199250946, 1, 1, 0, 2.5551357914563795, 0], [-5.467519199250946, 1, 1, 0, 4.912278648599229, 0], [-5.837291666666713, 1, 2, 0, 6.006817070432187, 0]], [[-5.467519199250946, 1, 1, 0, 0.19799293431351866, 0]], [[-5.467519199250946, 1, 1, 0, 0.8408500771706597, 0], [-5.467519199250946, 1, 1, 0, 1.9122786485992298, 0], [-5.837291666666657, 1, 2, 0, 3.221102784717904, 0], [-5.467519199250946, 1, 1, 0, 5.34085007717066, 0], [-5.467519199250946, 1, 1, 0, 6.197992934313519, 0]], [[-5.467519199250946, 1, 1, 0, 1.0551357914563797, 0], [-5.467519199250946, 1, 1, 0, 2.7694215057420895, 0], [-5.467519199250946, 1, 1, 0, 3.6265643628849498, 0], [-5.837291666666713, 1, 2, 0, 4.506817070432187, 0], [-5.467519199250946, 1, 1, 0, 6.62656436288495, 0]]]

    while (this.balls.length < throws.length){
      const size = 15 //this.random(10, 20);

      const x = this.width*0.4 //this.balls.length%2? this.width*0.6: this.width*0.4 //this.random(0 + size, this.width - size);
      const y = this.height/2 //this.random(0 + size, this.height - size);
      
      var red = this.random(0, 255);
      var green = this.random(0, 255);
      var blue = this.random(0, 255);

      const ball = new Ball(
        this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        0, 
        this.load_throw(throws[this.balls.length])
      );

      this.balls.push(ball);
    }
    this.time_aux == 0 && (this.time_aux = new Date())
    for (let i = 0; i < this.balls.length; i++){
      this.balls[i].draw();
      let current_time = ((new Date() - this.time_aux)/1000)
      if (this.balls[i].list_of_throw.length && this.balls[i].list_of_throw[0].initial_time <= current_time){
        
        if (!this.balls[i].is_init){
          console.log("TSS", i, this.balls[i].list_of_throw[0].initial_time, current_time)
          this.balls[i].init_prop()
        }
        this.balls[i].apply_throw(this.width, this.height)
      }
    }    
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


    // console.log("WH", this.width*0.4, this.width*0.6, this.height/2)
  }

  load_throw(throws_list){
    var result_list = []
    for(let i = 0; i < throws_list.length; i++){
      result_list.push(new Ball_Throw(
        throws_list[i][0], // v0
        throws_list[i][1], // change hand
        throws_list[i][2], // bounce amount
        throws_list[i][3], // catch ball
        throws_list[i][4],  // initial time
        throws_list[i][5]  // total time
      ))
    }
    return result_list
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
