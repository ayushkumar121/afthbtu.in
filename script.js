// timelines


// drawer
const drawer01tl = gsap.timeline({ paused: true });
const drawer02tl = gsap.timeline({ paused: true });
const drawer03tl = gsap.timeline({ paused: true });
const drawer04tl = gsap.timeline({ paused: true });
const drawer05tl = gsap.timeline({ paused: true });
const drawer06tl = gsap.timeline({ paused: true });

// Black sheet animations
drawer01tl
    .to(".drawer-animation", {
        duration: .4,
        borderRadius: 0,
        scaleX: 100,
        scaleY: 100,
        top: 0,
        right: 0,
        ease: "slow(0.7, 0.7, false)"
    });

// Hamburger menu animations
drawer02tl
    .to(".drawer-container button", {
        duration: .7,
        rotateZ: 360,
        background: '#fff',
        ease: "ease.out"
    });
drawer03tl
    .to(".drawer-container button", {
        duration: .8,
        scaleX: 1.2,
        scaleY: 1.2,
        ease: "elastic.out(1, 0.3)"
    });
drawer04tl
    .to(".drawer-container button img:nth-child(1)", {
        duration: 0.3,
        opacity: 0
    })
    .to(".drawer-container button img:nth-child(2)", {
        duration: 0.4,
        opacity: 1,
        ease: "expo.out"
    });

// Content feature animations
drawer05tl
    .to(".drawer-feature", {
        duration: 0.3,
        delay: .6,
        marginTop: 0,
        height: 400,
        ease: "ease.out"
    });

// Content animations
drawer06tl
    .to(".drawer-content", {
        delay: .1,
        display: "flex",
    }).to(".drawer-content", {
        duration: 0.3,
        top: '0px',
        opacity: 1,
        ease: "slow(0.7, 0.7, false)"
    });


function drawerreact(state) {
    if (state) { // open state
        drawer01tl.play();
        drawer06tl.play();
        drawer02tl.play();
        drawer03tl.play();
        drawer04tl.play();
        drawer05tl.play();
    }
    else {
        drawer01tl.reverse();
        drawer06tl.reverse();
        drawer02tl.reverse();
        drawer03tl.reverse();
        drawer04tl.reverse();
        drawer05tl.reverse();
    }
}

// Setting the slider

const slides = 4;
const slideWidth = 1000;
const slideInterval = 6


let transitioning = false;
let currentSlide = 1;

const slider = document.querySelector('.slider');
const slideList = document.querySelectorAll('.slider .slide');


gsap.to('.slider', { duration: 0, width: slides * slideWidth, x: -slideWidth });
slider.prepend(document.querySelector('.slider > div:last-child'))

function moveRight() {
    if (!transitioning) {
        transitioning = true;

        fgAnimation02();

        gsap.to('.slider', {
            duration: 1,
            x: `-=${slideWidth}`,
            ease: "slow(0.7, 0.7, false)",
            onComplete: () => {
                gsap.to('.slider', { duration: 0, x: -slideWidth });
                gsap.to('.slide.active .slide-foreground', { x: 0, y: 0, opacity: 0 });
                slider.appendChild(document.querySelector('.slider > div:first-child'));

                transitioning = false;
                currentSlide++;

                if (currentSlide > slides) {
                    currentSlide = 1;
                }

                setActiveSlide();

                indicator();
                fgAnimation01();
            }
        })
    }
}

function moveLeft() {
    if (!transitioning) {
        transitioning = true;

        fgAnimation02(false);

        gsap.to('.slider', {
            duration: 1,
            x: `+=${slideWidth}`,
            ease: "fast(0.7, 0.7, false)",
            onComplete: () => {

                gsap.to('.slider', { duration: 0, x: -slideWidth });
                gsap.to('.slide.active .slide-foreground', { x: 0, y: 0, opacity: 0 });
                slider.prepend(document.querySelector('.slider > div:last-child'));

                transitioning = false;
                currentSlide--;

                if (currentSlide < 1) {
                    currentSlide = slides;
                }

                setActiveSlide();
                indicator();
                fgAnimation01();
            }
        })
    }
}

function setActiveSlide() {
    for (let i = 0; i < slides; i++) {
        const slide = slideList[i];
        if (currentSlide == i + 1)
            slide.classList.add('active')
        else
            slide.classList.remove('active')

    }
}

function fgAnimation01() {
    gsap.to('.slide.active .slide-content', {
        duration: .2,
        opacity: 1,
        x: 0,
    });

    gsap.to('.slide.active .slide-foreground', {
        duration: .6,
        y: -200,
        // height: 600,
        opacity: 1,
        ease: "expo.out",
    })
}

function fgAnimation02(forward = true) {
    // gsap.to('.slide.active .slide-foreground', {
    //     duration: 1,
    //     x: -150,
    //     opacity: 0,
    // })

    gsap.to('.slide.active .slide-content', {
        duration: .4,
        opacity: 0,
        x: -300,
        onComplete: () => {
            gsap.to('.slide.active .slide-content', { duration: 0, x: 300 })
        }
    });


    if (forward) {
        gsap.to('.slide.active .slide-foreground', {
            duration: 1,
            x: `+=${slideWidth}`,
            ease: "slow(0.7, 0.7, false)",
        })
    } else {
        gsap.to('.slide.active .slide-foreground', {
            duration: 1,
            x: `-=${slideWidth}`,
            ease: "slow(0.7, 0.7, false)",
        })
    }

    gsap.to('.slide.active .slide-foreground', {
        duration: .6,
        y: 0,
        opacity: 0,
        ease: "expo.in",
        // onComplete: () => {
        //     gsap.to('.slide.active .slide-foreground', { duration: 0, y: 0, height: 100 })
        // }
    })
}

function indicator() {
    const indicatortl = gsap.timeline();

    indicatortl
        .to(`.slider-indicators .indicator-line`, {
            duration: .5,
            x: (currentSlide - 1) * 140,
            width: 5,
            ease: "expo.out"
        })
        .to(`.slider-indicators .indicator-line`, {
            duration: slideInterval - 1.5,
            width: '140px',
            ease: "none"
        })
}

// Auto start

fgAnimation01();
indicator();

/*
setInterval(() => {
    moveRight();
}, slideInterval * 1000);
*/

// Mouse Handling

function handleButtonHover(sender) {
    gsap.to(sender.querySelector('.anim-bg'), {
        duration: .4,
        x: 140,
        width: 70,
        ease: "power2.out"
    });

    handleMouseOver();
}

function handleButtonOut(sender) {
    gsap.to(sender.querySelector('.anim-bg'), {
        duration: .4,
        x: 0,
        width: 200,
        ease: "power2.out"
    });

    handleMouseOut();
}




function handleMouse(e) {
    var x = e.clientX;
    var y = e.clientY;


    gsap.to("#custom-mouse-1", {
        top: y - 10,
        left: x - 10,
    });

    gsap.to("#custom-mouse-2", {
        top: y - 25,
        left: x - 25,
        duration: 1,
        ease: "slow(0.7, 0.7, false)"
    });
}

function handleMouseOver() {
    gsap.to("#custom-mouse-2", {
        scaleX: 1.3,
        scaleY: 1.3,
        duration: .5,
        background: "rgba(0,0,0,.3)",
        ease: "slow(0.7, 0.7, false)"
    });
}

function handleMouseOut() {
    gsap.to("#custom-mouse-2", {
        scaleX: 1,
        scaleY: 1,
        duration: .5,
        background: "transparent",
        ease: "slow(0.7, 0.7, false)"
    });
}
