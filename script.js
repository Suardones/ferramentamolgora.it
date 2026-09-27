const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.main-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();


const catalogFilters = document.querySelectorAll('.catalog-filter');
const catalogProducts = document.querySelectorAll('.product-card[data-category]');

catalogFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    catalogFilters.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    catalogProducts.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});


const siteHeader = document.querySelector('.site-header');
const heroSection = document.querySelector('.hero');
const topVideoStage = document.querySelector('.top-video-stage');
const topVideoFrame = document.querySelector('.top-bg-video-frame');

const sizeBackgroundVideo = () => {
  if (!topVideoStage || !topVideoFrame) return;

  const stageWidth = topVideoStage.clientWidth;
  const stageHeight = topVideoStage.clientHeight;
  const videoRatio = 16 / 9;
  const cropScale = window.innerWidth < 700 ? 1.32 : 1.26;

  let width;
  let height;

  if (stageWidth / stageHeight > videoRatio) {
    width = stageWidth * cropScale;
    height = width / videoRatio;
  } else {
    height = stageHeight * cropScale;
    width = height * videoRatio;
  }

  topVideoFrame.style.width = `${Math.ceil(width)}px`;
  topVideoFrame.style.height = `${Math.ceil(height)}px`;
};

const updateTopVideoStage = () => {
  if (!siteHeader || !heroSection || !topVideoStage) return;
  topVideoStage.style.top = `${siteHeader.offsetHeight}px`;
  topVideoStage.style.height = `${heroSection.offsetHeight}px`;
  sizeBackgroundVideo();
};

const loadBackgroundVideo = () => {
  if (!topVideoStage || !topVideoFrame) return;

  const source = topVideoFrame.dataset.src;
  if (!source || topVideoFrame.src) return;

  let revealTimer;

  topVideoFrame.addEventListener('load', () => {
    clearTimeout(revealTimer);
    revealTimer = window.setTimeout(() => {
      topVideoStage.classList.add('is-video-ready');
    }, 650);
  }, { once: true });

  topVideoFrame.src = source;
};

window.addEventListener('load', () => {
  updateTopVideoStage();

  const startVideo = () => loadBackgroundVideo();

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startVideo, { timeout: 1800 });
  } else {
    window.setTimeout(startVideo, 900);
  }
});

window.addEventListener('resize', updateTopVideoStage);
updateTopVideoStage();
