// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navbar effects
    initNavbarEffects();
    
    // Set minimum date for appointment booking
    setMinimumDate();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling and validation
function initFormHandling() {
    const form = document.querySelector('form[name="appointment"]');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Basic form validation
            const requiredFields = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Phone number validation
            const phoneField = document.getElementById('phone');
            const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            
            if (phoneField.value && !phonePattern.test(phoneField.value.replace(/[\s\-\(\)]/g, ''))) {
                phoneField.classList.add('is-invalid');
                isValid = false;
                showNotification('Please enter a valid phone number', 'error');
            }
            
            // Email validation
            const emailField = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailField.value && !emailPattern.test(emailField.value)) {
                emailField.classList.add('is-invalid');
                isValid = false;
                showNotification('Please enter a valid email address', 'error');
            }
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields correctly', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
            submitBtn.disabled = true;
            
            // Note: Netlify will handle the form submission
            // Show success message after a brief delay
            setTimeout(() => {
                showNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
        
        // Real-time validation feedback
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe service cards, pricing cards, and other elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .pricing-card, .feature-item, .scope-item, .gallery-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Navbar effects on scroll
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Set minimum date for appointment booking
function setMinimumDate() {
    const dateInput = document.getElementById('preferredDate');
    
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.min = minDate;
        
        // Set max date to 3 months from now
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Phone number formatting
function formatPhoneNumber(input) {
    const phoneNumber = input.value.replace(/\D/g, '');
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    
    if (phoneNumber.length <= 10) {
        input.value = formattedNumber;
    }
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});

// Gallery lightbox functionality (simple implementation)
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // For now, just show a placeholder message
            // In a real implementation, you would show actual images
            showNotification('Gallery feature coming soon with real salon photos!', 'info');
        });
    });
}

// Initialize gallery on load
document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
});

// Service card hover effects
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize service card effects
document.addEventListener('DOMContentLoaded', function() {
    initServiceCardEffects();
});

// Contact phone number click tracking
function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks (for analytics)
            console.log('Phone number clicked:', this.href);
            
            // You could add analytics tracking here
            // gtag('event', 'phone_call', { phone_number: this.href });
        });
    });
}

// Initialize phone tracking
document.addEventListener('DOMContentLoaded', function() {
    initPhoneTracking();
});
