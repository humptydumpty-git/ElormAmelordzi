// Main portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('back-to-top');
  const navbar = document.querySelector('.navbar');

  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
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
