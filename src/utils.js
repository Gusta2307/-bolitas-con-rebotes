
export const g = 9.80665
export const k = (window.innerHeight/2)
export const g_k = g*k

const e = 0.9


export const pos_hands = {
    0: [window.innerWidth*0.4, window.innerHeight/2],
    1: [window.innerWidth*0.6, window.innerHeight/2]
};



export function change_hand_done(x, y, current_hand, change_hand, t){
    let pos_hand_x = change_hand == 1? pos_hands[(current_hand + 1) % 2][0] : pos_hands[current_hand][0]
    let pos_hand_y = change_hand == 1? pos_hands[(current_hand + 1) % 2][1] : pos_hands[current_hand][1]
    if (pos_hand_x - 30 <= x && x <= pos_hand_x + 30 && pos_hand_y - 30 <= y && y <= pos_hand_y + 30)
        return true
    return false
};

export function calculate_speed_vy(vy){
    // const u = Math.sqrt(2*g*h)
    vy = vy > 0? -vy: vy
    return e*vy
};

export function calculate_h(h){
    return e*e*h
};

export function calculate_speed_vx(change_hand, current_hand, x, vy){
    let xf = change_hand? pos_hands[(current_hand + 1) % 2][0] : x
    let t = Math.abs((2*vy)/g_k)
    return (x - xf)/t
};

export function calculate_speed_vx_with_tt(total_time, change_hand, current_hand, x){
    let xf = change_hand? pos_hands[(current_hand + 1) % 2][0] : x
    return (x - xf)/(total_time)
};


export function calculate_total_time(vy0, h, bounce_amount, catch_ball){
    let time = 0
    let current_h = h
    let current_bounce = 0
    let vy1 = null

    if (vy0 < 0){
        // LANZAMIENTO HACIA ARRIBA
        time += Math.abs(vy0/g_k)
        current_h = h + calculate_h_max(vy0)
        vy1 = calculate_speed_vy_hmax(current_h)
    }
    
    while(bounce_amount > 0){
        // CAIDA
        if (vy0 > 0 && time == 0){ // LANZAMIENTO HACIA ABAJO
            time += (Math.abs(vy0) - Math.sqrt(vy0*vy0 - 2*g_k*h))/(g_k)
            vy1 = vy0
        }
        else{
            time += Math.sqrt(2*g_k*current_h)/g_k
        }        
        
        vy1 = calculate_speed_vy(vy1)
        

        if (bounce_amount == 1){
            if (catch_ball){
                current_h = Math.abs(((vy1*vy1)/(2*g_k)) - h)
                time += Math.sqrt(2*g_k*current_h)/g_k
            }
            else{
                time += Math.abs((vy1 + Math.sqrt(vy1*vy1 - 2*g_k*h))/(g_k))
                break;
            }
        }
        
        //REBOTE
        time += Math.abs(vy1/g_k)

        current_h = calculate_h_max(vy1)

        bounce_amount -= 1
        current_bounce += 1
    }

    // console.log("TIME", time)
    return time
};

export function calculate_h_max(vy){
    return ((vy*vy)/(2*g_k))
}

export function calculate_speed_vy_hmax(h_max){
    // console.log("VY", {h_max})
    // h_max=h_max/(window.innerHeight/2)
    // console.log("VY hmaxxx", (Math.sqrt(2*g*h_max) * (window.innerHeight/2))/Math.sqrt(window.innerHeight*2*9.81))
    return Math.sqrt(2*g_k*h_max)
}

function get_pos_catch_ball(current_x, current_y, y, current_v, current_vx, current_h, temp_t, obj, temp_bounce, current_throw, current_hand, index_list){
    if (current_throw.catch_ball){
        temp_t += current_v/g_k
        if (Math.abs(temp_t - obj.total_wt) < 0.001|| temp_t > obj.total_wt)
            return [current_x, current_y, obj.total_wt, current_v, current_vx, temp_bounce, current_hand, 0, index_list]
        
        current_h = Math.abs(calculate_h_max(current_v) - y)
        temp_t += Math.sqrt(2*g_k*current_h)/g_k
        if (Math.abs(temp_t - obj.total_wt) < 0.001|| temp_t > obj.total_wt)
            return [current_x, current_y, obj.total_wt, current_v, current_vx, temp_bounce, current_hand, 0, index_list]
    }
    else{
        temp_t = Math.abs((current_v + Math.sqrt(current_v*current_v - 2*g_k*y))/(g_k))
        if (Math.abs(temp_t - obj.total_wt) < 0.001|| temp_t > obj.total_wt)
            return [current_x, current_y, obj.total_wt, current_v, current_vx, temp_bounce, current_hand, 0, index_list]
    }
    obj.total_wt -= temp_t
    return null
}

export function calculate_position(x, y, index_list, current_throw, t0, tn){
    var current_x = x
    var current_y = y
    var current_hand = Math.abs(x - pos_hands[0][0]) < 0.1? 0: 1
    var vx = null
    while (index_list < current_throw.length){
        var obj = {
            total_wt: Math.abs(current_throw[index_list].initial_time - tn)
        }
        var temp_bounce = 0
        var current_v = current_throw[index_list].initial_velocity
        var current_h = y
        var temp_t = 0
        if (current_throw[index_list].bounce_amount > 0){
            vx = calculate_speed_vx_with_tt(
                    calculate_total_time(current_throw[index_list].initial_velocity, y, current_throw[index_list].bounce_amount, current_throw[index_list].catch_ball), 
                    current_throw[index_list].change_hand, 
                    current_hand, 
                    current_x
                )
        } 
        else{
            vx = calculate_speed_vx(current_throw[index_list].change_hand, current_hand, x, current_throw[index_list].initial_velocity)
        }
        if (current_v < 0){
            temp_t += Math.abs(current_v/g_k)
            if (Math.abs(temp_t - obj.total_wt) < 0.001 || temp_t > obj.total_wt){
                return [current_x, current_y, obj.total_wt, current_v, vx, temp_bounce, current_hand, 0, index_list]
            }
            current_h = calculate_h_max(current_v)
            temp_t += Math.sqrt(2*g_k*current_h)/g_k
            if (Math.abs(temp_t - obj.total_wt) < 0.001|| temp_t > obj.total_wt)
                return [current_x, current_y, obj.total_wt, current_v, vx, temp_bounce, current_hand, 0, index_list]
        }
        if (current_v > 0){
            temp_t = (Math.abs(current_v) - Math.sqrt(current_v*current_v - 2*g_k*current_h))/(g_k)
            if (Math.abs(temp_t - obj.total_wt) < 0.001|| temp_t > obj.total_wt)
                return [current_x, current_y, obj.total_wt, current_v, vx, temp_bounce, current_hand, 0, index_list]
        }

        obj.total_wt -= temp_t
        temp_bounce += 1
        let temp_pos = get_pos(current_x, current_y, vx, current_v, temp_t, x, y, current_hand, current_throw[index_list])
        current_x = temp_pos[0]
        current_y = temp_pos[1]
        temp_t = 0

        current_v = calculate_speed_vy(current_v, Math.abs(temp_bounce - current_throw[index_list].bounce_amount))

        if (current_throw[index_list].bounce_amount == 1){
            let gpcb = get_pos_catch_ball(current_x, current_y, y, current_v, vx, current_h, temp_t, obj, temp_bounce, current_throw[index_list], current_hand, index_list)
            if (gpcb != null)
                return gpcb
        }
        if (current_throw[index_list].bounce_amount == 2){
            temp_t = Math.abs(current_v/g_k)
            if (Math.abs(temp_t - obj.total_wt) < 0.001|| temp_t > obj.total_wt)
                return [current_x, current_y, obj.total_wt, current_v, vx, temp_bounce, current_hand, 0, index_list]
            current_h = calculate_h_max(current_v)
            temp_t += Math.sqrt(2*g_k*current_h)/g_k
            if (Math.abs(temp_t - obj.total_wt) < 0.001|| temp_t > obj.total_wt){
                return [current_x, current_y, obj.total_wt, current_v, vx, temp_bounce, current_hand, 0, index_list]
            }

            else{
                obj.total_wt -= temp_t
                let temp_pos = get_pos(current_x, current_y, current_v, temp_t, x, y, current_hand, current_throw[index_list])
                current_x = temp_pos[0]
                current_y = temp_pos[1]
                temp_t = 0
                current_v = calculate_speed_vy(current_v, Math.abs(temp_bounce - current_throw[index_list].bounce_amount))
                let gpcb = get_pos_catch_ball(current_x, current_y, y, current_v, vx, current_h, temp_t, obj, temp_bounce, current_throw[index_list], current_hand, index_list)
                if (gpcb != null)
                    return gpcb
            }
        }        

        if (current_throw[index_list].change_hand){
            current_hand = (current_hand + 1) % 2
            current_x = pos_hands[current_hand][0]
            current_y = pos_hands[current_hand][1]
        }
        index_list += 1
    }
    // ! x, y, current_time, vy, vx, current_bounce, current_hand, initial_time, index_list
    return [current_x, current_y, 0, current_throw[0].initial_velocity, null, 0, current_hand, current_throw[0].initial_time - t0, 0]
}


function get_pos(current_x, current_y, vx, vy, temp_t, x, y, current_hand, current_throw){
    let A = current_y + (vy * temp_t - 1/2 * g_k * Math.pow(temp_t, 2))
    let AA = current_y + ((-vy) * temp_t - 1/2 * g_k * Math.pow(temp_t, 2))
    let B = current_y - (vy * temp_t - 1/2 * g_k * Math.pow(temp_t, 2))
    let BB = current_y - ((-vy) * temp_t - 1/2 * g_k * Math.pow(temp_t, 2))

    var fx = current_x - vx * temp_t
    var fy = current_y + (vy * temp_t - 1/2 * g_k * Math.pow(temp_t, 2))


    return [fx, fy]
}



