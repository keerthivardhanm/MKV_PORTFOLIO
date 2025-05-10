// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00fff7"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00fff7",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle scroll-to-top button visibility
        const scrollToTop = document.querySelector('.scroll-to-top');
        if (scrollPosition > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });

    // Scroll to section on link click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typewriter Effect
    const typewriterElement = document.querySelector('.typewriter');
    let typed = new Typed(typewriterElement, {
        strings: ['Cybersecurity Architect', 'Progressive Web App Developer', 'Creative Technologist', 'Full Stack Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Initialize VanillaTilt for project cards
    function initTilt() {
        VanillaTilt.init(document.querySelectorAll('.project-card'), {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.3
        });
    }

    // Skills Tab Switching
    const skillsCategories = document.querySelectorAll('.category');
    const skillsContents = document.querySelectorAll('.skills-category');

    skillsCategories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryValue = category.getAttribute('data-category');
            
            // Update active class for categories
            skillsCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            
            // Show/hide skills content
            skillsContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${categoryValue}-skills`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project Modal
    function setupModal() {
        const modal = document.getElementById('project-modal');
        const closeBtn = document.querySelector('.close-modal');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const description = card.getAttribute('data-description');
                const image = card.querySelector('img').src;
                const technologies = JSON.parse(card.getAttribute('data-technologies'));
                const githubLink = card.getAttribute('data-github');
                const liveLink = card.getAttribute('data-live');
                
                // Update modal content
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-description').textContent = description;
                document.getElementById('modal-image').src = image;
                
                // Update technologies
                const techList = document.getElementById('modal-tech-list');
                techList.innerHTML = '';
                technologies.forEach(tech => {
                    const techTag = document.createElement('span');
                    techTag.classList.add('tech-tag');
                    techTag.textContent = tech;
                    techList.appendChild(techTag);
                });
                
                // Update links
                document.getElementById('modal-github').href = githubLink;
                document.getElementById('modal-live').href = liveLink;
                
                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside content
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on page load

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(progressBar => {
            const progress = progressBar.querySelector('.progress');
            const percentage = progressBar.getAttribute('data-progress');
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progress.style.width = `${percentage}%`;
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(progressBar);
        });
    }
    
    animateProgressBars();

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            formError.classList.add('show');
            setTimeout(() => {
                formError.classList.remove('show');
            }, 3000);
            return;
        }
        
        // Normally we would send the form data to a server here
        // For this demo, we'll just show a success message
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        formSuccess.classList.add('show');
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 3000);
    });

    // Resume download button
 document.getElementById('download-resume').addEventListener('click', function(e) {
    e.preventDefault();

    // Open the resume file in a new window
    window.open('https://drive.google.com/file/d/1435V97Zccs1gp2vOLtmWzsWnTULaZzu7/view?usp=sharing', '_blank');
 });

});