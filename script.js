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
const topVideo = document.querySelector('.top-bg-video');

const updateTopVideoStage = () => {
  if (!siteHeader || !heroSection || !topVideoStage) return;
  topVideoStage.style.top = `${siteHeader.offsetHeight}px`;
  topVideoStage.style.height = `${heroSection.offsetHeight}px`;
};

const loadHeroVideo = async () => {
  if (!topVideo) return;
  const source = topVideo.dataset.videoSource;
  if (!source) return;

  try {
    const response = await fetch(source, { cache: 'force-cache' });
    if (!response.ok) throw new Error('Video non disponibile');

    const base64 = (await response.text()).trim();
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }

    const videoUrl = URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
    topVideo.src = videoUrl;
    topVideo.muted = true;
    topVideo.defaultMuted = true;
    topVideo.loop = true;
    topVideo.playsInline = true;

    await topVideo.play().catch(() => {});
  } catch (error) {
    console.warn('Sfondo video non caricato:', error);
  }
};

window.addEventListener('load', updateTopVideoStage);
window.addEventListener('resize', updateTopVideoStage);
updateTopVideoStage();
loadHeroVideo();
