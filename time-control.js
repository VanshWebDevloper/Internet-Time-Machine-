// Internet Time Machine - Main Controller
// just managing the year jumps, themes, and all those fake links we'll never follow

const yearButtons = document.querySelectorAll('.year');
const displayYear = document.getElementById('displayYear');
const yearContent = document.getElementById('yearContent');
const bootScreen = document.getElementById('bootScreen');
const backButton = document.getElementById('backButton');
const powerButton = document.getElementById('powerButton');
const powerLed = document.getElementById('powerLed');

// info panel elements
const infoSection = {
  title: document.getElementById('infoTitle'),
  text: document.getElementById('infoText'),
  design: document.getElementById('designInfo'),
  popular: document.getElementById('popularInfo'),
  style: document.getElementById('styleInfo')
};

let currentYear = 1995;
let isOn = true;

// year data - each era of the web gets its own personality
const yearData = {
  1995: {
    title: 'WELCOME TO 1995',
    siteTitle: 'MY HOMEPAGE',
    content: 'Welcome to my corner of the Web! Best viewed with Netscape Navigator.',
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'ABOUT', page: 'about' },
      { name: 'GUESTBOOK', page: 'guestbook' }
    ],
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
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'SEARCH', page: 'search' },
      { name: 'NEWS', page: 'news' },
      { name: 'EMAIL', page: 'email' }
    ],
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
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'BLOG', page: 'blog' },
      { name: 'PHOTOS', page: 'photos' },
      { name: 'FRIENDS', page: 'friends' }
    ],
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
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'PROFILE', page: 'profile' },
      { name: 'PHOTOS', page: 'photos' },
      { name: 'MESSAGES', page: 'messages' }
    ],
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
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'SERVICES', page: 'services' },
      { name: 'WORK', page: 'work' },
      { name: 'CONTACT', page: 'contact' }
    ],
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
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'EXPLORE', page: 'explore' },
      { name: 'CREATE', page: 'create' },
      { name: 'PROFILE', page: 'profile' }
    ],
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
    navigation: [
      { name: 'HOME', page: 'home' },
      { name: 'AI', page: 'ai' },
      { name: 'PROJECTS', page: 'projects' },
      { name: 'EXPLORE', page: 'explore' }
    ],
    visitors: 'Systems Online: 100%',
    infoTitle: '2026 — Interactive Web',
    description: 'Modern websites increasingly combine AI, real-time experiences, advanced animation, 3D graphics and highly interactive interfaces.',
    designType: 'Glass + Motion',
    popular: 'AI & Interactive Web',
    era: 'Interactive Web'
  }
};

// fake 404 page when users try clicking on those fake links
function show404Error(linkName) {
  yearContent.innerHTML = `
    <div class="website-window error-page">
      <div class="web-title">
        INTERNET TIME MACHINE
      </div>
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>ERROR: The requested page could not be found.</p>
      <p>Requested link: <strong>${linkName}</strong></p>
      <hr>
      <a href="#" class="fake-back" id="returnHome">
        ← RETURN TO HOMEPAGE
      </a>
    </div>
  `;

  document.getElementById('returnHome').addEventListener('click', (e) => {
    e.preventDefault();
    loadYear(currentYear);
  });
}

// actually render the year and update everything
function loadYear(year) {
  const data = yearData[year];
  if (!data) return;

  currentYear = year;
  document.body.className = `year-${year}`;
  displayYear.textContent = year;

  // build the website preview
  yearContent.innerHTML = `
    <h1>${data.title}</h1>
    <div class="website-window">
      <div class="web-title">${data.siteTitle}</div>
      <p>${data.content}</p>
      <div class="links" id="crtNavigation"></div>
      <p class="counter">${data.visitors}</p>
    </div>
  `;

  // add the clickable nav links
  const navContainer = document.getElementById('crtNavigation');
  data.navigation.forEach((link, i) => {
    const linkEl = document.createElement('a');
    linkEl.href = '#';
    linkEl.textContent = link.name;
    linkEl.className = 'fake-link';
    linkEl.addEventListener('click', (e) => {
      e.preventDefault();
      show404Error(link.name);
    });

    navContainer.appendChild(linkEl);

    // add separator pipes between links
    if (i < data.navigation.length - 1) {
      navContainer.appendChild(document.createTextNode(' | '));
    }
  });

  // update the info panel on the right
  infoSection.title.textContent = data.infoTitle;
  infoSection.text.textContent = data.description;
  infoSection.design.textContent = data.designType;
  infoSection.popular.textContent = data.popular;
  infoSection.style.textContent = data.era;

  // fancy boot animation
  triggerBoot();
  markActiveButton(year);
}

// little CRT boot effect when switching years
function triggerBoot() {
  bootScreen.classList.add('show');
  yearContent.style.opacity = '0';

  setTimeout(() => {
    bootScreen.classList.remove('show');
    yearContent.style.opacity = '1';
  }, 700);
}

// highlight the active year button
function markActiveButton(year) {
  yearButtons.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.year) === year);
  });
}

// go back one year
function goBack() {
  const allYears = Object.keys(yearData).map(Number);
  const idx = allYears.indexOf(currentYear);

  if (idx <= 0) {
    loadYear(1995);
  } else {
    loadYear(allYears[idx - 1]);
  }
}

// turn the machine on/off
function togglePower() {
  isOn = !isOn;

  if (isOn) {
    document.body.classList.remove('power-off');
    powerLed.classList.add('on');
    triggerBoot();
  } else {
    document.body.classList.add('power-off');
    powerLed.classList.remove('on');
  }
}

// set up all the event listeners
yearButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    loadYear(parseInt(btn.dataset.year));
  });
});

backButton.addEventListener('click', goBack);
powerButton.addEventListener('click', togglePower);

// kick it off with 1995
loadYear(1995);
