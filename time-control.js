// Internet Time Machine - Main Controller
// Controls year navigation, theme changes, and interactive elements

// Get references to all the HTML elements we need to control
const yearButtons = document.querySelectorAll('.year');
const displayYear = document.getElementById('displayYear');
const yearContent = document.getElementById('yearContent');
const bootScreen = document.getElementById('bootScreen');
const backButton = document.getElementById('backButton');
const powerButton = document.getElementById('powerButton');
const powerLed = document.getElementById('powerLed');

// Info panel elements (right side of the page)
const infoSection = {
  title: document.getElementById('infoTitle'),
  text: document.getElementById('infoText'),
  design: document.getElementById('designInfo'),
  popular: document.getElementById('popularInfo'),
  style: document.getElementById('styleInfo')
};

// Track the current state
let currentYear = 1995;
let isOn = true;

// All the content for each year of the internet
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

// Show a 404 error page when users click on fake links
function show404Error(linkName) {
  yearContent.innerHTML = `
    <div class="website-window error-page">
      <div class="web-title">
        INTERNET TIME MACHINE
      </div>
      <h1>Under Development!</h1>
      <h2>${linkName} PAGE</h2>
      <p>Content will be added here soon.</p>
      <p>Requested link: <strong>${linkName}</strong></p>
      <hr>
      <a href="#" class="fake-back" id="returnHome">
        ← RETURN TO HOMEPAGE
      </a>
    </div>
  `;

  // Go back to homepage when user clicks the return link
  document.getElementById('returnHome').addEventListener('click', (event) => {
    event.preventDefault();
    loadYear(currentYear);
  });
}

// Load and display the content for a specific year
function loadYear(year) {
  const data = yearData[year];
  
  // Make sure the year exists in our data
  if (!data) return;

  currentYear = year;
  
  // Change the page theme based on the year
  document.body.className = `year-${year}`;
  
  // Update the year display at the top
  displayYear.textContent = year;

  // Build the website preview HTML
  yearContent.innerHTML = `
    <h1>${data.title}</h1>
    <div class="website-window">
      <div class="web-title">${data.siteTitle}</div>
      <p>${data.content}</p>
      <div class="links" id="crtNavigation"></div>
      <p class="counter">${data.visitors}</p>
    </div>
  `;

  // Add the clickable navigation links
  const navContainer = document.getElementById('crtNavigation');
  data.navigation.forEach((link, index) => {
    // Create a link element
    const linkElement = document.createElement('a');
    linkElement.href = '#';
    linkElement.textContent = link.name;
    linkElement.className = 'fake-link';
    
    // When clicked, show the 404 error page
    linkElement.addEventListener('click', (event) => {
      event.preventDefault();
      show404Error(link.name);
    });

    navContainer.appendChild(linkElement);

    // Add a pipe separator between links (but not after the last one)
    if (index < data.navigation.length - 1) {
      navContainer.appendChild(document.createTextNode(' | '));
    }
  });

  // Update the info panel with year details
  infoSection.title.textContent = data.infoTitle;
  infoSection.text.textContent = data.description;
  infoSection.design.textContent = data.designType;
  infoSection.popular.textContent = data.popular;
  infoSection.style.textContent = data.era;

  // Play the boot animation
  playBootAnimation();
  
  // Highlight the active year button
  markActiveButton(year);
}

// Play the CRT boot animation when switching years
function playBootAnimation() {
  bootScreen.classList.add('show');
  yearContent.style.opacity = '0';

  setTimeout(() => {
    bootScreen.classList.remove('show');
    yearContent.style.opacity = '1';
  }, 700);
}

// Highlight which year button is currently active
function markActiveButton(year) {
  yearButtons.forEach(button => {
    const buttonYear = parseInt(button.dataset.year);
    button.classList.toggle('active', buttonYear === year);
  });
}

// Go back one year in time
function goBack() {
  // Get all the years we have data for
  const allYears = Object.keys(yearData).map(Number);
  
  // Find where we are in the list
  const currentIndex = allYears.indexOf(currentYear);

  // If we're at the first year, go to 1995. Otherwise go back one year
  if (currentIndex <= 0) {
    loadYear(1995);
  } else {
    loadYear(allYears[currentIndex - 1]);
  }
}

// Turn the machine on or off
function togglePower() {
  isOn = !isOn;

  if (isOn) {
    // Power is ON
    document.body.classList.remove('power-off');
    powerLed.classList.add('on');
    playBootAnimation();
  } else {
    // Power is OFF
    document.body.classList.add('power-off');
    powerLed.classList.remove('on');
  }
}

// Set up all the click handlers
yearButtons.forEach(button => {
  button.addEventListener('click', () => {
    const year = parseInt(button.dataset.year);
    loadYear(year);
  });
});

backButton.addEventListener('click', goBack);
powerButton.addEventListener('click', togglePower);

// Start with 1995 when the page loads
loadYear(1995);
