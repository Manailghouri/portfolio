// Enhanced Portfolio JavaScript with Aesthetic Features
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavigation()
  initAnimations()
  initSkillBars()
  initParticles()
  initScrollEffects()
  initContactForm()
  initThemeEffects()

  // Scroll to section function
  window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Parallax effect for floating shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".shape")

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.5
      const yPos = -(scrolled * speed)
      shape.style.transform = `translateY(${yPos}px)`
    })
  })

  // Contact card click effects
  const contactCards = document.querySelectorAll(".contact-card")
  contactCards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardType = this.querySelector("h3").textContent.toLowerCase()

      if (cardType === "phone") {
        window.open("tel:+923037215353")
      } else if (cardType === "email") {
        window.open("mailto:manailghouri@gmail.com")
      } else if (cardType === "github") {
        window.open("https://github.com/Manailghouri", "_blank")
      }
    })
  })

  // Add scroll indicator click functionality
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        const offsetTop = aboutSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  }
})

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Active navigation link
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const top = section.offsetTop
      const bottom = top + section.offsetHeight
      const id = section.getAttribute("id")

      if (scrollPos >= top && scrollPos <= bottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("data-section") === id) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNavLink)

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Animation initialization
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")

        // Trigger skill bar animations
        if (entry.target.classList.contains("skill-card")) {
          animateSkillBar(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll(
    "section, .about-card, .skill-card, .project-card, .timeline-item, .contact-card",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = "0%"

    // Store the target width for later animation
    bar.dataset.targetWidth = width
  })
}

function animateSkillBar(skillCard) {
  const progressBar = skillCard.querySelector(".skill-progress")
  if (progressBar && !progressBar.classList.contains("animated")) {
    const targetWidth = progressBar.dataset.targetWidth

    setTimeout(() => {
      progressBar.style.width = targetWidth
      progressBar.classList.add("animated")
    }, 300)
  }
}

// Particle system
function initParticles() {
  const particleContainer = document.querySelector(".hero-particles")

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 15 + "s"
    particle.style.animationDuration = Math.random() * 10 + 10 + "s"

    particleContainer.appendChild(particle)

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 25000)
  }

  // Create initial particles
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createParticle(), i * 3000)
  }

  // Continue creating particles
  setInterval(createParticle, 5000)
}

// Scroll effects
function initScrollEffects() {
  let ticking = false

  function updateScrollEffects() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    // Parallax effect for background orbs
    const orbs = document.querySelectorAll(".gradient-orb")
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.3
      orb.style.transform = `translateY(${scrolled * speed}px)`
    })

    // Floating elements parallax
    const floatingElements = document.querySelectorAll(".float-element")
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.2
      element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })

    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick)
}

// Contact form handling
function initContactForm() {
  const form = document.querySelector(".form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(form)
      const data = Object.fromEntries(formData)

      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>'
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        // Reset form
        form.reset()

        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>'
        submitBtn.style.background = "var(--success-color)"

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.style.background = ""
        }, 3000)

        // You can replace this with actual form submission logic
        console.log("Form submitted:", data)
      }, 2000)
    })
  }
}

// Theme effects and interactions
function initThemeEffects() {
  // Cursor follow effect
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: var(--gradient-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    mix-blend-mode: difference;
  `
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"
    cursor.style.opacity = "0.8"
  })

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "0.8"
  })

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
  })

  // Enhanced hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(".btn, .nav-link, .project-card, .contact-card, .social-link")

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
      cursor.style.background = "var(--gradient-secondary)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
      cursor.style.background = "var(--gradient-primary)"
    })
  })

  // Magnetic effect for buttons
  const magneticElements = document.querySelectorAll(".btn")

  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0px, 0px)"
    })
  })

  // Tilt effect for cards
  const tiltElements = document.querySelectorAll(".project-card, .about-card, .contact-card")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    })
  })
}

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Stagger animation for hero elements
  const heroElements = [
    ".hero-badge",
    ".hero-title .title-line:nth-child(1)",
    ".hero-title .title-line:nth-child(2)",
    ".hero-title .title-line:nth-child(3)",
    ".hero-description",
    ".hero-stats",
    ".hero-buttons",
  ]

  heroElements.forEach((selector, index) => {
    const element = document.querySelector(selector)
    if (element) {
      element.style.animationDelay = `${index * 0.1}s`
    }
  })
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
  // Handle scroll events efficiently
}, 16)

window.addEventListener("scroll", optimizedScrollHandler)

// Add loading styles
const loadingStyles = `
  body:not(.loaded) * {
    animation-play-state: paused !important;
  }
  
  .custom-cursor {
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = loadingStyles
document.head.appendChild(styleSheet)
