// ─── INTERSECTION OBSERVER FOR FADE-IN ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in, .fade-up').forEach(el => observer.observe(el));

// ─── COLLAPSIBLE SECTION LOGIC ───
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.collapsible-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');
      const target = document.getElementById(targetId);
      
      if (target) {
        const isOpening = !trigger.classList.contains('active');
        
        // Toggle trigger state
        trigger.classList.toggle('active');
        
        // Toggle content state
        target.classList.toggle('active');
        
        // Update aria-expanded
        trigger.setAttribute('aria-expanded', isOpening);
      }
    });
  });
});

// ─── SOUNDS GRID LOGIC ───
document.addEventListener('DOMContentLoaded', () => {
  const soundButtons = document.querySelectorAll('.sound-btn');
  
  if (soundButtons.length > 0) {
    const synth = window.speechSynthesis;
    
    soundButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Prevent event bubbling if needed
        e.stopPropagation();
        
        const phoneme = btn.getAttribute('data-phoneme');
        if (!phoneme) return;

        // Visual feedback
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 150);

        // Cancel previous speech
        synth.cancel();

        // Create utterance
        const utterance = new SpeechSynthesisUtterance(phoneme);
        
        // Try to make it sound more "phonetic" by adjusting rate/pitch
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        
        // Speak
        synth.speak(utterance);
      });
    });
  }
});

// ─── MOBILE NAV TOGGLE ───
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('active');
      toggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside nav
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
