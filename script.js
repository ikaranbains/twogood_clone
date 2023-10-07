const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});


function videoContAnimation() {
    const play = document.getElementById("play");
    const videoCont = document.getElementById("video-cont");

    videoCont.addEventListener("mousemove", (dets) => {

        gsap.to(play, {
            opacity: 1,
            scale: 1,
            ease: Power1,
            top: dets.y - 80,
            left: dets.x - 70
        })
    })

    videoCont.addEventListener("mouseout", () => {
        gsap.to(play, {
            opacity: 0,
            scale: 0,
            ease: Power1
        })
    })
}

videoContAnimation();

function loadingAnimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.3,
        duration: 0.6,
        stagger: 0.2
    });

    gsap.from("#page1 #video-cont", {
        y: 100,
        opacity: 0,
        delay: 0.9,
        duration: 0.5
    });
}

loadingAnimation();