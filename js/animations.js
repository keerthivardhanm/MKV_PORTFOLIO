// Additional animations and visual effects

document.addEventListener('DOMContentLoaded', () => {
    // Matrix Rain Effect
    function createMatrixRain() {
        const matrixBg = document.querySelector('.matrix-bg');
        
        if (!matrixBg) return;
        
        const matrixRain = document.createElement('div');
        matrixRain.className = 'matrix-rain';
        matrixBg.appendChild(matrixRain);
        
        const width = matrixBg.offsetWidth;
        const height = matrixBg.offsetHeight;
        
        // Create drops
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'matrix-drop';
            
            // Random positioning
            drop.style.left = `${Math.random() * width}px`;
            drop.style.top = `${Math.random() * height}px`;
            drop.style.height = `${Math.random() * 30 + 10}px`;
            drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            
            matrixRain.appendChild(drop);
        }
    }
    
    // Parallax effect
    function setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const layers = element.querySelectorAll('.parallax-layer');
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const offsetX = (mouseX - centerX) / centerX;
                const offsetY = (mouseY - centerY) / centerY;
                
                layers.forEach((layer, index) => {
                    const depth = index * 10 + 5;
                    const moveX = offsetX * depth;
                    const moveY = offsetY * depth;
                    
                    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                });
            });
            
            element.addEventListener('mouseleave', () => {
                layers.forEach(layer => {
                    layer.style.transform = 'translate3d(0, 0, 0)';
                });
            });
        });
    }
    
    // Add glass morphism effect to cards
    function addGlassEffect() {
        const cards = document.querySelectorAll('.project-card, .contact-card, .timeline-content');
        
        cards.forEach(card => {
            card.classList.add('glass-card');
        });
    }
    
    // Text highlight animation
    function setupTextHighlight() {
        const headings = document.querySelectorAll('h2, h3');
        
        headings.forEach(heading => {
            heading.classList.add('highlight-text');
        });
    }
    
    // Apply noise texture overlay
    function applyNoiseTexture() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            section.classList.add('noise');
        });
    }
    
    // Add floating animation to elements
    function addFloatingAnimation() {
        const elements = document.querySelectorAll('.about-image, .contact-card-icon');
        
        elements.forEach(element => {
            element.classList.add('float');
        });
    }
    
    // Add pulsating effect to buttons
    function addPulseEffect() {
        const buttons = document.querySelectorAll('.btn-primary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('pulse');
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.remove('pulse');
            });
        });
    }
    
    // Make section titles glow
    function addNeonEffect() {
        const sectionTitles = document.querySelectorAll('.section-title h2');
        
        sectionTitles.forEach(title => {
            title.classList.add('neon-text');
        });
    }
    
    // Add shake animation to form submit button
    function addShakeEffect() {
        const formButton = document.querySelector('.contact-form button');
        
        if (formButton) {
            formButton.classList.add('shake-on-hover');
        }
    }
    
    // Add wave animation to footer
    function addWaveAnimation() {
        const footer = document.querySelector('footer');
        
        if (footer) {
            footer.classList.add('wave-animation');
        }
    }
    
    // Add glow border effect to skill items
    function addGlowBorder() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.classList.add('glow-border');
        });
    }
    
    // Initialize all animations
    function initAnimations() {
        setupParallax();
        addGlassEffect();
        setupTextHighlight();
        applyNoiseTexture();
        addFloatingAnimation();
        addPulseEffect();
        addNeonEffect();
        addShakeEffect();
        addWaveAnimation();
        addGlowBorder();
        
        // Only apply matrix rain to elements with the class
        createMatrixRain();
    }
    
    // Run animations after a short delay to ensure the page is loaded
    setTimeout(initAnimations, 1000);
    
    // Add cube spinner to preloader
    function enhancePreloader() {
        const loader = document.querySelector('.loader');
        
        if (!loader) return;
        
        const cubeSpinner = document.createElement('div');
        cubeSpinner.className = 'cube-spinner';
        
        const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
        
        faces.forEach(face => {
            const faceElement = document.createElement('div');
            faceElement.className = `face face-${face}`;
            cubeSpinner.appendChild(faceElement);
        });
        
        loader.prepend(cubeSpinner);
    }
    
    enhancePreloader();
    
    // Scroll trigger for animated elements
    function setupScrollTriggers() {
        const animatedElements = document.querySelectorAll('.skill-item, .project-card, .timeline-item, .contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach((element, index) => {
            // Add delay class based on index
            const delayClass = `delay-${(index % 5) + 1}`;
            element.classList.add(delayClass);
            
            observer.observe(element);
        });
    }
    
    setupScrollTriggers();
});