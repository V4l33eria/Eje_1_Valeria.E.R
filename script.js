document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const navmenu = document.getElementById('navmenu');
    const menuToggle = document.getElementById('menu-toggle');
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('footer');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    function toggleMenu() {
        header.classList.toggle('show');
        if (header.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
            mainContent.style.marginLeft = '0';
            footer.style.marginLeft = '0';
        } else {
            document.body.style.overflow = '';
            if (window.innerWidth >= 992) {
                mainContent.style.marginLeft = '260px';
                footer.style.marginLeft = '260px';
            }
        }
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992 && header.classList.contains('show')) {
            header.classList.remove('show');
            document.body.style.overflow = '';
            mainContent.style.marginLeft = '260px';
            footer.style.marginLeft = '260px';
        } else if (window.innerWidth < 992 && !header.classList.contains('show')) {
            mainContent.style.marginLeft = '0';
            footer.style.marginLeft = '0';
        }
    });

    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        new Typed(typedTextElement, {
            strings: ["Estudiante en la UTLD", "Creativa"],
            loop: true,
            typeSpeed: 70,
            backSpeed: 30,
            backDelay: 1500,
        });
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navmenu a');

    const activateNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const offset = window.innerHeight * 0.3;
            if (pageYOffset >= sectionTop - offset && pageYOffset < sectionTop + sectionHeight - offset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);
    window.addEventListener('load', activateNavLink);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();

                const targetId = this.hash;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    if (window.innerWidth <= 991 && header.classList.contains('show')) {
                        toggleMenu();
                    }
                }
            }
        });
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                el.classList.add('show');

                if (el.classList.contains('skill-item')) {
                    const delay = el.dataset.delay || '0s';
                    el.style.transitionDelay = delay;
                }

                if (el.id === 'skills') {
                    const skillItems = el.querySelectorAll('.skill-item');
                    skillItems.forEach(item => {
                        const progressBar = item.querySelector('.progress-bar');
                        if (progressBar) {
                            const width = progressBar.style.width;
                            progressBar.style.width = width;
                        }
                    });
                }

                if (el.classList.contains('portfolio-item')) {
                    const overlay = el.querySelector('.image-overlay');
                    if (overlay) {
                        el.classList.add('revealed');
                    }
                }

                fadeInObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach((el) => {
        fadeInObserver.observe(el);
    });

    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgressBar.style.width = `${progress}%`;
        });
    }

    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');

    if (cursor && follower) {
        document.body.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
        });

        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .data-card, .portfolio-item, .service-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });

        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            document.documentElement.setAttribute('data-cursor-hidden', 'true');
        } else {
            document.documentElement.removeAttribute('data-cursor-hidden');
        }
    }

    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const parallaxBgElements = document.querySelectorAll('.parallax-bg');
    const parallaxContentElements = document.querySelectorAll('.parallax-element');

    const updateParallax = () => {
        const scrollPos = window.pageYOffset;

        parallaxBgElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0;
            if (speed > 0) {
                el.style.transform = `translateY(${scrollPos * speed}px)`;
            }
        });

        parallaxContentElements.forEach(el => {
            const speedY = parseFloat(el.dataset.speedY) || 0;
            if (speedY > 0) {
                el.style.transform = `translateY(${scrollPos * speedY}px)`;
            }
        });
    };

    if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        window.addEventListener('scroll', updateParallax);
        window.addEventListener('load', updateParallax);
    } else {
        parallaxBgElements.forEach(el => el.style.transform = 'none');
        parallaxContentElements.forEach(el => el.style.transform = 'none');
    }

    const easterEggTriggerEmail = document.querySelector('#easter-egg-trigger a[href^="mailto:"]');
    const easterEggTriggerCard = document.querySelector('#easter-egg-trigger');
    const popupOverlay = document.getElementById('easter-egg-popup');
    const closePopupBtn = popupOverlay ? popupOverlay.querySelector('.close-btn') : null;

    if (easterEggTriggerEmail && popupOverlay && closePopupBtn) {
        easterEggTriggerEmail.addEventListener('click', (e) => {
            e.preventDefault();
            popupOverlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        });

        if (easterEggTriggerCard) {
            easterEggTriggerCard.addEventListener('click', (e) => {
                if (e.target.closest('a') !== easterEggTriggerEmail) {
                    popupOverlay.classList.add('visible');
                    document.body.style.overflow = 'hidden';
                }
            });
        }

        closePopupBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('visible');
            document.body.style.overflow = '';
        });

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('visible');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupOverlay.classList.contains('visible')) {
                popupOverlay.classList.remove('visible');
                document.body.style.overflow = '';
            }
        });
    }

    // Configuración inicial de márgenes
    if (window.innerWidth >= 992) {
        mainContent.style.marginLeft = '260px';
        footer.style.marginLeft = '260px';
    } else {
        mainContent.style.marginLeft = '0';
        footer.style.marginLeft = '0';
    }

    activateNavLink();
    updateParallax();
    
    console.log('🎉 Aplicación inicializada correctamente');
});