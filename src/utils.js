
export const g = 9.80665
export const k = (window.innerHeight/2)
export const g_k = g*k

const e = 0.9


export const pos_hands = {
    0: [window.innerWidth*0.4, window.innerHeight/2],
    1: [window.innerWidth*0.6, window.innerHeight/2]
};

// console.log("POS_HANDS", pos_hands)


export function change_hand_done(x, y, current_hand, change_hand, t){
    // console.log("T", t)
    let pos_hand_x = change_hand == 1? pos_hands[(current_hand + 1) % 2][0] : pos_hands[current_hand][0]
    let pos_hand_y = change_hand == 1? pos_hands[(current_hand + 1) % 2][1] : pos_hands[current_hand][1]
    if (pos_hand_x - 30 <= x && x <= pos_hand_x + 30 && pos_hand_y - 30 <= y && y <= pos_hand_y + 30)
        return true
    return false
};

export function calculate_speed_vy(vy, current_bounce){
    // const u = Math.sqrt(2*g*h)
    vy = current_bounce == 0? vy: -vy
    return -e*vy
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

    if (vy0 > 0){
        // LANZAMIENTO HACIA ARRIBA
        time += vy0/g_k
        current_h = h + calculate_h_max(vy0)
        vy1 = calculate_speed_vy_hmax(current_h)
    }
    
    while(bounce_amount > 0){
        // CAIDA
        if (vy0 < 0 && time == 0){ // LANZAMIENTO HACIA ABAJO
            time += (Math.abs(vy0) - Math.sqrt(vy0*vy0 - 2*g_k*h))/(g_k)
            vy1 = vy0
        }
        else{
            time += Math.sqrt(2*g_k*current_h)/g_k
        }        
        
        vy1 = calculate_speed_vy(vy1, current_bounce)
        
        if (bounce_amount == 1 && catch_ball == 0){
            // time += Math.abs(vy1/g_k)  (b - math.sqrt(d))/(-g)

            // console.log("AAA", (vy1 - Math.sqrt(vy1*vy1 - 2*g_k*h))/(g_k))

            time += (vy1 - Math.sqrt(vy1*vy1 - 2*g_k*h))/(g_k)

            break;
        }
        else{
            if(bounce_amount == 1 && catch_ball == 1){
                current_h = Math.abs(((vy1*vy1)/(2*g_k)) - h)
                time += Math.sqrt(2*g_k*current_h)/g_k
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
    // console.log("VY", vy, (vy*vy)/(2*g), ((vy*vy)/(2*g))*(window.innerHeight/2) )
    return ((vy*vy)/(2*g_k))
}

export function calculate_speed_vy_hmax(h_max){
    // console.log("VY", {h_max})
    // h_max=h_max/(window.innerHeight/2)
    // console.log("VY hmaxxx", (Math.sqrt(2*g*h_max) * (window.innerHeight/2))/Math.sqrt(window.innerHeight*2*9.81))
    return Math.sqrt(2*g_k*h_max)
}


