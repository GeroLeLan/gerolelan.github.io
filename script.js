// Language Toggle Functionality
const langToggle = document.getElementById('langToggle');
const langOptions = document.querySelectorAll('.lang-option');
let currentLang = 'en';

// Initialize language based on browser preference
function initLanguage() {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
        currentLang = 'es';
        updateLanguage('es');
    }
}

// Update language display
function updateLanguage(lang) {
    currentLang = lang;
    
    // Update active state in toggle
    langOptions.forEach(option => {
        if (option.dataset.lang === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

// Language toggle click handler
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    updateLanguage(newLang);
});

// Individual language option click
langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        updateLanguage(option.dataset.lang);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.timeline-item, .skill-category, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Parallax effect for hero background
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg && scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
    
    lastScrollY = scrollY;
}, { passive: true });

// Enhanced code window typing effect
function typeCode() {
    const codeContent = document.querySelector('.code-content code');
    if (!codeContent) return;
    
    const originalContent = codeContent.innerHTML;
    codeContent.innerHTML = '';
    
    let i = 0;
    const speed = 15;
    
    function type() {
        if (i < originalContent.length) {
            const char = originalContent.charAt(i);
            const nextChar = originalContent.charAt(i + 1);
            
            // Check if we're at the start of a tag
            if (char === '<') {
                const closingBracket = originalContent.indexOf('>', i);
                codeContent.innerHTML += originalContent.substring(i, closingBracket + 1);
                i = closingBracket + 1;
            } else {
                codeContent.innerHTML += char;
                i++;
            }
            
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Animate neural network
function animateNeuralNetwork() {
    const connections = document.querySelectorAll('.connections line');
    
    connections.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '0.3';
            line.style.transition = 'opacity 0.5s ease-in-out';
            
            setInterval(() => {
                const randomOpacity = Math.random() * 0.5 + 0.2;
                line.style.opacity = randomOpacity;
            }, 2000 + index * 100);
        }, index * 50);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        updateLanguage(savedLang);
    } else {
        initLanguage();
    }
    
    // Start animations
    setTimeout(typeCode, 1000);
    animateNeuralNetwork();
});

// Add cursor effect on hero section
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = hero.getBoundingClientRect();
        
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
    });
}

// Contact card hover effect enhancement
document.querySelectorAll('.contact-card:not(.location)').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add styles for icon transitions
document.querySelectorAll('.contact-icon').forEach(icon => {
    icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Tech tags hover effect
document.querySelectorAll('.tech-tags span, .skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}
