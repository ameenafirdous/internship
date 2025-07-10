// Resume Download
document.getElementById('downloadResume').addEventListener('click', function () {
  const link = document.createElement('a');
  link.href = 'Ameena_Firdous_Resume.pdf'; // Replace with your resume file
  link.download = 'Ameena_Firdous_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Minimal fade-in on scroll
const elements = document.querySelectorAll('.fade-in');

const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => scrollObserver.observe(el));
