const topBtn = document.getElementById('topBtn');

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');
const modalLive = document.getElementById('modalLive');
const modalGithub = document.getElementById('modalGithub');
const cards = document.querySelectorAll('.project-card');

const progressBar = document.getElementById('progressBar');
const navDots = document.querySelectorAll('.side-nav span');

const sections = [
  document.querySelector('.hero'),
  document.getElementById('video'),
  document.getElementById('process'),
  document.getElementById('projects'),
  document.getElementById('contact')
];

// 스크롤 기능
window.addEventListener('scroll', () => {
  // top 버튼
  topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';

  // 상단 진행바
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressBar.style.width = scrollPercent + '%';

  // 오른쪽 점 현재 위치 표시
  let current = 0;

  sections.forEach((section, index) => {
    if (!section) return;

    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      current = index;
    }
  });

  navDots.forEach(dot => dot.classList.remove('active'));

  if (navDots[current]) {
    navDots[current].classList.add('active');
  }
});

// top 버튼
topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 오른쪽 점 클릭 이동
navDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (!sections[index]) return;

    sections[index].scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 프로젝트 모달
cards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.project-links')) return;

    modalImage.src = card.dataset.image || '';
    modalTitle.textContent = card.dataset.title || '프로젝트 제목';
    modalDesc.textContent = card.dataset.desc || '프로젝트 설명이 여기에 들어갑니다.';

    const techs = (card.dataset.tech || '').split(',');
    modalMeta.innerHTML = techs
      .filter(t => t.trim() !== '')
      .map(t => `<span>${t.trim()}</span>`)
      .join('');

    modalLive.href = card.dataset.live || '#';
    modalGithub.href = card.dataset.github || '#';

    modal.classList.add('show');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
  }
});

// 팀 영상 재생 버튼
const video = document.querySelector('.film-video');
const playBtn = document.getElementById('playBtn');

if (video && playBtn) {
  playBtn.addEventListener('click', () => {
    video.muted = false;
    video.controls = true;
    video.play();
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

revealItems.forEach(item => {
  revealObserver.observe(item);
});