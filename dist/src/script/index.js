// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu
        document.getElementById('navLinks').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Active navigation on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateStat = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
            current += 1;
            stat.textContent = current + '+';
            if (current == target) {
                clearInterval(timer);
            }
        }, stepTime);
    });
};

// Trigger animation when stats are in view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStat();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (document.querySelector('.about-stats')) {
    observer.observe(document.querySelector('.about-stats'));
}

// Form handling
const form = document.querySelector('.contact-form');
const msg = document.getElementById('msg');

if (form && msg) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('Name');
        const email = formData.get('Email');
        const message = formData.get('Message');
        
        // Simulate form submission
        msg.textContent = 'Sending...';
        msg.className = '';
        
        setTimeout(() => {
            msg.textContent = `Thanks ${name}! Your message has been sent.`;
            msg.className = 'success';
            form.reset();
            
            setTimeout(() => {
                msg.textContent = '';
                msg.className = '';
            }, 5000);
        }, 1500);
    });
}

// Preload images
const images = document.querySelectorAll('img');
images.forEach(img => {
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });
    }
});

// Parallax effect for shapes
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const shape1 = document.querySelector('.shape-1');
    const shape2 = document.querySelector('.shape-2');
    const shape3 = document.querySelector('.shape-3');
    
    if (shape1) {
        shape1.style.top = (-100 + scrolled * 0.1) + 'px';
    }
    if (shape2) {
        shape2.style.bottom = (-50 - scrolled * 0.05) + 'px';
    }
    if (shape3) {
        shape3.style.top = (40 + scrolled * 0.08) + 'px';
        shape3.style.left = (10 + scrolled * 0.03) + 'px';
    }
});

// Add hover effects to cards
const serviceCards = document.querySelectorAll('.service-card');
const skillCards = document.querySelectorAll('.skill-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
    });
});

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Fade in on scroll
const fadeInElements = document.querySelectorAll('.about-content, .service-card, .skill-card, .contact-content');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    fadeInObserver.observe(el);
});
