// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Hero Animations ---
    const heroTl = gsap.timeline();

    heroTl.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    })
    .from(".hero-visual img", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.8")
    .from(".floating-card", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.5");


    // --- Hero Parallax on Mouse Move ---
    const heroSection = document.querySelector('#home');
    heroSection.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".hero-visual img", {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
        });

        gsap.to(".floating-card", {
            x: -xPos * 1.5,
            y: -yPos * 1.5,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    // --- Scroll Reveal Animations (General) ---
    // Select all elements with class 'gs_reveal'
    const revealElements = document.querySelectorAll(".gs_reveal");

    revealElements.forEach((elem) => {
        
        let xVal = 0;
        let yVal = 50;

        if (elem.classList.contains("gs_reveal_fromLeft")) {
            xVal = -50;
            yVal = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
            xVal = 50;
            yVal = 0;
        }

        gsap.fromTo(elem, 
            {
                autoAlpha: 0,
                x: xVal,
                y: yVal
            }, 
            {
                duration: 1.2, 
                autoAlpha: 1, 
                x: 0, 
                y: 0, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%", // Animation starts when top of element hits 85% of viewport height
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // --- Header Background Transition ---
    const header = document.getElementById('header');
    
    ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {className: 'shadow-md', targets: header}
    });
    
    // Add background change on scroll if strictly at top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('bg-white/95');
            header.classList.remove('bg-white/90');
        } else {
            header.classList.add('bg-white/90');
            header.classList.remove('bg-white/95');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('header button');
    const nav = document.querySelector('header nav');
    const bookBtn = document.querySelector('header a[href="#appointment"]');

    if(menuBtn){
        menuBtn.addEventListener('click', () => {
            // Simple toggle for mobile view (styles would need to be adjusted for a proper mobile menu drawer)
            // For now, we'll just toggle the hidden class on the nav for basic visibility
            nav.classList.toggle('hidden');
            nav.classList.toggle('flex');
            nav.classList.toggle('flex-col');
            nav.classList.toggle('absolute');
            nav.classList.toggle('top-16');
            nav.classList.toggle('left-0');
            nav.classList.toggle('w-full');
            nav.classList.toggle('bg-white');
            nav.classList.toggle('p-4');
            nav.classList.toggle('shadow-lg');
        });
    }

});
