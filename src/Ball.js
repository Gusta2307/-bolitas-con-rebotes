import My_Audio from "./Audio_";
import get_v0 from "./utils";

// const _audio = new My_Audio()

export default class Ball{
    constructor(ctx, x, y, speedX, speedY, color, size, state) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.v0 = null
        this.t = 0
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.size = size;
        this.state = state
        this.audio = new My_Audio()

        this.x0 = x
        this.y0 = y
        this.vy = null
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();
      }

    update(width, height) {
        //change orientation if necessary
        this.x + this.size >= width && (this.speedX = -this.speedX) /*&& this.audio.playAudio()*/;
        this.x - this.size <= 0 && (this.speedX = -this.speedX) /*&& this.audio.playAudio()*/;

        this.y + this.size >= height && (this.speedY = -this.speedY) && this.audio.playAudio();
        this.y - this.size <= 0 && (this.speedY = -this.speedY) /*&& this.audio.playAudio()*/;

        //update position
        this.x += this.speedX;
        this.y += this.speedY;
    }

    update_state_0(){
      return
    }

    update_state_1(width, height){
      console.log(this.x, width*0.3, this.t, Math.abs(this.x - width*0.3))
      if (Math.abs(this.x - width*0.3) < 1.5 && this.t > 0){
        console.log("asdsf")
        this.state = (this.state + 1) % 2
        return
      }
      var angle = Math.PI/3;
      console.log(angle)
      if (this.v0 === null)
        this.v0 = get_v0(width*0.3, this.x, angle)
      
      var g = 9.81

      
      this.x = this.x0 - this.v0 * this.t * Math.cos(angle)
      this.y = this.y0 - (this.v0 * Math.sin(angle) * this.t - 1/2 * g * (this.t * this.t))
      this.t += 0.1
    }
    
    collisionDetect(balls) {
        for (let j = 0; j < balls.length; j++) {
            if (this !== balls[j]) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.size + balls[j].size) {
                    const red = this.random(0, 255);
                    const green = this.random(0, 255);
                    const blue = this.random(0, 255);
                  
              balls[j].color = this.color =
                "rgb(" + red + "," + green + "," + blue + ")";
            }
          }
        }
      }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}