// Always start from the top — disable browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const bootLog = document.getElementById('bootLog');
const bootScreen = document.querySelector('.boot-screen');
const siteShell = document.querySelector('.site-shell');
const logLines = [
  '> Initializing Portfolio...',
  '> Loading security routines...',
  '> Running vulnerability scan...',
  '> Parsing UI modules...',
  '> Completing checksum...',
  '> Access Granted'
];

let currentLine = 0;
let currentChar = 0;

function typeBootLine() {
  if (!bootLog) return;
  const line = logLines[currentLine];
  bootLog.textContent = logLines.slice(0, currentLine).join('\n') + (currentLine ? '\n' : '') + line.slice(0, currentChar);
  if (currentChar <= line.length) {
    currentChar += 1;
    setTimeout(typeBootLine, 45);
    return;
  }

  currentLine += 1;
  currentChar = 0;
  if (currentLine < logLines.length) {
    setTimeout(typeBootLine, 550);
  } else {
    setTimeout(finishBoot, 800);
  }
}

function finishBoot() {
  if (bootScreen && siteShell) {
    bootScreen.classList.add('hide');
    siteShell.classList.remove('hide');
    document.body.style.overflow = 'auto';
    // Snap to top after boot so hero is always first
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

const typingElement = document.getElementById('typing-text');
const phrases = [
  'Detecting threats...',
  'Securing interfaces...',
  'Analyzing payloads...',
  'Deploying resilient builds...'
];
let phraseIndex = 0;
let charIndex = 0;
let removing = false;

function updateTyping() {
  if (!typingElement) return;
  const phrase = phrases[phraseIndex];
  if (!removing) {
    typingElement.textContent = phrase.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === phrase.length) {
      removing = true;
      setTimeout(updateTyping, 1400);
      return;
    }
  } else {
    typingElement.textContent = phrase.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      removing = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(updateTyping, removing ? 60 : 95);
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const active = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', active ? 'true' : 'false');
  });
}

const caseToggles = document.querySelectorAll('.case-toggle');
caseToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.case-card');
    if (!card) return;
    const expanded = card.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.section, .scan-shell, .case-card, .experiment-card, .cert-card, .panel-card').forEach((el) => {
  revealObserver.observe(el);
});

// Scroll-reveal for hobby cards
const hobbyRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        hobbyRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.hobby-card').forEach((card) => {
  hobbyRevealObserver.observe(card);
});

// Resume button microinteraction — ripple flash on click
const resumeBtn = document.getElementById('resumeDownloadBtn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', () => {
    resumeBtn.classList.add('downloading');
    setTimeout(() => resumeBtn.classList.remove('downloading'), 700);
  });
}

// Close nav dropdown when a link inside it is clicked
if (navLinks) {
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  typeBootLine();
  updateTyping();
});