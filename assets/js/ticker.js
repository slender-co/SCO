// Ticker data
const tickerData = [
  {
    label: 'Project Management',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2700&auto=format&fit=crop'
  },
  {
    label: 'Superintendent',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2700&auto=format&fit=crop'
  },
  {
    label: 'Permitting',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2700&auto=format&fit=crop'
  },
  {
    label: 'Consulting',
    img: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2700&auto=format&fit=crop'
  },
  {
    label: 'Renovations',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop'
  },
  {
    label: 'New Builds',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2700&auto=format&fit=crop'
  },
  {
    label: 'Commercial',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2700&auto=format&fit=crop'
  },
  {
    label: 'Residential',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400',
    bg: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop'
  },
];

const track = document.getElementById('ticker-track');
const heroBgImg = document.getElementById('hero-bg-img');

function buildTickerItems(data) {
  let html = '';
  data.forEach((item, i) => {
    html += `<div class="ticker-item${i === 0 ? ' active' : ''}" data-index="${i}" data-bg="${item.bg}">
        <span class="ticker-dot"></span>
        <span class="ticker-label">${item.label}</span>
        <div class="ticker-img-wrapper">
            <img src="${item.img}" alt="${item.label}" loading="lazy">
        </div>
    </div>`;
  });
  return html;
}

const itemsHtml = buildTickerItems(tickerData);
track.innerHTML = itemsHtml + itemsHtml;

let currentActive = 0;
const totalItems = tickerData.length;
let isHovering = false;

function setActive(index) {
  const allItems = track.querySelectorAll('.ticker-item');
  allItems.forEach(el => el.classList.remove('active'));
  allItems.forEach(el => {
    if (parseInt(el.dataset.index) === index) {
      el.classList.add('active');
    }
  });
  heroBgImg.style.opacity = '0';
  setTimeout(() => {
    heroBgImg.src = tickerData[index].bg;
    heroBgImg.style.opacity = '0.6';
  }, 350);
}

setInterval(() => {
  if (isHovering) return;
  currentActive = (currentActive + 1) % totalItems;
  setActive(currentActive);
}, 3000);

track.querySelectorAll('.ticker-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    isHovering = true;
    const idx = parseInt(item.dataset.index);
    currentActive = idx;
    setActive(idx);
  });
  item.addEventListener('mouseleave', () => {
    isHovering = false;
  });
});

const trackWidth = track.scrollWidth / 2;
const duration = Math.max(30, trackWidth / 50);
track.style.setProperty('--ticker-duration', duration + 's');
