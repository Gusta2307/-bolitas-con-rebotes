

export default class Ball_Throw{
    constructor(_initial_velocity, _change_hand, _bounce_amount, _catch_ball){
        this.initial_velocity = _initial_velocity
        this.change_hand = _change_hand // 0 si no cambia de mano, 1 si cambia
        this.bounce_amount = _bounce_amount
        this.catch_ball = _catch_ball // si es 1 la captura por arriba, si es 0 por debajo
    }
}