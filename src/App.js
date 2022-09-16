import React, { Component } from 'react';
import Ball from "./Ball"
import Ball_Throw from './Ball_throw';
import My_Audio from './Audio_';
import NavBar from './components/NavBar';
import Juggler from './components/Juggler'
import Canvas_Menu from './components/Canvas_Menu';
import {vw, vh} from './utils'

export default class App extends Component{
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      video: null,
      balls: [],
    }
    console.log("MMMMMMMMMM")
    this.sol_act = props.sol_active
    this.solutions = props.solutions?props.solutions:[]
    console.log("PAPAP", this.solutions)
    this.name = props.name !== undefined? props.name: "Sin definir"
    this.count_balls = props.balls

    this.chunks = []
    this.rec = null
    this.canvas = null
    this.ctx = null;
    
    this.width = null
    this.height = null
    
    this.time_aux = 0
    
    this.times = props.times
    this.t0 = props.times !== null? props.times[0]: null
    this.tn = props.times !== null? props.times[props.times.length - 1] : null
    
    this.throws = props.throws
    this.is_loop = props.loop === "SI"? true: false
    

    this.finish = false


    this.ctx_rec = null
    this.dest = null
    this.sourceNode = null
  }


  loop = () => {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.ctx.fillRect(0, 0, vw(100), vh(100));
    Juggler(this.canvas, this.ctx)

    while (this.state.balls.length < this.throws.length){
      const size = vw(1)

      const x = this.state.balls.length%2? vw(60): vw(40) //this.random(0 + size, this.width - size);
      const y = vh(50) //this.random(0 + size, this.height - size);
      
      var red = this.random(0, 255);
      var green = this.random(0, 255);
      var blue = this.random(0, 255);

      const ball = new Ball(
        this.state.balls.length, this.ctx, x, y, 
        "rgb(" + red + "," + green + "," + blue + ")",
        size,
        this.state.balls.length%2, 
        this.load_throw(this.throws[this.state.balls.length]),
        this.is_loop
      );

      this.is_loop && ball.calculate_initial_pos(this.t0, this.tn)

      this.state.balls.push(ball);
    }

    this.time_aux === 0 && (this.time_aux = new Date())

    this.is_loop? this.loop_problem(): this.default_problem()
    requestAnimationFrame(this.loop)
  }

  startRecording() {
    const chunks = [];
    const stream = this.refs.canvas.captureStream(); // grab our canvas MediaStream
    const options = {
      videoBitsPerSecond : 2500000,
      mimeType : 'video/webm; codecs=vp9,opus'
    }
  
    // get the audio track:
    if (this.ctx_rec === null){
      this.ctx_rec = new AudioContext();
      this.dest = this.ctx_rec.createMediaStreamDestination();
      this.sourceNode = this.ctx_rec.createMediaElementSource(document.getElementById('audio-element'));
      this.sourceNode.connect(this.dest);
      this.sourceNode.connect(this.ctx_rec.destination);
    }
    let audioTrack = this.dest.stream.getAudioTracks()[0];
    // add it to your canvas stream:
    stream.addTrack(audioTrack);

    const rec = new MediaRecorder(stream, options); // init the recorder 
  
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = e => chunks.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    
    rec.start();

    const check_finish = setInterval(()=>{
      if(this.finish){
        setTimeout(() => {
          rec.stop();
        }, 1000);
      }
    }, 500);

    rec.onstop = e => {
      this.setState({video: URL.createObjectURL(new Blob(chunks,  {type: 'video/webm', name: this.name})), balls: this.state.balls})
      clearInterval(check_finish)
    }
  }

  default_problem(){
    let is_done = true
    for (let i = 0; i < this.state.balls.length; i++){
      this.state.balls[i].draw()
      let current_time = ((new Date() - this.time_aux)/1000)
      if (this.state.balls[i].list_of_throw.length > this.state.balls[i].index_list){
        is_done = false
        if(this.state.balls[i].list_of_throw[this.state.balls[i].index_list].initial_time <= current_time){
          this.state.balls[i].global_time = this.time_aux
          this.state.balls[i].apply_throw(this.width, this.height)
        }
      } 
    }
    is_done && (this.finish = true) //&& /*this.stopRecording() &&*/ this.setState({video: new Blob(this.chunks, {type: 'video/webm'})}) 
  }

  loop_problem(){
    for (let i = 0; i < this.state.balls.length; i++){
      this.state.balls[i].draw()
      var current_time = ((new Date() - this.time_aux)/1000) + this.t0

      if ((this.state.balls[i].list_of_throw.length > this.state.balls[i].index_list) && 
          this.state.balls[i].index_list >= 0 && 
          Math.abs(current_time - this.state.balls[i].list_of_throw[this.state.balls[i].index_list].initial_time) <= 0.1){
        this.state.balls[i].global_time = this.time_aux
        this.state.balls[i].is_move = true
        this.state.balls[i].apply_throw(this.width, this.height)
      }
      else{
        if (this.state.balls[i].is_move){
          this.state.balls[i].global_time = this.time_aux
          this.state.balls[i].apply_throw(this.width, this.height)
        }
      }
    }

    current_time > this.tn && (this.time_aux = new Date()) && this.reset_index() && (this.finish = true) && console.log("RESET")
  }

  reset_index(){
    for (let i = 0; i < this.state.balls.length; i++){
      this.state.balls[i].index_list = this.state.balls[i].index_list%this.state.balls[i].list_of_throw.length
    }
    return true
  }

  reset_throws(){
    for (let i = 0; i < this.state.balls.length; i++){
      for (let j = 0; j < this.state.balls[i].list_of_throw.length; j++){
        this.state.balls[i].list_of_throw[j].is_done = false
      }
    }
    return true
  }

  random(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentDidMount() {
    setTimeout(()=>{
      //set up the canvas
      this.canvas = this.refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
  
      this.startRecording()
      //start the animation
      
      this.loop();
    },1000) //wait a seconds
  }

  componentDidUpdate(prevProps, prevState){
    console.log("HELLO")
    console.log(prevProps)
    console.log(this.props)
    
    if (prevProps !== this.props){

      cancelAnimationFrame(this.loop)
      
      
      this.sol_act = this.props.sol_active
      this.throws = this.props.throws

      setTimeout(()=>{
        this.reset_animation()      
        this.loop();
      },1000) 
    }
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

  reset_animation = () => {
    //reload page
    
    // window.location.reload();
    this.finish = false
    this.setState({video: null, balls: []})
    this.time_aux = 0
    this.startRecording()
  }

  render() {
    return (
      <>
        <NavBar/>
        <div style={{backgroundColor:"#000"}}>
          <Canvas_Menu name={this.name} sol_act={this.sol_act} times={this.times} balls={this.count_balls} solutions={this.solutions} video={this.state.video} onReset={this.reset_animation} loop={this.is_loop} throws={this.throws}/>
          <My_Audio/>
          <canvas ref="canvas" id='canvas'/>
        </div>
      </>
    );
  }
}
