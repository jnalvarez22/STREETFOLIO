gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHero() {
    if (prefersReducedMotion) return;
    gsap.from('.hero .reveal', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
    });
}

function initScrollReveals() {
    if (prefersReducedMotion) return;
    gsap.utils.toArray('.reveal:not(.hero .reveal)').forEach((el) => {
        gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

function initProjectsScroll() {
    if (prefersReducedMotion) return;
    const wrapper = document.querySelector('.projects-wrapper');
    if (!wrapper) return;
    const cards = gsap.utils.toArray('.project-card');
    gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.projects-container',
            start: 'top top',
            end: () => `+=${wrapper.scrollWidth}`,
            pin: true,
            scrub: 1,
            snap: 1 / (cards.length - 1)
        }
    });
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if(target){
                e.preventDefault();
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if(navbarCollapse.classList.contains('show')){
                    bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
                }
                const navHeight = navbar.offsetHeight;
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo:{y:target, offsetY:navHeight},
                    ease:'power2.inOut'
                });
            }
        });
    });

    ScrollTrigger.create({
        onUpdate: () => {
            const scrollPos = window.scrollY + navbar.offsetHeight + 100;
            navLinks.forEach(link=>{
                const targetId = link.getAttribute('href');
                if(!targetId || targetId==='#') return;
                const target = document.querySelector(targetId);
                if(!target) return;
                if(target.offsetTop <= scrollPos && target.offsetTop + target.offsetHeight > scrollPos){
                    navLinks.forEach(l=>l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('load', () => {
    initHero();
    initScrollReveals();
    initProjectsScroll();
    initNavbar();
    ScrollTrigger.refresh();
});