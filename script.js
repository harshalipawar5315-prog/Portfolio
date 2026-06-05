document.addEventListener('DOMContentLoaded', () => {
    // -------------------------
    // 1. Theme Toggling
    // -------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // -------------------------
    // 2. Mobile Menu Toggling
    // -------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // -------------------------
    // 3. Navbar Scroll & Scroll-to-Top
    // -------------------------
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // -------------------------
    // 4. Fade-in animations
    // -------------------------
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // -------------------------
    // 5. Project Filtering
    // -------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 400); 
                }
            });
        });
    });

    // -------------------------
    // 6. Typed.js Initialization
    // -------------------------
    if (document.querySelector('.typing-text')) {
        new Typed('.typing-text', {
            strings: ['Software Developer', 'Problem Solver', 'Tech Enthusiast'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            loop: true
        });
    }

    // -------------------------
    // 7. Particles.js Initialization
    // -------------------------
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 60,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#8b5cf6" },
                "shape": {
                    "type": "circle",
                    "stroke": { "width": 0, "color": "#000000" },
                    "polygon": { "nb_sides": 5 }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#06b6d4",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }

    // -------------------------
    // 8. Contact Form
    // -------------------------
    const contactForm = document.querySelector('.contact-form');
    const encEmail = "aGFyc2hhbGlwYXdhcjUzMTVAZ21haWwuY29t";
    const myEmail = atob(encEmail);

    // Reveal Email Button handler
    const revealEmailBtn = document.getElementById('reveal-email-btn');
    if (revealEmailBtn) {
        revealEmailBtn.addEventListener('click', () => {
            const emailSpan = document.createElement('span');
            emailSpan.textContent = myEmail;
            emailSpan.style.fontWeight = '500';
            revealEmailBtn.parentNode.replaceChild(emailSpan, revealEmailBtn);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (window.location.protocol === 'file:') {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                const subject = encodeURIComponent("Portfolio Message from " + name);
                const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);
                const mailtoLink = `mailto:${myEmail}?subject=${subject}&body=${body}`;
                showCustomModal({
                    title: "Form Submission Notice",
                    message: `Since you are viewing this portfolio directly as a local file, direct form submission is blocked by browser security rules.<br><br>We have prepared the message in your default email client. You can send it directly to <strong>${myEmail}</strong>.`,
                    icon: "fa-solid fa-envelope-open-text",
                    primaryAction: { text: "Open Mail Client", url: mailtoLink },
                    secondaryAction: { text: "Close" }
                });
            }
            // On live site: native form POST to FormSubmit, redirects back via _next
        });
    }
    function showCustomModal({ title, message, icon, primaryAction, secondaryAction }) {
        const modal = document.createElement('div');
        modal.className = 'custom-modal-backdrop';
        
        let actionsHtml = '';
        if (primaryAction) {
            actionsHtml += `<a href="${primaryAction.url}" class="btn btn-primary" id="modal-primary-btn">${primaryAction.text}</a>`;
        }
        if (secondaryAction) {
            actionsHtml += `<button class="btn btn-secondary" id="modal-secondary-btn">${secondaryAction.text}</button>`;
        }
        
        modal.innerHTML = `
            <div class="custom-modal">
                <div class="custom-modal-icon">
                    <i class="${icon}"></i>
                </div>
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="custom-modal-actions">
                    ${actionsHtml}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        const primaryBtn = modal.querySelector('#modal-primary-btn');
        const secondaryBtn = modal.querySelector('#modal-secondary-btn');
        
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        if (primaryBtn) {
            primaryBtn.addEventListener('click', closeModal);
        }
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', closeModal);
        }
    }
});
