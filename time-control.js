// Internet Time Machine - Main Controller
// Manages navigation, content loading, and UI state

// ========================================
// DOM ELEMENTS
// ========================================

const displayYear = document.getElementById('displayYear');
const digitWheel = document.getElementById('digitWheel');
const prevYear = document.getElementById('prevYear');
const nextYear = document.getElementById('nextYear');
const yearContent = document.getElementById('yearContent');
const bootScreen = document.getElementById('bootScreen');
const powerButton = document.getElementById('powerButton');
const powerLed = document.getElementById('powerLed');
const backButton = document.getElementById('backButton');

// Info panel on the right side
const infoSection = {
  title: document.getElementById('infoTitle'),
  text: document.getElementById('infoText'),
  design: document.getElementById('designInfo'),
  popular: document.getElementById('popularInfo'),
  style: document.getElementById('styleInfo')
};

// ========================================
// STATE
// ========================================

const years = [1995, 2000, 2005, 2010, 2015, 2020, 2026];
let currentYear = 2026;
let isOn = true;
let isChanging = false;

// ========================================
// YEAR CONTENT DATA
// ========================================

const yearData = {
  1995: {
    title: 'WELCOME TO 1995',
    siteTitle: 'MY HOMEPAGE',
    content: 'Welcome to my corner of the Web! Best viewed with Netscape Navigator. Check out my cool links collection below.',
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'ABOUT ME', page: 'about' },
      { name: 'COOL LINKS', page: 'links' },
      { name: 'GUESTBOOK', page: 'guestbook' }
    ],
    visitors: 'Page Views: 000127',
    infoTitle: '1995 — The Early Web',
    description: 'Personal websites ruled the early internet. Simple HTML, animated GIFs, and neon text on dark backgrounds were standard. Dial-up connections meant patience was a virtue.',
    designType: 'Simple HTML',
    popular: 'Personal Homepages',
    era: 'Web 1.0'
  },

  2000: {
    title: 'WELCOME TO THE NET',
    siteTitle: 'PORTAL HOMEPAGE',
    content: 'The web was growing fast. Search engines, portals, and email services became the main attractions. Click below to explore.',
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'SEARCH', page: 'search' },
      { name: 'NEWS', page: 'news' },
      { name: 'CHAT', page: 'chat' },
      { name: 'EMAIL', page: 'email' }
    ],
    visitors: 'Visitors: 004,281',
    infoTitle: '2000 — Portal Era',
    description: 'Yahoo, Excite, and AOL ruled the web. Portals were the gateway to the internet. Browser wars were intense, and downloading anything took forever.',
    designType: 'Tables + Bright Colors',
    popular: 'Web Portals',
    era: 'Web 1.0'
  },

  2005: {
    title: 'WELCOME TO WEB 2.0',
    siteTitle: 'MY BLOG & SPACE',
    content: 'The web became social. Blogs, MySpace profiles, and YouTube changed everything. Share your life online.',
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'MY BLOG', page: 'blog' },
      { name: 'PHOTOS', page: 'photos' },
      { name: 'FRIENDS', page: 'friends' },
      { name: 'CUSTOMIZE', page: 'customize' }
    ],
    visitors: 'Online Friends: 28',
    infoTitle: '2005 — Web 2.0 Boom',
    description: 'MySpace profiles with custom CSS. YouTube uploading. Social networking exploded. The web became about sharing and connecting with others online.',
    designType: 'Glossy Gradients',
    popular: 'Blogs & Social Media',
    era: 'Web 2.0'
  },

  2010: {
    title: 'WELCOME BACK',
    siteTitle: 'SOCIAL NETWORK',
    content: 'Social networks dominated everything. Smartphones were changing how we browse. Check updates from friends and share your moments.',
    navigation: [
      { name: 'FEED', page: 'feed' },
      { name: 'PROFILE', page: 'profile' },
      { name: 'PHOTOS', page: 'photos' },
      { name: 'MESSAGES', page: 'messages' },
      { name: 'SETTINGS', page: 'settings' }
    ],
    visitors: 'Friends Online: 42',
    infoTitle: '2010 — Mobile Shift',
    description: 'Instagram launched. Mobile apps exploded. Social networks became the center of the web. The desktop was becoming secondary to smartphones.',
    designType: 'Flat, Clean UI',
    popular: 'Social Networks',
    era: 'Mobile Web'
  },

  2015: {
    title: 'WELCOME',
    siteTitle: 'MODERN SITE',
    content: 'Responsive design is now standard. Beautiful layouts, mobile-first approach. The web is everywhere, on every device.',
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'SERVICES', page: 'services' },
      { name: 'PORTFOLIO', page: 'portfolio' },
      { name: 'BLOG', page: 'blog' },
      { name: 'CONTACT', page: 'contact' }
    ],
    visitors: 'Active Users: 1.2M',
    infoTitle: '2015 — Responsive Era',
    description: 'Mobile-first design became essential. Responsive layouts worked on all screen sizes. Sites had to be fast, accessible, and beautiful on phones.',
    designType: 'Flat Design',
    popular: 'Mobile & Responsive',
    era: 'Responsive Web'
  },

  2020: {
    title: 'HELLO, 2020',
    siteTitle: 'DIGITAL EXPERIENCE',
    content: 'Apps, streaming, cloud services. The web merged with apps. Real-time notifications, dark mode, smooth animations everywhere.',
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'EXPLORE', page: 'explore' },
      { name: 'CREATE', page: 'create' },
      { name: 'PROFILE', page: 'profile' },
      { name: 'SETTINGS', page: 'settings' }
    ],
    visitors: 'Online Users: 2.4M',
    infoTitle: '2020 — Platform Era',
    description: 'Web apps became as powerful as native apps. Dark mode everywhere. Real-time collaboration tools exploded. The pandemic accelerated digital transformation.',
    designType: 'Cards & Dark Mode',
    popular: 'Web Apps',
    era: 'Modern Web'
  },

  2026: {
    title: 'THE WEB IN 2026',
    siteTitle: 'INTERACTIVE SPACE',
    content: 'AI assistants, 3D interfaces, real-time experiences. The web is interactive, smart, and immersive. What\'s next?',
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'AI TOOLS', page: 'ai' },
      { name: 'PROJECTS', page: 'projects' },
      { name: 'EXPLORE', page: 'explore' },
      { name: 'SETTINGS', page: 'settings' }
    ],
    visitors: 'Systems Online: 100%',
    infoTitle: '2026 — AI & Interactivity',
    description: 'AI-powered interfaces. Real-time collaboration. 3D spaces and immersive web. APIs connected everything. The web became intelligent and interactive.',
    designType: 'Glass Morphism',
    popular: 'AI & 3D Web',
    era: 'Interactive Web'
  }
};

// ========================================
// UPDATE THE YEAR WHEEL
// ========================================

function updateWheel(year, direction) {
  const digits = String(year).split('');
  const digitElements = digitWheel.querySelectorAll('.digit span');

  digitWheel.classList.remove('roll-up', 'roll-down');

  // Restart animation by forcing reflow
  void digitWheel.offsetWidth;

  digitWheel.classList.add(direction > 0 ? 'roll-down' : 'roll-up');

  digits.forEach((digit, index) => {
    if (digitElements[index]) {
      digitElements[index].textContent = digit;
    }
  });

  // Clean up animation class
  setTimeout(() => {
    digitWheel.classList.remove('roll-up', 'roll-down');
  }, 340);
}

// ========================================
// UPDATE PREV/NEXT BUTTON STATES
// ========================================

function updateButtonStates() {
  const currentIndex = years.indexOf(currentYear);
  prevYear.disabled = currentIndex <= 0;
  nextYear.disabled = currentIndex >= years.length - 1;
}

// ========================================
// CHANGE TO PREVIOUS OR NEXT YEAR
// ========================================

function changeYear(direction) {
  if (!isOn || isChanging) return;

  const currentIndex = years.indexOf(currentYear);
  let newIndex = currentIndex + direction;

  // Keep within bounds
  if (newIndex < 0) newIndex = 0;
  if (newIndex >= years.length) newIndex = years.length - 1;

  // No change if already at edge
  if (newIndex === currentIndex) return;

  const newYear = years[newIndex];
  isChanging = true;

  // Animate the wheel
  updateWheel(newYear, direction);

  // Load content after wheel animation
  setTimeout(() => {
    loadYear(newYear);
    isChanging = false;
  }, 150);
}

// ========================================
// UP/DOWN ARROW BUTTONS
// ========================================

prevYear.addEventListener('click', () => changeYear(-1));
nextYear.addEventListener('click', () => changeYear(1));

// ========================================
// KEYBOARD ARROW KEYS
// ========================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    changeYear(-1);
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    changeYear(1);
  }
});

// ========================================
// LOAD AND DISPLAY A YEAR
// ========================================

function loadYear(year) {
  const data = yearData[year];
  if (!data) return;

  currentYear = year;

  // Change page theme
  document.body.className = `year-${year}`;

  // Update year display
  displayYear.textContent = year;

  // Update wheel numbers (silent, no animation)
  const digits = String(year).split('');
  const digitElements = digitWheel.querySelectorAll('.digit span');
  digits.forEach((digit, index) => {
    if (digitElements[index]) {
      digitElements[index].textContent = digit;
    }
  });

  // Build the fake website
  yearContent.innerHTML = `
    <h1>${data.title}</h1>
    <div class="website-window">
      <div class="web-title">${data.siteTitle}</div>
      <p>${data.content}</p>
      <div class="links" id="crtNavigation"></div>
      <p class="counter">${data.visitors}</p>
    </div>
  `;

  // Add clickable navigation links
  const navContainer = document.getElementById('crtNavigation');
  data.navigation.forEach((link, index) => {
    const linkElement = document.createElement('a');
    linkElement.href = '#';
    linkElement.textContent = link.name;
    linkElement.className = 'fake-link';
    linkElement.addEventListener('click', (e) => {
      e.preventDefault();
      showLinkPage(link.name);
    });

    navContainer.appendChild(linkElement);

    // Add separator between links
    if (index < data.navigation.length - 1) {
      navContainer.appendChild(document.createTextNode(' | '));
    }
  });

  // Update info panel
  infoSection.title.textContent = data.infoTitle;
  infoSection.text.textContent = data.description;
  infoSection.design.textContent = data.designType;
  infoSection.popular.textContent = data.popular;
  infoSection.style.textContent = data.era;

  // Update button states
  updateButtonStates();

  // Boot animation
  playBootAnimation();
}



function showLinkPage(linkName) {
  yearContent.innerHTML = `
    <div class="website-window page">
      <div class="web-title">INTERNET TIME MACHINE</div>
      <h1>Under Development</h1>
      <h2>${linkName.toUpperCase()} PAGE</h2>
      <p>Content will be added soon in this era.</p>
      
      <hr>
      <a href="#" class="fake-back" id="returnHome">← RETURN HOME</a>
    </div>
  `;

  document.getElementById('returnHome').addEventListener('click', (e) => {
    e.preventDefault();
    loadYear(currentYear);
  });
}

// ========================================
// BOOT ANIMATION EFFECT
// ========================================

function playBootAnimation() {
  if (!isOn) return;

  bootScreen.classList.add('show');
  yearContent.style.opacity = '0';

  setTimeout(() => {
    bootScreen.classList.remove('show');
    yearContent.style.opacity = '1';
  }, 650);
}

// ========================================
// BACK BUTTON
// ========================================

function goBack() {
  const index = years.indexOf(currentYear);
  if (index <= 0) {
    loadYear(years[0]);
  } else {
    loadYear(years[index - 1]);
  }
}

backButton.addEventListener('click', goBack);

// ========================================
// POWER BUTTON
// ========================================

function togglePower() {
  isOn = !isOn;

  if (isOn) {
    document.body.classList.remove('power-off');
    powerLed.classList.add('on');
    playBootAnimation();
  } else {
    document.body.classList.add('power-off');
    powerLed.classList.remove('on');
  }
}

powerButton.addEventListener('click', togglePower);

// ========================================
// INITIALIZE ON LOAD
// ========================================

loadYear(2026);
updateButtonStates();
