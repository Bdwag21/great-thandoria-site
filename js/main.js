// main.js - inject header/footer and add small nav behaviors with cache-busting
(async function(){
  async function loadInclude(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      // Cache-busting query to force browser to load latest version
      const res = await fetch(url + '?v=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load ' + url);
      const html = await res.text();
      el.innerHTML = html;
      activateNav();
      attachToggle();
    } catch(e) {
      console.warn(e);
    }
  }

  function activateNav(){
    // Add active class to current page link
    const links = document.querySelectorAll('.main-nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === path || (href === 'index.html' && path === '')) {
        a.classList.add('active');
        a.style.outline = '2px solid rgba(255,255,255,0.06)';
      } else {
        a.classList.remove('active');
        a.style.outline = 'none';
      }
    });
  }

  function attachToggle(){
    const btn = document.getElementById('nav-toggle');
    const nav = document.querySelector('.main-nav');
    if(!btn || !nav) return;

    btn.addEventListener('click', () => {
      const shown = nav.style.display === 'flex';
      nav.style.display = shown ? 'none' : 'flex';
      btn.setAttribute('aria-expanded', String(!shown));
    });

    // Reset display on resize
    window.addEventListener('resize', () => {
      if(window.innerWidth > 960) nav.style.display = 'flex';
      else nav.style.display = 'none';
    });

    // Initial state for small screens
    if(window.innerWidth <= 960) nav.style.display = 'none';
  }

  // Inject header and footer
  await loadInclude('site-header','includes/header.html');
  await loadInclude('site-footer','includes/footer.html');

})();
