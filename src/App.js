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

    // this.time = 0
    this.time_aux = 0

    this.tn = 0
    this.t0 = 0

    this.animation_loop = true
  }


  loop = () => {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const ball1 = new Ball(
      -1,this.ctx, this.width*0.4, this.height/2,
      "rgb(" + "100" + "," + "23" + "," + "1" + ")",
      30,
    ).draw();

    const ball2 = new Ball(
      -1,this.ctx, this.width*0.6, this.height/2,
      "rgb(" + "200" + "," + "200" + "," + "1" + ")",
      30,
    ).draw();
    
    //Reggeton reinaldo
    // var throws = [[[5.467519199250946, 1, 1, 0, 1.4837072200277996, 0], [5.467519199250946, 1, 1, 0, 2.5551357914563795, 0], [5.467519199250946, 1, 1, 0, 4.912278648599229, 0], [5.837291666666713, 1, 2, 0, 6.006817070432187, 0]], [[5.467519199250946, 1, 1, 0, 0.19799293431351866, 0]], [[5.467519199250946, 1, 1, 0, 0.8408500771706597, 0], [5.467519199250946, 1, 1, 0, 1.9122786485992298, 0], [5.837291666666657, 1, 2, 0, 3.221102784717904, 0], [5.467519199250946, 1, 1, 0, 5.34085007717066, 0], [5.467519199250946, 1, 1, 0, 6.197992934313519, 0]], [[5.467519199250946, 1, 1, 0, 1.0551357914563797, 0], [5.467519199250946, 1, 1, 0, 2.7694215057420895, 0], [5.467519199250946, 1, 1, 0, 3.6265643628849498, 0], [5.837291666666713, 1, 2, 0, 4.506817070432187, 0], [5.467519199250946, 1, 1, 0, 6.62656436288495, 0]]]
    
    //Claves mio
    // var throws = [[[5.467519199250946, 1, 1, 0, 0.5821199157420897, 0], [5.9457602904641655, 1, 2, 0, 1.7951602507617817, 0], [5.467519199250946, 1, 1, 0, 4.668831935742089, 0]], [[6.8312990965411124, 1, 2, 0, 2.202220010403647, 0], [6.451782449799169, 1, 2, 0, 6.322110446123968, 0]], [[5.467519199250946, 1, 1, 0, 3.949013345742089, 0], [5.467519199250946, 1, 1, 0, 5.040351215742089, 0], [5.692749210796667, 1, 2, 0, 6.773448064576631, 0]], [[5.819254723389722, 1, 2, 0, 0.023740887501022157, 0], [5.467519199250946, 1, 1, 0, 5.73694984574209, 0]]]

    // CLAVES FERNAN
    var throws = [[[6.704793529466665, 1, 2, 0, 0.43334327204726003, 0]], [[5.467519199250946, 1, 1, 0, 1.3251584657420896, 0]], [[6.704793529466665, 1, 2, 0, 0.99062218204726, 0]]]
    this.tn = 2.39165533
    this.t0 = 0.23219955

    // REGUETON FERNAN
    // var throws = [[[5.467519199250946, 1, 1, 0, 1.1858387357420896, 0], [5.467519199250946, 1, 1, 0, 2.39327638574209, 0], [6.1987713701316665, 1, 2, 0, 3.664686931356391, 0]], [[6.451782449799167, 1, 2, 0, 0.8189811961239685, 0], [5.467519199250946, 1, 1, 0, 3.1595348857420893, 0], [5.467519199250946, 1, 1, 0, 4.0883330657420895, 0], [5.467519199250946, 1, 1, 0, 5.0867911157420895, 0]], [[5.467519199250946, 1, 1, 0, 1.4876981457420897, 0], [5.467519199250946, 1, 1, 0, 2.6951357957420896, 0], [6.7047934749852764, 1, 2, 0, 4.403955520203333, 0]]]
    // this.tn = 5.80498866

    var is_loop = true
    

    while (this.balls.length < throws.length){
      const size = 15 //this.random(10, 20);

      const x = this.balls.length%2? this.width*0.6: this.width*0.4 //this.random(0 + size, this.width - size);
      const y = this.height/2 //this.random(0 + size, this.height - size);
      
      var red = this.random(0, 255);
      var green = this.random(0, 255);
      var blue = this.random(0, 255);

      const ball = new Ball(
        this.balls.length, this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        this.balls.length%2, 
        this.load_throw(throws[this.balls.length])
      );

      is_loop && ball.calculate_initial_pos(this.t0, this.tn)

      this.balls.push(ball);
    }

    this.time_aux === 0 && (this.time_aux = new Date())

    is_loop? this.loop_problem(): this.default_problem()

    requestAnimationFrame(this.loop)
  }

  default_problem(){
    for (let i = 0; i < this.balls.length; i++){
      this.balls[i].draw()
      let current_time = ((new Date() - this.time_aux)/1000)
      if (this.balls[i].list_of_throw.length > this.balls[i].index_list && this.balls[i].list_of_throw[this.balls[i].index_list].initial_time <= current_time){
        this.balls[i].global_time = this.time_aux
        this.balls[i].apply_throw(this.width, this.height)
      }
    }
  }

  loop_problem(){
    for (let i = 0; i < this.balls.length; i++){
      this.balls[i].draw()
      var current_time = ((new Date() - this.time_aux)/1000) + this.t0

      if ((this.balls[i].list_of_throw.length > this.balls[i].index_list) && 
          this.balls[i].index_list >= 0 && 
          Math.abs(current_time - this.balls[i].list_of_throw[this.balls[i].index_list].initial_time) <= 0.1){
        this.balls[i].global_time = this.time_aux
        this.balls[i].is_move = true
        this.balls[i].apply_throw(this.width, this.height)
      }
      else{
        if (this.balls[i].is_move){
          this.balls[i].global_time = this.time_aux
          this.balls[i].apply_throw(this.width, this.height)
        }
      }
    }

    current_time > this.tn && (this.time_aux = new Date()) && this.reset_index() && console.log("RESET")
  }

  reset_index(){
    for (let i = 0; i < this.balls.length; i++){
      this.balls[i].index_list = this.balls[i].index_list%this.balls[i].list_of_throw.length
    }
    return true
  }

  reset_throws(){
    for (let i = 0; i < this.balls.length; i++){
      for (let j = 0; j < this.balls[i].list_of_throw.length; j++){
        this.balls[i].list_of_throw[j].is_done = false
      }
    }
    return true
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
        throws_list[i][4], // initial time
        throws_list[i][5]  // total time
      ))
    }
    return result_list
  }

  render() {
    return (
      <>
        <div>
        <My_Audio></My_Audio>
          <canvas ref="canvas" id='canvas' />
        </div>
      </>
    );
  }
}
