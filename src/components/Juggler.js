
export default function Juggler(canvas, ctx){
    // const ctx = canvas.getContext("2d")

    const body = () => {

        console.log(canvas.height/2)
        // head
        ctx.beginPath();
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.arc(canvas.width/2, vh(25), vw(2), 0, 2 * Math.PI);
        ctx.fill();

        // body
        ctx.beginPath();
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.moveTo(canvas.width/2 - vw(5), canvas.height/2 - vh(18));
        ctx.lineTo(canvas.width/2 + vw(5), canvas.height/2 - vh(18));
        ctx.lineTo(canvas.width/2 + vw(2), canvas.height/2 + vw(2));
        ctx.lineTo(canvas.width/2 - vw(2), canvas.height/2 + vw(2));
        ctx.fill();
        ctx.closePath();

        // left arm
        ctx.beginPath();
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.moveTo(canvas.width/2 - vw(5), canvas.height/2 - vh(18));
        ctx.lineTo(canvas.width/2 - vw(5) + vw(0.2), canvas.height/2 - vh(18));
        ctx.lineTo(canvas.width/2 - vw(7) + vw(0.2), canvas.height/2);
        ctx.lineTo(canvas.width/2 - vw(7), canvas.height/2);
        ctx.fill();
        ctx.closePath();

        // right arm
        ctx.beginPath();
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.moveTo(canvas.width/2 + vw(5), canvas.height/2 - vh(18));
        ctx.lineTo(canvas.width/2 + vw(5) - vw(0.2), canvas.height/2 - vh(18));
        ctx.lineTo(canvas.width/2 + vw(7) - vw(0.2), canvas.height/2);
        ctx.lineTo(canvas.width/2 + vw(7), canvas.height/2);
        ctx.fill();
        ctx.closePath();

        // left hand
        ctx.beginPath();
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.moveTo(canvas.width/2 - vw(7), canvas.height/2);
        ctx.lineTo(canvas.width/2 - vw(7) + vw(0.2), canvas.height/2);
        ctx.lineTo(canvas.width/2 - vw(10) + vw(0.2), canvas.height/2 - vh(2));
        ctx.lineTo(canvas.width/2 - vw(10), canvas.height/2 - vh(2));
        ctx.fill();

        // right hand
        ctx.beginPath();
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.moveTo(canvas.width/2 + vw(7), canvas.height/2);
        ctx.lineTo(canvas.width/2 + vw(7) - vw(0.2), canvas.height/2);
        ctx.lineTo(canvas.width/2 + vw(10) - vw(0.2), canvas.height/2 - vh(2));
        ctx.lineTo(canvas.width/2 + vw(10), canvas.height/2 - vh(2));
        ctx.fill();
    }

    const vh = (v) => {
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return (v * h) / 100;
      }
      
    const vw = (v) => {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        return (v * w) / 100;
    }

    body()
}