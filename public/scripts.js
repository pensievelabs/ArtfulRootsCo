// ─── INTERSECTION OBSERVER FOR FADE-IN ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

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
