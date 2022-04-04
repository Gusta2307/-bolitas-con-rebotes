
export const g = 9.81
const e = 0.9

const const_h = 0.8

const pos_hands = {
    0: [window.innerWidth*0.4, window.innerHeight/2],
    1: [window.innerWidth*0.6, window.innerHeight/2]
};



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
    console.log("ASD", x, xf)
    let t = Math.abs((2*vy)/g)
    console.log("TTT", t)
    return (x - xf)/t
};

export function calculate_speed_vx_with_tt(total_time, change_hand, current_hand, x){
    console.log("PPPPPPP")
    let xf = change_hand? pos_hands[(current_hand + 1) % 2][0] : x
    console.log("ASDFGHJKL", x, xf, total_time, (x - xf)/total_time)
    // console.log("ASD", x, xf)
    // let t = Math.abs((2*vy)/g)
    // console.log("TTT", t)
    return ((x - xf))/total_time
};


export function calculate_total_time(vy0, h, bounce_amount, catch_ball){
    // console.log("CATCH BALL", catch_ball)
    let time = 0
    let current_h = h
    console.log("HHHHHHHHHHHHHHHHHHH", h)
    let current_bounce = 0
    let h_max = calculate_h_max(vy0)
    console.log(vy0,{h_max}, window.innerHeight/2, h_max/(window.innerHeight/2) )
    let vy1 = calculate_speed_vy_hmax(h + h_max)

    if (vy0 > 0){
        // LANZAMIENTO HACIA ARRIBA
        time += vy0/g
        current_h = h + h_max
        console.log("T1", vy0/g, current_h, vy0)
    }
    
    while(bounce_amount > 0){
        // CAIDA
        if (vy0 < 0 && time == 0){ // LANZAMIENTO HACIA ABAJO
            console.log((Math.abs(vy0) - Math.sqrt(vy0*vy0 - 2*g*current_h))/g)
            time += (Math.abs(vy0) - Math.sqrt(vy0*vy0 - 2*g*current_h))/g
            vy1 = vy0
        }
        else{
            time += Math.sqrt(2*g*current_h)/g
        }
        console.log("T2", time, Math.sqrt(2*g*current_h)/g)
        
        console.log("V R", vy1, current_h)
        
        vy1 = calculate_speed_vy(vy1, current_bounce)
        
        if (bounce_amount == 1 && catch_ball == 0){
            console.log("CATCH BALL", h, h/vy1, vy1)
            time += Math.abs(h/vy1)
            break;
        }
        else{
            if(bounce_amount == 1 && catch_ball == 1){
                current_h = Math.abs(((vy1*vy1)/(2*g)) - h)
                console.log("AAAAAAAAAAA", vy1, current_h , Math.sqrt(2*g*current_h)/g)
                time += /*vy0 > 0? Math.abs((vy1 - Math.sqrt(vy1*vy1 - 2*g*current_h))/g) :*/ Math.sqrt(2*g*current_h)/g
            }
            // else{
            //     current_h = calculate_h_max(vy1)
            // }
        }
        
        //REBOTE
        time += Math.abs(vy1/g)
        console.log("T3", time, vy1/g)

        current_h = calculate_h_max(vy1)
        console.log("HH", vy1, current_h)

        bounce_amount -= 1
        current_bounce += 1
    }

    console.log("TIME", time)
    return time
};

export function calculate_h_max(vy){
    // console.log("VY", vy, (vy*vy)/(2*g), ((vy*vy)/(2*g))*(window.innerHeight/2) )
    return ((vy*vy)/(2*g))
}

export function calculate_speed_vy_hmax(h_max){
    console.log("VY", {h_max})
    // h_max=h_max/(window.innerHeight/2)
    console.log("VY hmaxxx", (Math.sqrt(2*g*h_max) * (window.innerHeight/2))/Math.sqrt(window.innerHeight*2*9.81))
    return Math.sqrt(2*g*h_max)
}



export function get_total_time_vy(time, cardinality){
    var arr = [];
    var step = (time) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push((step * i));
    }
    return arr;
}

