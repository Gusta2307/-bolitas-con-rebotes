import React, { Component } from 'react';
import Ball from "./Ball"
import Ball_Throw from './Ball_throw';
import My_Audio from './Audio_';
import NavBar from './components/NavBar';
// import {startRecording, stopRecording} from './components/GifWritten';
// import Juggler from './components/Juggler'
import Canvas_Menu from './components/Canvas_Menu';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      video: null,
    }
    
    this.chunks = []
    this.rec = null
    this.canvas = null;
    this.ctx = null;
    
    this.width = null;
    this.height = null
    
    this.balls = []
    
    // this.time = 0
    this.time_aux = 0
    
    this.t0 = 0//props.times[0]
    this.tn = 0//props.times[props.times.length - 1]
    
    this.throws = props.throws? props.throws: [[[5.467519199250946, 1, 1, 0, 0.6982196957420896, 0], [5.692749210796666, 1, 2, 0, 1.7347179045766312, 0], [5.467519199250946, 1, 1, 0, 4.111553025742089, 0], [5.467519199250946, 1, 1, 0, 5.110011075742089, 0], [5.467519199250946, 1, 1, 0, 6.45676844574209, 0], [5.467519199250946, 1, 1, 0, 8.337584775742089, 0]], [[5.467519199250946, 1, 1, 0, 0.3963602857420897, 0]], [[5.467519199250946, 1, 1, 0, 2.1610768357420893, 0], [5.467519199250946, 1, 1, 0, 3.06665506574209, 0], [5.467519199250946, 1, 1, 0, 5.992369355742089, 0], [5.467519199250946, 1, 1, 0, 7.45522649574209, 0], [5.467519199250946, 1, 1, 0, 8.778763905742089, 0]], [[5.467519199250946, 1, 1, 0, 1.2787185557420897, 0], [5.467519199250946, 1, 1, 0, 3.6471539357420895, 0], [5.467519199250946, 1, 1, 0, 4.52951220574209, 0], [5.467519199250946, 1, 1, 0, 5.41187048574209, 0], [5.467519199250946, 1, 1, 0, 6.89794758574209, 0], [5.467519199250946, 1, 1, 0, 7.757085905742089, 0], [5.467519199250946, 1, 1, 0, 9.21994304574209, 0]]]
    this.is_loop = props.loop? props.loop: false
    
    this.finish = false
    // this.duration = 3
  }


  loop = () => {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    // Juggler(this.canvas, this.ctx)

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


    while (this.balls.length < this.throws.length){
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
        this.load_throw(this.throws[this.balls.length])
      );

      this.is_loop && ball.calculate_initial_pos(this.t0, this.tn)

      this.balls.push(ball);
    }

    this.time_aux === 0 && (this.time_aux = new Date())

    this.is_loop? this.loop_problem(): this.default_problem()
    requestAnimationFrame(this.loop)
  }

  startRecording() {
    const chunks = [];
    const stream = this.refs.canvas.captureStream(); // grab our canvas MediaStream
    const options = {
      audioBitsPerSecond : 128000,
      videoBitsPerSecond : 2500000,
      mimeType : 'video/webm'
    }
  
    const rec = new MediaRecorder(stream, options); // init the recorder 
  
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = e => chunks.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    
    rec.start();
    const check_finish = setInterval(()=>{
      
      if(this.finish){
        rec.stop();
      }
    }, 500);

    rec.onstop = e => {
      this.setState({video: URL.createObjectURL(new Blob(chunks,  {type: 'video/webm'}))})
      clearInterval(check_finish)
    }
  }

  default_problem(){
    let is_done = true
    for (let i = 0; i < this.balls.length; i++){
      this.balls[i].draw()
      let current_time = ((new Date() - this.time_aux)/1000)
      if (this.balls[i].list_of_throw.length > this.balls[i].index_list){
        is_done = false
        if(this.balls[i].list_of_throw[this.balls[i].index_list].initial_time <= current_time){
          this.balls[i].global_time = this.time_aux
          this.balls[i].apply_throw(this.width, this.height)
        }
      } 
    }
    is_done && (this.finish = true) //&& /*this.stopRecording() &&*/ this.setState({video: new Blob(this.chunks, {type: 'video/webm'})}) 
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

    this.startRecording()
    //start the animation
    
    this.loop();
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

  render(pe) {
    return (
      <>
        <NavBar/>
        <div style={{backgroundColor:"#000"}}>
          <Canvas_Menu video={this.state.video} loop={this.loop} throws={this.throws}></Canvas_Menu>
          <My_Audio></My_Audio>
          <canvas ref="canvas" id='canvas'/>
        </div>
      </>
    );
  }
}
