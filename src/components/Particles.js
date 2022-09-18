
// export const Particles = () => {
//     const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
//     const numBalls = 70;

//     const random = (min, max) => {
//         return Math.floor(Math.random() * (max - min)) + min;
//     }

//     var balls = []
//     for (let i = 0; i < numBalls; i++) {
//         let ball = document.createElement("div");
//         ball.classList.add("ball");
//         ball.key = i;
//         ball.style.background = colors[Math.floor(Math.random() * colors.length)];
//         ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
//         ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
//         ball.style.transform = `scale(${Math.random()})`;
//         ball.style.width = `${random(1, 5)}em`;
//         ball.style.height = ball.style.width;
//         ball.style.position = "absolute"
//         ball.style.borderRadius = "100%"
//         ball.style.opacity = "0.7"
        
//         balls.push(ball);
//     }

//     Keyframes
//     balls.forEach((el, i, ra) => {
//         let to = {
//         x: Math.random() * (i % 2 === 0 ? -11 : 11),
//         y: Math.random() * 12
//         };
//         el.animate(
//         [
//             { transform: "translate(0, 0)" },
//             { transform: `translate(${to.x}rem, ${to.y}rem)` }
//         ],
//         {
//             duration: (Math.random() + 1) * 2000, // random duration
//             direction: "alternate",
//             fill: "both",
//             iterations: Infinity,
//             easing: "ease-in-out"
//         }
//         );
//     });
//     return balls
// }

import styled, {keyframes} from "styled-components";

export default function Particles(props) {
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const particlesAnim = keyframes`
        from {
            transform: translate(0, 0);
        }
        to {
            transform: translate(${props.x}rem, ${props.y}rem);
        }
    `

    const _Particles = styled.div`
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.floor(Math.random() * 80)}vw;
        top: ${Math.floor(Math.random() * 80)}vh;
        transform: scale(${Math.random()});
        width: ${props => props.size}em;
        height: ${props => props.size}em;
        position: absolute;
        border-radius: 100%;
        opacity: 0.7;

        // key frames
        animation: ${particlesAnim} ${props => props.duration}ms alternate ease-in-out infinite;
    `

    return (
        <_Particles 
            size={random(3, 6)}
            duration={(Math.random() + 1) * 2000}
            key={props._key}
        />
    )
}