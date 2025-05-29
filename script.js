document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const navmenu = document.getElementById('navmenu');
    const menuToggle = document.getElementById('menu-toggle');
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('footer');

    // ========== CONFIGURACIÓN EMAILJS ==========
    // REEMPLAZA ESTOS VALORES CON LOS TUYOS:
    const EMAILJS_CONFIG = {
        publicKey: 'rtZd_EBFpL37mKmUF',     // Tu Public Key de EmailJS
        serviceId: 'service_d56mjop',       // Tu Service ID
        templateId: 'template_fl4nw7a'      // Tu Template ID
    };

    // Inicializar EmailJS (solo si está cargado)
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS inicializado correctamente');
    } else {
        console.error('❌ EmailJS no está cargado. Agrega el script de EmailJS.');
    }

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

    // ========== FORMULARIO DE CONTACTO CON EMAILJS ==========
    const contactForm = document.getElementById('contact');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
        console.log('✅ Formulario de contacto encontrado y configurado');
    } else {
        console.warn('⚠️ No se encontró el formulario con id="contact-form"');
    }

    function handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.submit-btn');
        const resultDiv = document.getElementById('contact-result') || createResultDiv(form);
        
        console.log('📤 Procesando envío del formulario...');
        
        // Verificar configuración de EmailJS
        if (typeof emailjs === 'undefined') {
            showMessage(resultDiv, 'error', 'EmailJS no está cargado. Agrega el script de EmailJS.');
            console.error('❌ EmailJS no está disponible');
            return;
        }
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const templateParams = {
            from_name: formData.get('nombre') || '',
            from_email: formData.get('email') || '',
            message: formData.get('mensaje') || '',
            reply_to: formData.get('email') || ''
        };
        
        console.log('📋 Datos del formulario:', templateParams);
        
        // Validar campos requeridos
        if (!templateParams.from_name || !templateParams.from_email || !templateParams.message) {
            showMessage(resultDiv, 'error', 'Por favor, completa todos los campos requeridos.');
            console.warn('⚠️ Campos requeridos faltantes');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(templateParams.from_email)) {
            showMessage(resultDiv, 'error', 'Por favor, ingresa un email válido.');
            console.warn('⚠️ Email inválido:', templateParams.from_email);
            return;
        }
        
        // Cambiar estado del botón
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        submitBtn.style.opacity = '0.7';
        
        showMessage(resultDiv, 'loading', '📧 Enviando tu mensaje...');
        
        console.log('🚀 Enviando email con EmailJS...');
        console.log('Service ID:', EMAILJS_CONFIG.serviceId);
        console.log('Template ID:', EMAILJS_CONFIG.templateId);
        
        // Enviar con EmailJS
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
            .then(function(response) {
                console.log('✅ Email enviado exitosamente:', response.status, response.text);
                showMessage(resultDiv, 'success', '¡Mensaje enviado correctamente! Te responderemos pronto. 🎉');
                form.reset();
                
                // Efecto de éxito opcional
                if (submitBtn) {
                    submitBtn.style.background = '#28a745';
                    setTimeout(() => {
                        submitBtn.style.background = '';
                    }, 2000);
                }
            })
            .catch(function(error) {
                console.error('❌ Error al enviar email:', error);
                
                let errorMessage = 'Error al enviar el mensaje. ';
                
                if (error.status === 422) {
                    errorMessage += 'Verifica la configuración de tu plantilla en EmailJS.';
                    console.error('Error 422: Problema con la plantilla o parámetros');
                } else if (error.status === 400) {
                    errorMessage += 'Datos del formulario inválidos.';
                    console.error('Error 400: Datos inválidos');
                } else if (error.status === 403) {
                    errorMessage += 'Verifica tu Public Key de EmailJS.';
                    console.error('Error 403: Problema de autenticación');
                } else if (error.status === 404) {
                    errorMessage += 'Servicio o plantilla no encontrados.';
                    console.error('Error 404: Service/Template no encontrado');
                } else {
                    errorMessage += 'Inténtalo de nuevo más tarde.';
                    console.error('Error desconocido:', error);
                }
                
                showMessage(resultDiv, 'error', errorMessage);
            })
            .finally(function() {
                // Restaurar botón
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                }
                console.log('🔄 Proceso completado');
            });
    }
    
    function createResultDiv(form) {
        const resultDiv = document.createElement('div');
        resultDiv.id = 'contact-result';
        resultDiv.style.marginTop = '20px';
        form.parentNode.insertBefore(resultDiv, form.nextSibling);
        console.log('📝 Div de resultados creado');
        return resultDiv;
    }
    
    function showMessage(container, type, message) {
        const messageClass = {
            success: 'contact-success',
            error: 'contact-error', 
            loading: 'contact-loading'
        };
        
        const styles = {
            success: 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;',
            error: 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;',
            loading: 'background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;'
        };
        
        container.innerHTML = `<div class="contact-message ${messageClass[type]}" style="
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            font-weight: 500;
            transition: all 0.3s ease;
            text-align: center;
            ${styles[type]}
        ">${message}</div>`;
        
        // Animación de entrada
        const messageEl = container.querySelector('.contact-message');
        if (messageEl) {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                messageEl.style.opacity = '1';
                messageEl.style.transform = 'translateY(0)';
            }, 50);
        }
        
        // Auto-ocultar mensaje después de 5 segundos (solo success y loading)
        if (type === 'success') {
            setTimeout(() => {
                if (container.querySelector('.contact-message')) {
                    const msg = container.querySelector('.contact-message');
                    msg.style.opacity = '0';
                    msg.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        container.innerHTML = '';
                    }, 300);
                }
            }, 5000);
        }
        
        console.log(`💬 Mensaje mostrado (${type}):`, message);
    }

    // ========== FUNCIÓN DE PRUEBA DE EMAILJS ==========
    // Descomenta esta función si quieres probar EmailJS directamente
    /*
    function testEmailJS() {
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS no está cargado');
            return;
        }
        
        const testParams = {
            from_name: 'Test Usuario',
            from_email: 'test@example.com',
            subject: 'Test de EmailJS',
            message: 'Este es un mensaje de prueba desde EmailJS',
            reply_to: 'test@example.com'
        };
        
        console.log('🧪 Iniciando prueba de EmailJS...');
        
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, testParams)
            .then((response) => {
                console.log('✅ Prueba exitosa:', response);
            })
            .catch((error) => {
                console.error('❌ Error en prueba:', error);
            });
    }
    
    // Llama a testEmailJS() en la consola para probar
    window.testEmailJS = testEmailJS;
    */

    // Resto de tu código original
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