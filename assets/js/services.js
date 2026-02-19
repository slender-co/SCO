(function() {
  const tabs = document.querySelectorAll('.service-tab');
  const slides = document.querySelectorAll('.service-slide');
  const progressBar = document.getElementById('service-progress');
  const counter = document.getElementById('slide-counter');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  let currentSlide = 0;
  const totalSlides = 4;
  const autoPlayDuration = 6000;
  let autoPlayTimer = null;
  let progressInterval = null;
  let progressStart = 0;

  function goToSlide(index) {
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
    slides.forEach(s => s.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    tabs[currentSlide].classList.add('active');
    counter.textContent = String(currentSlide + 1).padStart(2, '0') + ' / ' + String(totalSlides).padStart(2, '0');
    resetProgress();
  }

  function resetProgress() {
    clearInterval(progressInterval);
    clearTimeout(autoPlayTimer);
    progressStart = Date.now();
    progressBar.style.width = '0%';
    progressInterval = setInterval(() => {
      const elapsed = Date.now() - progressStart;
      const pct = Math.min((elapsed / autoPlayDuration) * 100, 100);
      progressBar.style.width = pct + '%';
      if (pct >= 100) clearInterval(progressInterval);
    }, 50);
    autoPlayTimer = setTimeout(() => {
      goToSlide(currentSlide + 1);
    }, autoPlayDuration);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      goToSlide(parseInt(tab.dataset.index));
    });
  });

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  resetProgress();
})();
