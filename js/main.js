// ========================================
// SUNAN GUNUNG JATI - MAIN JAVASCRIPT
// Interactive behaviors for main website
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION ========== 
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only smooth scroll for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    const spans = navToggle?.querySelectorAll('span');
                    if (spans) {
                        spans[0].style.transform = '';
                        spans[1].style.opacity = '';
                        spans[2].style.transform = '';
                    }
                    
                    // Smooth scroll to section
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    updateActiveLink(link);
                }
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Intersection Observer for active nav links
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -66%'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (correspondingLink) {
                    updateActiveLink(correspondingLink);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ========== SCROLL ANIMATIONS ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.history-card, .gallery-item, .info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };
    
    animateOnScroll();
    
    // ========== GALLERY LIGHTBOX EFFECT ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // Create simple lightbox overlay
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                    padding: 2rem;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxImg.style.cssText = `
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border-radius: 1rem;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                `;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                // Fade in
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                // Close on click
                lightbox.addEventListener('click', () => {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                });
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
                lightbox.addEventListener('click', () => {
                    document.body.style.overflow = '';
                }, { once: true });
            }
        });
    });
    
    // ========== HERO PARALLAX EFFECT ==========
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ========== PERFORMANCE: Lazy load images ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========== EASTER EGG: Console message ==========
    console.log('%c🕌 Sunan Gunung Jati - Immersive Learning', 'font-size: 20px; font-weight: bold; color: #8B4513;');
    console.log('%cPowered by DAC Indonesia', 'font-size: 14px; color: #D4AF37;');
    console.log('%cDeveloped with ❤️ for education', 'font-size: 12px; color: #6B4423;');
    
    // ========== ACCESSIBILITY: Keyboard navigation ==========
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
    });
    
    // ========== PERFORMANCE: Debounce utility ==========
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounce scroll events for better performance
    const debouncedScroll = debounce(() => {
        // Additional scroll handlers can go here
    }, 100);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // ========== ANALYTICS: Track page engagement (optional) ==========
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage++;
        // You can send this data to analytics service if needed
    }, 1000);
    
    // Log page unload
    window.addEventListener('beforeunload', () => {
        console.log(`Time spent on page: ${timeOnPage} seconds`);
    });
    
});

// ========== UTILITY FUNCTIONS ==========

// Format time for display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}
