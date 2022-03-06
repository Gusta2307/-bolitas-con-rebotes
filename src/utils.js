
export const g = 9.81
const e = 0.9

const pos_hands = {
    0: [window.innerWidth*0.4, window.innerHeight/2],
    1: [window.innerWidth*0.6, window.innerHeight/2]
};



export function change_hand_done(x, y, current_hand, change_hand, t){
    console.log("T", t)
    let pos_hand_x = change_hand == 1? pos_hands[(current_hand + 1) % 2][0] : pos_hands[current_hand][0]
    let pos_hand_y = change_hand == 1? pos_hands[(current_hand + 1) % 2][1] : pos_hands[current_hand][1]
    if (pos_hand_x - 30 <= x && x <= pos_hand_x + 30 && pos_hand_y - 30 <= y && y <= pos_hand_y + 30 && t > 1)
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
    console.log("ASDFGHJKL")
    // console.log("ASD", x, xf)
    // let t = Math.abs((2*vy)/g)
    // console.log("TTT", t)
    return (x - xf)/total_time
};

export function calculate_angle(change_hand, current_hand, x, vy){
    let xf = x
    if (change_hand == 1){
        xf = pos_hands[(current_hand + 1) % 2][0]
        console.log("OOO", xf)
    }
    console.log("XF", xf, x, vy, xf - x)
    //Math.abs(Math.trunc((g * Math.abs(xf - x))/(vy * vy)) - (g * Math.abs(xf - x))/(vy * vy))
    let angle = Math.asin((g * Math.abs(xf - x))/(vy * vy))
    return (degrees_to_radians(90) + angle)
};

export function calculate_total_time(vy0, h, bounce_amount, catch_ball){
    // console.log("CATCH BALL", catch_ball)
    let time = 0
    let current_h = h
    let current_bounce = 0
    let h_max = calculate_h_max(vy0)
    let vy1 = calculate_speed_vy_hmax(vy0, Math.abs(window.innerHeight - (h - h_max)))
    // let vy1_max = vy1
    if (vy0 > 0){
        // LANZAMIENTO HACIA ARRIBA
        time += vy0/g
        current_h = Math.abs(h + h_max)
        console.log("T1", vy0/g, current_h)
    }
    
    while(bounce_amount > 0){
        console.log("T2", (Math.abs(vy1) - Math.sqrt(vy1*vy1 - 2*g*current_h))/g, Math.sqrt(2*g*current_h)/g)
        // CAIDA
        if (vy0 < 0 && time == 0){
            time += (Math.abs(vy0) - Math.sqrt(vy0*vy0 - 2*g*current_h))/g
            vy1 = vy0
        }
        else{
            time += Math.sqrt(2*g*current_h)/g
        }
        
        vy1 = calculate_speed_vy(vy1, current_bounce)
        // console.log("V R", vy1)
        if (bounce_amount == 1 && catch_ball == 0){
            current_h = h
            console.log("CATCH BALL", current_h/vy1)
            // time += vy0 > 0? Math.abs((vy1 - Math.sqrt(vy1*vy1 - 2*g*current_h))/g) : Math.sqrt(2*g*current_h)/g
            time += Math.abs(current_h/vy1)
            break;
        }
        else{
            if(bounce_amount == 1 && catch_ball == 1){
                current_h = Math.abs(((vy1*vy1)/(2*g)) - h)
                // console.log("AAAAAAAAAAA", vy1, (vy1*vy1)/(2*g), current_h , Math.sqrt(2*g*current_h)/g)
                time += /*vy0 > 0? Math.abs((vy1 - Math.sqrt(vy1*vy1 - 2*g*current_h))/g) :*/ Math.sqrt(2*g*current_h)/g
            }
            else{
                current_h = (vy1*vy1)/(2*g)
                // console.log("HH",vy1, current_h)
            }
        }

        console.log("T3", vy1/g)
        //REBOTE
        time += Math.abs(vy1/g)
        // vy1_max = calculate_speed_vy_hmax(vy1, current_h)
        // console.log("V S", vy1_max)
        bounce_amount -= 1
        current_bounce += 1
    }

    console.log("TIME", time)
    return time
};

export function calculate_h_max(vy){
    return (vy*vy)/(2*g)
}

export function calculate_speed_vy_hmax(vy, h1){
    let t = Math.sqrt(2*g*h1)/g
    // console.log("Q", vy, h1, t)
    return t*g
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
