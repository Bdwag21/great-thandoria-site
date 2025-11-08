// main.js - inject header/footer and add small nav behaviors
(async function(){
  async function loadInclude(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      // Add timestamp to break cache
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
    const links = document.querySelectorAll('.main-nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a=>{
      const href = a.getAttribute('href');
      if(!href) return;
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
    window.addEventListener('resize', ()=> {
      if(window.innerWidth > 960) nav.style.display = 'flex';
      else nav.style.display = 'none';
    });
    if(window.innerWidth <= 960) nav.style.display = 'none';
  }

  await loadInclude('site-header','includes/header.html');
  await loadInclude('site-footer','includes/footer.html');
})();
