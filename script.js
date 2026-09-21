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

const updateTopVideoStage = () => {
  if (!siteHeader || !heroSection || !topVideoStage) return;
  topVideoStage.style.height = `${siteHeader.offsetHeight + heroSection.offsetHeight}px`;
};

const updateHeaderState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
};

window.addEventListener('load', updateTopVideoStage);
window.addEventListener('resize', updateTopVideoStage);
window.addEventListener('scroll', updateHeaderState, { passive: true });
updateTopVideoStage();
updateHeaderState();
