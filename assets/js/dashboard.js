// Dashboard animations and interactions
(function() {
  const SNAPSHOT_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const snapshot = document.querySelector('.snapshot-frame');
  const dashboardCards = document.querySelectorAll('#client-portal .rounded-2xl');

  // Scroll-triggered animation for snapshot
  const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -80px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('snapshot-visible');
        dashboardCards.forEach((card, index) => {
          setTimeout(() => card.classList.add('card-visible'), index * 120);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  if (snapshot) observer.observe(snapshot);

  // —— Progress Trend: cycle between graph, budget pie, alerts ——
  const trendCard = document.querySelector('.trend-card-wrapper');
  const trendPanels = document.querySelectorAll('.trend-panel');
  const trendDots = document.querySelectorAll('.trend-dot');
  const TREND_CYCLE_MS = 5500;
  let currentTrendPanel = 0;
  let trendInterval;
  let graphAnimationStarted = false;

  function setTrendPanel(index) {
    const next = (index + trendPanels.length) % trendPanels.length;
    if (next === currentTrendPanel) return;
    const leavingPanel = trendPanels[currentTrendPanel];
    const nextPanel = trendPanels[next];
    leavingPanel.classList.add('leaving');
    leavingPanel.classList.remove('active');
    setTimeout(() => {
      leavingPanel.classList.remove('leaving');
      leavingPanel.style.position = 'absolute';
      leavingPanel.style.inset = '0';
      nextPanel.style.position = 'relative';
      nextPanel.style.inset = '';
      nextPanel.classList.add('active');
      currentTrendPanel = next;
      trendDots.forEach((dot, i) => {
        dot.classList.toggle('bg-[var(--brand-cream)]', i === next);
        dot.classList.toggle('bg-zinc-600', i !== next);
      });
      if (next === 0 && !graphAnimationStarted) startGraphAnimation();
      if (next === 2) staggerAlerts();
    }, 460);
  }

  function staggerAlerts() {
    const alerts = document.querySelectorAll('.alert-item');
    alerts.forEach((el, i) => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 80 + i * 120);
    });
  }

  if (trendCard && trendPanels.length) {
    const trendObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTrendPanel(0);
          trendInterval = setInterval(() => {
            setTrendPanel(currentTrendPanel + 1);
          }, TREND_CYCLE_MS);
          trendObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    trendObserver.observe(trendCard);
  }

  // —— Line graph (only when panel 0 is first shown) ——
  const graphContainer = document.getElementById('progress-graph');
  function startGraphAnimation() {
    if (!graphContainer || graphAnimationStarted) return;
    graphAnimationStarted = true;
    const canvas = graphContainer.querySelector('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const data = [45, 52, 58, 63, 68, 72, 75];
    const maxValue = 100;
    const padding = 20;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    let animationProgress = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(82, 82, 91, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
      ctx.strokeStyle = '#DEDDCB';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      const visiblePoints = Math.min(data.length, Math.ceil(data.length * animationProgress));
      for (let i = 0; i < visiblePoints; i++) {
        const x = padding + (graphWidth / (data.length - 1)) * i;
        const y = height - padding - (data[i] / maxValue) * graphHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = '#977555';
      for (let i = 0; i < visiblePoints; i++) {
        const x = padding + (graphWidth / (data.length - 1)) * i;
        const y = height - padding - (data[i] / maxValue) * graphHeight;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (animationProgress < 1) {
        animationProgress += 0.025;
        requestAnimationFrame(draw);
      }
    }
    requestAnimationFrame(draw);
  }

  // When trend panel 0 is shown (e.g. after cycling), ensure graph is drawn
  const checkGraphPanel = setInterval(() => {
    if (currentTrendPanel === 0 && trendPanels[0] && trendPanels[0].classList.contains('active')) {
      if (!graphContainer || !graphContainer.querySelector('canvas')) return;
      const canvas = graphContainer.querySelector('canvas');
      if (canvas && canvas.getContext('2d')) startGraphAnimation();
    }
  }, 500);
  setTimeout(() => clearInterval(checkGraphPanel), 20000);

  // —— Calendar ——
  const calendarContainer = document.getElementById('calendar-widget');
  if (calendarContainer) {
    const calendarDays = [
      { day: 'Mon', date: 12, tasks: ['Framing inspection', 'Material delivery'] },
      { day: 'Tue', date: 13, tasks: ['Electrical rough-in', 'Plumbing review'] },
      { day: 'Wed', date: 14, tasks: ['HVAC installation', 'Site cleanup'] },
      { day: 'Thu', date: 15, tasks: ['Drywall prep', 'Permit review'] },
      { day: 'Fri', date: 16, tasks: ['Weekly meeting', 'Progress photos'] },
      { day: 'Mon', date: 19, tasks: ['Interior framing', 'Quality check'] },
      { day: 'Tue', date: 20, tasks: ['Final inspection prep', 'Documentation'] }
    ];
    let currentDayIndex = 0;

    function updateCalendar() {
      const day = calendarDays[currentDayIndex];
      const dayEl = calendarContainer.querySelector('.calendar-day');
      const dateEl = calendarContainer.querySelector('.calendar-date');
      const tasksList = calendarContainer.querySelector('.calendar-tasks');
      if (dayEl) { dayEl.style.opacity = '0'; dayEl.style.transform = 'translateY(-5px)'; }
      if (dateEl) { dateEl.style.opacity = '0'; dateEl.style.transform = 'translateY(-5px)'; }
      if (tasksList) tasksList.style.opacity = '0';

      setTimeout(() => {
        if (dayEl) {
          dayEl.textContent = day.day;
          dayEl.style.opacity = '1';
          dayEl.style.transform = 'translateY(0)';
        }
        if (dateEl) {
          dateEl.textContent = day.date;
          dateEl.style.opacity = '1';
          dateEl.style.transform = 'translateY(0)';
        }
        if (tasksList) {
          tasksList.innerHTML = '';
          day.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'text-xs text-zinc-400 mb-2 flex items-center gap-2 calendar-task-item';
            li.style.opacity = '0';
            li.style.transform = 'translateX(-10px)';
            li.style.transition = 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
            li.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-[var(--brand-brown)]"></span>${task}`;
            tasksList.appendChild(li);
            setTimeout(() => {
              li.style.opacity = '1';
              li.style.transform = 'translateX(0)';
            }, index * 100);
          });
          tasksList.style.opacity = '1';
        }
        currentDayIndex = (currentDayIndex + 1) % calendarDays.length;
      }, 280);
    }

    let calendarInterval;
    const calendarObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCalendar();
          calendarInterval = setInterval(updateCalendar, 4000);
          calendarObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    calendarObserver.observe(calendarContainer);
  }

  // —— Progress bar ——
  document.querySelectorAll('.progress-bar-animate').forEach(bar => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const w = entry.target.dataset.width || '75%';
          setTimeout(() => { entry.target.style.width = w; }, 400);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    io.observe(bar);
  });
})();
