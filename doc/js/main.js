/* ============================================
   Self-Regulation Evidence Hub - Main JS
   ============================================ */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '\u2715' : '\u2630';
    });

    // Close on link click (mobile)
    links.querySelectorAll('a:not(.dropdown-trigger)').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '\u2630';
      });
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown > .dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        trigger.parentElement.classList.toggle('open');
      }
    });
  });

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Fade-in on scroll (IntersectionObserver)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.observe-fade').forEach(el => {
    observer.observe(el);
  });

  // Tab switcher
  document.querySelectorAll('.tab-switcher').forEach(switcher => {
    const buttons = switcher.querySelectorAll('button');
    const parent = switcher.parentElement;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        parent.querySelectorAll('.tab-content').forEach(tc => {
          tc.classList.toggle('active', tc.id === target);
        });
      });
    });
  });
});

// Shared nav HTML generator
function getNavHTML(activePage) {
  return `
  <nav class="navbar">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">
        <span class="logo-icon">\u{1F9EC}</span>
        <span>SR Evidence Hub</span>
      </a>
      <button class="nav-toggle" aria-label="Menu">\u2630</button>
      <ul class="nav-links">
        <li><a href="index.html" ${activePage === 'index' ? 'class="active"' : ''}>Home</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-trigger">Science \u25BE</a>
          <div class="dropdown-menu">
            <a href="genetics.html" ${activePage === 'genetics' ? 'class="active"' : ''}>Genetics</a>
            <a href="epigenetics.html" ${activePage === 'epigenetics' ? 'class="active"' : ''}>Epigenetics</a>
            <a href="neuroscience.html" ${activePage === 'neuroscience' ? 'class="active"' : ''}>Brain / Neuroscience</a>
            <a href="theory.html" ${activePage === 'theory' ? 'class="active"' : ''}>Theory & Models</a>
            <a href="applications.html" ${activePage === 'applications' ? 'class="active"' : ''}>Applications</a>
          </div>
        </li>
        <li><a href="map.html" ${activePage === 'map' ? 'class="active"' : ''}>Interactive Map</a></li>
        <li><a href="publications.html" ${activePage === 'publications' ? 'class="active"' : ''}>Publications</a></li>
        <li><a href="team.html" ${activePage === 'team' ? 'class="active"' : ''}>Team</a></li>
        <li><a href="resources.html" ${activePage === 'resources' ? 'class="active"' : ''}>Resources</a></li>
        <li><a href="news.html" ${activePage === 'news' ? 'class="active"' : ''}>News</a></li>
      </ul>
    </div>
  </nav>`;
}

function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Self-Regulation & Delay Discounting Evidence Hub</p>
      <p style="margin-top:0.3rem;">Deng Lab &middot; Peter Boris Centre for Addictions Research &middot; McMaster University</p>
      <div class="footer-links">
        <a href="index.html">Home</a>
        <a href="publications.html">Publications</a>
        <a href="map.html">Interactive Map</a>
        <a href="resources.html">Resources</a>
      </div>
    </div>
  </footer>`;
}
