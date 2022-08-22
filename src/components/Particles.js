
export const Particles = () => {
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
    const numBalls = 70;

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var balls = []
    for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.key = i;
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${random(1, 5)}em`;
        ball.style.height = ball.style.width;
        ball.style.position = "absolute"
        ball.style.borderRadius = "100%"
        ball.style.opacity = "0.7"
        
        balls.push(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
        let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
        };
        el.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
        }
        );
    });
    return balls
}