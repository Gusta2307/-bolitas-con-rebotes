
export default function get_v0(x_0, x_max, angle){
    var g = 9.81
    return Math.sqrt(g*(x_max - x_0)/Math.sin(2*angle))
}

export function pendiente(x1, y1, x2, y2){
    return (y2 - y1)/(x2 - x1)
}