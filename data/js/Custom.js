/* 复制成功 */ 
function kaygb_copy() {
    $(document).ready(function() {
        $("body").bind('copy', function(e) {
            hellolayer()
        })
    });
    function hellolayer() {
        $.message({
            message: "尊重原创，转载请注明出处<br/>本文作者：歆宋<br/>原文链接：" + window.location.href,
            title: "复制成功",
            type: "success",
            autoHide: !1,
            time: "3000"
        })
    }
}
/* 打字机特效 */
const canvas = Object.assign(document.createElement("canvas"), {
    width: window.innerWidth,
    height: window.innerHeight,
    style: "position:fixed;top:0;left:0;pointer-events:none;z-index:999999"
});
document.body.appendChild(canvas);
const context = canvas.getContext("2d");
const particles = Array.from({
    length: 500
}, () => ({
    x: 0,
    y: 0,
    color: "transparent",
    alpha: 1,
    velocity: {
        x: -1 + Math.random() * 2,
        y: -3.5 + Math.random() * 2
    }
}));
const drawParticles = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        if (particle.alpha <= 0.1) return;
        particle.velocity.y += 0.075;
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.alpha *= 0.96;
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.fillRect(Math.round(particle.x - 1.5), Math.round(particle.y - 1.5), 3, 3)
    })
};
const render = () => {
    drawParticles();
    requestAnimationFrame(render)
};
requestAnimationFrame(render);
document.body.addEventListener("input", () => {
    if (POWERMODE.shake) {
        const shakeIntensity = 1 + 2 * Math.random();
        const shakeX = shakeIntensity * (Math.random() > 0.5 ? -1 : 1);
        const shakeY = shakeIntensity * (Math.random() > 0.5 ? -1 : 1);
        document.body.style.marginLeft = `${shakeX}px`;
        document.body.style.marginTop = `${shakeY}px`;
        setTimeout(() => {
            document.body.style.marginLeft = "";
            document.body.style.marginTop = ""
        }, 75)
    }
});
/* 首次加载 */ 
$.message({
    message: "为了网站的正常运行，请不要使用广告屏蔽插件，谢谢(❁´◡`❁)",
    title: "网站加载完成",
    type: "success",
    autoHide: !1,
    time: "3000"
})