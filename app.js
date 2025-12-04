// Main portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('back-to-top');
  const navbar = document.querySelector('.navbar');

  // Active navigation link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // Update ARIA attributes for accessibility
      navToggle.setAttribute('aria-expanded', isExpanded);
      navMenu.setAttribute('aria-hidden', !isExpanded);
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        navToggle.focus();
      }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
      });
    });
    
    // Initialize ARIA attributes
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
  }

  // Scroll handler: back-to-top visibility + navbar style
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (backToTopButton) {
      if (scrollY > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    }

    if (navbar) {
      if (scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Testimonial Slider (guarded so it won't break if markup is missing)
  const testimonialsContainer = document.querySelector('.testimonials-container');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.testimonial-nav-btn.prev');
  const nextBtn = document.querySelector('.testimonial-nav-btn.next');

  if (
    testimonialsContainer &&
    testimonialCards.length &&
    dots.length &&
    prevBtn &&
    nextBtn
  ) {
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    function updateTestimonial(index) {
      testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(100%)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      });

      setTimeout(() => {
        testimonialCards[index].style.display = 'block';
        setTimeout(() => {
          testimonialCards[index].style.opacity = '1';
          testimonialCards[index].style.transform = 'translateX(0)';
        }, 50);
      }, 300);

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentSlide = index;
    }

    // Show first testimonial
    updateTestimonial(0);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateTestimonial(currentSlide);
      });
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateTestimonial(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateTestimonial(currentSlide);
    });

    let slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateTestimonial(currentSlide);
    }, 5000);

    testimonialsContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    testimonialsContainer.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateTestimonial(currentSlide);
      }, 5000);
    });
  }

  // Contact Form Validation and Submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Clear previous errors
      clearErrors();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const subject = formData.get('subject').trim();
      const message = formData.get('message').trim();
      
      // Validate form
      let isValid = true;
      
      if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
      } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
      }
      
      if (!email) {
        showError('email', 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
      } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
      }
      
      if (!isValid) {
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      
      // Submit to Formspree
      try {
        const formAction = this.getAttribute('action');
        if (!formAction || formAction.includes('YOUR_FORM_ID')) {
          showStatus('error', 'Form is not configured. Please set up Formspree form ID in contact.html');
          return;
        }
        
        const formData = new FormData(this);
        const response = await fetch(formAction, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          showStatus('success', 'Thank you for your message! I\'ll get back to you soon.');
          this.reset();
        } else {
          const data = await response.json();
          if (data.errors) {
            showStatus('error', data.errors.map(error => error.message).join(', '));
          } else {
            showStatus('error', 'Sorry, there was an error sending your message. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);
        showStatus('error', 'Sorry, there was an error sending your message. Please try again.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });
  }
  
  function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    
    clearError(fieldName);
    
    switch (fieldName) {
      case 'name':
        if (!value) {
          showError(fieldName, 'Please enter your name');
          return false;
        } else if (value.length < 2) {
          showError(fieldName, 'Name must be at least 2 characters');
          return false;
        }
        break;
        
      case 'email':
        if (!value) {
          showError(fieldName, 'Please enter your email');
          return false;
        } else if (!isValidEmail(value)) {
          showError(fieldName, 'Please enter a valid email address');
          return false;
        }
        break;
        
      case 'message':
        if (!value) {
          showError(fieldName, 'Please enter your message');
          return false;
        } else if (value.length < 10) {
          showError(fieldName, 'Message must be at least 10 characters');
          return false;
        }
        break;
    }
    
    return true;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.add('error');
      const errorElement = field.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = message;
      }
    }
  }
  
  function clearError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.remove('error');
      const errorElement = field.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  }
  
  function clearErrors() {
    const fields = document.querySelectorAll('.contact-form input, .contact-form textarea');
    fields.forEach(field => {
      field.classList.remove('error');
      const errorElement = field.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = '';
      }
    });
  }
  
  function showStatus(type, message) {
    const statusElement = document.getElementById('form-status');
    if (statusElement) {
      statusElement.className = `form-status ${type}`;
      statusElement.textContent = message;
      statusElement.style.display = 'block';
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        statusElement.style.display = 'none';
      }, 5000);
    }
  }

  // Animate skill progress bars when in viewport
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          setTimeout(() => {
            bar.style.width = progress + '%';
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // Add animation for project cards and testimonials
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .project-card {
      animation: fadeIn 0.5s ease-out forwards;
      opacity: 0;
    }

    .testimonial-card {
      transition: all 0.5s ease-in-out;
    }

    @media (max-width: 767px) {
      .testimonials-container {
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
      }

      .testimonial-card {
        scroll-snap-align: start;
      }
    }
  `;
  document.head.appendChild(style);
});
