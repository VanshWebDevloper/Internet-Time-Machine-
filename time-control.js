// Internet Time Machine - Main Controller
// Manages year navigation and theme switching

const yearButtons = document.querySelectorAll('.year');
const displayYear = document.getElementById('displayYear');
const yearContent = document.getElementById('yearContent');
const bootScreen = document.getElementById('bootScreen');
const backButton = document.getElementById('backButton');
const powerButton = document.getElementById('powerButton');
const powerLed = document.getElementById('powerLed');

const infoSection = {
  title: document.getElementById('infoTitle'),
  text: document.getElementById('infoText'),
  design: document.getElementById('designInfo'),
  popular: document.getElementById('popularInfo'),
  style: document.getElementById('styleInfo')
};

let currentYear = 1995;
let isOn = true;

// Year-specific content and styling
const yearData = {
  1995: {
    title: 'WELCOME TO 1995',
    siteTitle: 'MY HOMEPAGE',
    content: 'Welcome to my corner of the Web! Best viewed with Netscape Navigator.',
    navigation: 'HOME | ABOUT | GUESTBOOK',
    visitors: 'Visitors: 000001',
    infoTitle: '1995 — The Early Web',
    description: 'The web was still young. Personal homepages, guestbooks, simple HTML and animated GIFs were common.',
    designType: 'Simple HTML',
    popular: 'Personal Homepages',
    era: 'Web 1.0'
  },
  2000: {
    title: 'WELCOME TO THE WEB',
    siteTitle: 'INTERNET PORTAL',
    content: 'Search the Web. Read news. Check your email.',
    navigation: 'HOME | SEARCH | NEWS | EMAIL',
    visitors: 'Visitors: 004281',
    infoTitle: '2000 — Portal Era',
    description: 'Web portals, search engines, email services and flashy graphics were becoming major parts of the Web.',
    designType: 'Tables + Graphics',
    popular: 'Web Portals',
    era: 'Web 1.0'
  },
  2005: {
    title: 'WELCOME TO WEB 2.0',
    siteTitle: 'MY SOCIAL SPACE',
    content: 'Create. Share. Comment. Connect.',
    navigation: 'HOME | BLOG | PHOTOS | FRIENDS',
    visitors: 'Online Users: 128',
    infoTitle: '2005 — Web 2.0',
    description: 'Websites became more interactive. Blogs, social networks, video sharing and user-generated content exploded.',
    designType: 'Glossy + Gradients',
    popular: 'Blogs & Social Media',
    era: 'Web 2.0'
  },
  2010: {
    title: 'WELCOME BACK',
    siteTitle: 'SOCIAL NETWORK',
    content: 'Connect with friends. Share photos and updates.',
    navigation: 'HOME | PROFILE | PHOTOS | MESSAGES',
    visitors: 'Friends Online: 37',
    infoTitle: '2010 — Social Web',
    description: 'Social networks dominated online activity. Websites became more polished, interactive and increasingly focused on sharing.',
    designType: 'Glossy UI',
    popular: 'Social Networks',
    era: 'Social Web'
  },
  2015: {
    title: 'WELCOME',
    siteTitle: 'MODERN WEBSITE',
    content: 'Clean design. Simple navigation. Responsive layouts.',
    navigation: 'HOME | SERVICES | WORK | CONTACT',
    visitors: 'Loading experience...',
    infoTitle: '2015 — Responsive Web',
    description: 'Responsive design became standard. Websites increasingly focused on clean layouts, mobile devices and better user experiences.',
    designType: 'Flat Design',
    popular: 'Mobile Web',
    era: 'Responsive Web'
  },
  2020: {
    title: 'HELLO, INTERNET',
    siteTitle: 'DIGITAL EXPERIENCE',
    content: 'Apps, platforms, streaming, cloud services and social media.',
    navigation: 'HOME | EXPLORE | CREATE | PROFILE',
    visitors: 'Users Online: 2.4M',
    infoTitle: '2020 — Platform Era',
    description: 'The web had become deeply integrated into everyday life through streaming, cloud platforms, social networks and web apps.',
    designType: 'Cards + Minimal UI',
    popular: 'Web Apps',
    era: 'Modern Web'
  },
  2026: {
    title: 'THE WEB, 2026',
    siteTitle: 'DIGITAL SPACE',
    content: 'AI. 3D interfaces. Real-time apps. Interactive experiences.',
    navigation: 'HOME | AI | PROJECTS | EXPLORE',
    visitors: 'Systems Online: 100%',
    infoTitle: '2026 — Interactive Web',
    description: 'Modern websites increasingly combine AI, real-time experiences, advanced animation, 3D graphics and highly interactive interfaces.',
    designType: 'Glass + Motion',
    popular: 'AI & Interactive Web',
    era: 'Interactive Web'
  }
};

function updateDisplay(year) {
  const data = yearData[year];
  if (!data) return;

  currentYear = year;
  document.body.className = `year-${year}`;
  displayYear.textContent = year;

  // Render the website preview
  yearContent.innerHTML = `
    <h1>${data.title}</h1>
    <div class="website-window">
      <div class="web-title">${data.siteTitle}</div>
      <p>${data.content}</p>
      <div class="fake-links">${data.navigation}</div>
      <p class="counter">${data.visitors}</p>
    </div>
  `;

  // Update info panel
  infoSection.title.textContent = data.infoTitle;
  infoSection.text.textContent = data.description;
  infoSection.design.textContent = data.designType;
  infoSection.popular.textContent = data.popular;
  infoSection.style.textContent = data.era;

  animateBoot();
  highlightButton(year);
}

function animateBoot() {
  bootScreen.classList.add('show');
  yearContent.style.opacity = '0';
  
  setTimeout(() => {
    bootScreen.classList.remove('show');
    yearContent.style.opacity = '1';
  }, 700);
}

function highlightButton(year) {
  yearButtons.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.year) === parseInt(year));
  });
}

function goBack() {
  const years = Object.keys(yearData).map(Number);
  const currentIndex = years.indexOf(currentYear);
  
  if (currentIndex <= 0) {
    updateDisplay(1995);
  } else {
    updateDisplay(years[currentIndex - 1]);
  }
}

function togglePower() {
  isOn = !isOn;
  
  if (isOn) {
    document.body.classList.remove('power-off');
    powerLed.classList.add('on');
    animateBoot();
  } else {
    document.body.classList.add('power-off');
    powerLed.classList.remove('on');
  }
}

// Event listeners
yearButtons.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(parseInt(button.dataset.year));
  });
});

backButton.addEventListener('click', goBack);
powerButton.addEventListener('click', togglePower);

// Initialize
updateDisplay(1995);
