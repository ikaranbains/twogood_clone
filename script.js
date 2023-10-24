function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

loco();

function navBarAnimation() {
    gsap.to("#nav1 img", {
        transform: 'translateY(-100%)',
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -10%",
            scrub: true
        }
    })

    gsap.to("#nav #links", {
        transform: 'translateY(-100%)',
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -10%",
            scrub: true
        }
    })
}

navBarAnimation();

function videoContAnimation() {
    const play = document.getElementById("play");
    const videoCont = document.getElementById("video-cont");

    videoCont.addEventListener("mousemove", (dets) => {

        gsap.to(play, {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
            ease: Power1,
            top: dets.y,
            left: dets.x
        })
    })

    videoCont.addEventListener("mouseout", () => {
        gsap.to(play, {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(1)',
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


function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            top: dets.y,
            left: dets.x
        })
    })

    const child = document.querySelectorAll(".child");

    child.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(1)'
            })
        })

        elem.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(0)'
            })
        })
    })
}

cursorAnimation();