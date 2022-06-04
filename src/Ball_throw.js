import {k} from './utils'

export default class Ball_Throw{
    constructor(_initial_velocity, _change_hand, _bounce_amount, _catch_ball, _initial_time, _end_time){
        this.initial_velocity = _initial_velocity*k
        this.change_hand = _change_hand // 0 si no cambia de mano, 1 si cambia
        this.bounce_amount = _bounce_amount
        this.catch_ball = _catch_ball // si es 1 la captura por arriba, si es 0 por debajo
        this.initial_time = _initial_time
        this.total_time = _end_time
        this.is_done = false
    }
}


