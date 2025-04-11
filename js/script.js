/* 
* Wanderlust Travel Website JavaScript
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100,
        disable: 'mobile' // Disable animations on mobile devices
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Destination & Package Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Destination Filtering
            const destinationCards = document.querySelectorAll('.destination-card');
            if (destinationCards.length > 0) {
                destinationCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
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
                    }
                });
            }
            
            // Package Filtering
            const packageItems = document.querySelectorAll('.package-item');
            if (packageItems.length > 0) {
                packageItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            }
        });
    });
    
    // Testimonial Carousel (if on testimonials page)
    const testimonialCards = document.querySelectorAll('.testimonial-carousel .testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonialCards.length > 1) {
        // Show first testimonial
        testimonialCards[0].classList.add('active');
        
        const nextTestimonial = document.querySelector('.testimonial-next');
        const prevTestimonial = document.querySelector('.testimonial-prev');
        
        // Next button
        if (nextTestimonial) {
            nextTestimonial.addEventListener('click', function() {
                testimonialCards[currentTestimonial].classList.remove('active');
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                testimonialCards[currentTestimonial].classList.add('active');
            });
        }
        
        // Previous button
        if (prevTestimonial) {
            prevTestimonial.addEventListener('click', function() {
                testimonialCards[currentTestimonial].classList.remove('active');
                currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                testimonialCards[currentTestimonial].classList.add('active');
            });
        }
        
        // Auto rotate testimonials
        setInterval(() => {
            testimonialCards[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            testimonialCards[currentTestimonial].classList.add('active');
        }, 5000);
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Form validation for contact and booking forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const emailField = form.querySelector('input[type="email"]');
            
            if (emailField && !validateEmail(emailField.value)) {
                valid = false;
                showError(emailField, 'Please enter a valid email address');
            }
            
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    showError(field, 'This field is required');
                }
            });
            
            if (!valid) {
                e.preventDefault();
            } else {
                // In a real app, this would submit the form
                // For this demo, we'll just show a success message
                e.preventDefault();
                form.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you! Your submission has been received.</p></div>';
            }
        });
    });
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        
        // Remove any existing error messages
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to input
        field.classList.add('error');
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        
        // Remove error when field is focused
        field.addEventListener('focus', function() {
            this.classList.remove('error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to destination cards
    const cards = document.querySelectorAll('.destination-card, .package-card');
    cards.forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', `${index * 100}`);
    });

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.setAttribute('data-aos', 'fade-up');
    });
}); 