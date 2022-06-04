import My_Audio from "./Audio_";
import {calculate_position,g_k, pos_hands, calculate_total_time, calculate_speed_vy_hmax, calculate_h_max, calculate_speed_vx_with_tt, calculate_speed_vy, calculate_speed_vx, change_hand_done} from "./utils";
export default class Ball{
    constructor(id, ctx, x, y, color, size, _initial_hand, _list_of_throw) {
        this.id = id

        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.color = color;
        this.size = size;

        this.list_of_throw = _list_of_throw
        this.index_list = 0
        this.audio = new My_Audio()

        this.current_hand = _initial_hand // 0 left hand, 1 right hand

        this.x0 = x
        this.y0 = y

        this.h = this.y
        this.h_max = null

        this.vy0 = 0
        this.vy = null
        this.vx = null
        this.t = 0

        this.time_aux = null
        this.out_time = null
        this.global_time = null

        this.total_time = null
        this.current_bounce = 0

        this.is_move = false
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

        this.ctx.fill();
      }

    apply_throw(width, height){
      var temp_time = new Date()
      this.t === 0 && (temp_time = new Date())

      if (!this.list_of_throw.length)
        return

      if (this.list_of_throw[this.index_list].bounce_amount === this.current_bounce && change_hand_done(this.x, this.y, this.current_hand, this.list_of_throw[this.index_list].change_hand, this.t)){
        this.is_move = false
        this.list_of_throw[this.index_list].is_done = true

        //default
        // this.index_list += 1
        // for loop
        this.index_list = (this.index_list + 1)%this.list_of_throw.length

        if (!this.list_of_throw.length){
          return
        }

        this.current_hand = (this.current_hand + 1)%2

        this.x = pos_hands[this.current_hand][0]
        this.y = pos_hands[this.current_hand][1]

        this.x0 = this.x
        this.y0 = this.y

        this.h = this.y
        this.h_max = null

        this.vy0 = 0
        this.vy = null
        this.vx = null
        this.t = 0

        this.total_time = null
        this.current_bounce = 0

        this.out_time = null
        this.time_aux = null

        return
      }

      this.vy == null && (this.vy = this.list_of_throw[this.index_list].initial_velocity)

      //Calculo la velocidad de la pelota despues del rebote y se restablece el tiempo
      this.y + this.size >= height && this.t > 0.1  /*&& (this.list_of_throw[this.index_list].bounce_amount = this.list_of_throw[this.index_list].bounce_amount - 1) */
      && (this.vy = calculate_speed_vy(this.vy0, this.current_bounce)) && (this.current_bounce += 1) &&  (this.x0 = this.x) && (this.y0 = this.y) && this.audio.playAudio(this.global_time, this.id) && (this.vy0 = this.vy) && (this.t = 0)

      this.h_max == null && this.vy < 0 && (this.h_max = calculate_h_max(this.vy))

      //Calculo la velocidad con que cae la pelota
      this.h_max != null && this.h_max > 0 && this.y - this.size <= Math.abs(this.h - this.h_max) && (this.vy0 = calculate_speed_vy_hmax(Math.abs(window.innerHeight - (this.h - this.h_max)))) && (this.h_max = 0)

      this.vy0 === 0 && this.vy > 0 && (this.vy0 = this.vy) && (this.h_max = 0)

      this.list_of_throw[this.index_list].bounce_amount > 0 && this.total_time == null &&
        (this.total_time = calculate_total_time(this.vy, this.h, this.list_of_throw[this.index_list].bounce_amount, this.list_of_throw[this.index_list].catch_ball))


      this.total_time != null && this.vx == null && (this.vx = calculate_speed_vx_with_tt(this.total_time, this.list_of_throw[this.index_list].change_hand, this.current_hand, this.x))

      this.vx == null && (this.vx = calculate_speed_vx(this.list_of_throw[this.index_list].change_hand, this.current_hand, this.x, this.vy))

      this.x = this.x0 - this.vx * this.t
      this.y = this.vy > 0? this.y0 + (this.vy * this.t - 1/2 * g_k * Math.pow(this.t, 2)):  this.y0 + (this.vy * this.t + 1/2 * g_k * Math.pow(this.t, 2))

      this.time_aux == null && (this.time_aux = (new Date() - temp_time)/1000)

      this.t += this.out_time != null? (new Date() - this.out_time)/1000 : this.time_aux

      this.out_time = new Date()
    }

    calculate_initial_pos(t0, tn){
      var result_pos = calculate_position(this.x, this.y, this.index_list, this.list_of_throw, t0, tn)
      this.x0 = result_pos[0]
      this.y0 = result_pos[1]
      this.t = result_pos[2]
      this.t && (this.is_move = true)
      this.t === 0 && (this.x = this.x0) && (this.y = this.y0)
      this.vy = result_pos[3]
      this.vx = result_pos[4]
      this.current_bounce = result_pos[5]
      this.current_hand = result_pos[6]
      // let new_initial_time = result_pos[7]
      this.index_list = result_pos[8]
      // new_initial_time > 0 && (this.list_of_throw[this.index_list].initial_time = new_initial_time)
      this.vy0 = this.vy
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
}