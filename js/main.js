// main.js - inject header/footer and add small nav behaviors
(async function(){
  async function loadInclude(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load ' + url);
      const html = await res.text();
      el.innerHTML = html;
      activateNav();  // highlight current page in nav
      attachToggle(); // enable mobile toggle
    } catch(e) {
      console.warn(e);
    }
  }

  function activateNav(){
    // add "active" class to current page link
    const links = document.querySelectorAll('.main-nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href');
      if(!href) return;
      // remove previously active class
      a.classList.remove('active');
      a.style.outline = '';
      // set active class for current page
      if(href === path || (href === 'index.html' && path === '')) {
        a.classList.add('active');
        a.style.outline = '2px solid rgba(255,255,255,0.06)';
      }
    });
  }

  function attachToggle(){
    const btn = document.getElementById('nav-toggle');
    const nav = document.querySelector('.main-nav');
    if(!btn || !nav) return;

    btn.addEventListener('click', ()=>{
      const shown = nav.style.display === 'flex';
      nav.style.display = shown ? 'none' : 'flex';
      btn.setAttribute('aria-expanded', String(!shown));
    });

    // reset display on resize
    window.addEventListener('resize', ()=> {
      nav.style.display = window.innerWidth > 960 ? 'flex' : 'none';
    });

    // initial state for small screens
    if(window.innerWidth <= 960) nav.style.display = 'none';
  }

  // load static header/footer (your HTML files)
  await loadInclude('site-header','includes/header.html');
  await loadInclude('site-footer','includes/footer.html');
})();
