// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    
    // Animate links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeInLinks 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Hamburger animation
    hamburger.classList.toggle('toggle');
});

// Skill bar animation
const skillSections = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-progress');

// Flag to track if animation has already played
let skillsAnimated = false;

const showSkills = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    const skillsTop = skillSections.getBoundingClientRect().top;
    
    if (skillsTop < triggerBottom && !skillsAnimated) {
        skillsAnimated = true;
        
        skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300 + (index * 100)); // Staggered animation
        });
    }
};

window.addEventListener('scroll', showSkills);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
            
            links.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});