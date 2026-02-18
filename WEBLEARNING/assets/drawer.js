// Simple site-wide drawer (mobile sidebar) utility
(function () {
  function qs(s) { return document.querySelector(s); }

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'site-drawer-backdrop';
  document.body.appendChild(backdrop);

  // Create drawer
  const drawer = document.createElement('aside');
  drawer.className = 'site-drawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <button class="drawer-close" aria-label="Close drawer">✕</button>
    <div class="drawer-header">
      <div class="logo" style="display:flex;align-items:center;gap:.6rem">
        <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(90deg,var(--primary),var(--primary-600));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">WL</div>
        <div style="font-weight:700">WEBLEARNING</div>
      </div>
    </div>
    <div class="drawer-user" style="margin-top:.5rem">
      <div data-auth="required" style="padding:.5rem .75rem; border-radius:.5rem; background:rgba(99,102,241,0.04); display:flex; justify-content:space-between; align-items:center">
        <div>
          <div style="font-weight:700;" data-user-email></div>
          <div style="font-size:.85rem;color:var(--muted)">Member</div>
        </div>
        <div>
          <button data-action="signout" class="btn-ghost small">Sign out</button>
        </div>
      </div>
      <div data-auth="guest" style="display:flex;gap:.5rem;margin-top:.5rem">
        <a href="/login/index.html" class="btn-ghost small">Login</a>
        <a href="/register/index.html" class="btn-primary small">Register</a>
      </div>
    </div>
    <nav class="drawer-nav" role="navigation">
      <a href="/home/index.html"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:.5rem"><path d="M3 11.5L12 4l9 7.5" stroke="#374151" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Home</a>
      <a href="/lessons/lesson.html"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:.5rem"><path d="M12 20v-8" stroke="#374151" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 20V10a6 6 0 0112 0v10" stroke="#374151" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Lessons</a>
      <a href="/contacts/contact.html"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:.5rem"><path d="M3 8l9 5 9-5" stroke="#374151" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Contact</a>
      <a href="/about/about.html"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:.5rem"><circle cx="12" cy="12" r="9" stroke="#374151" stroke-width="1.6"/><path d="M12 8v4" stroke="#374151" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16h.01" stroke="#374151" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>About</a>
      <a href="/settings/index.html"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:.5rem"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="#374151" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.3 17.88l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09c.67 0 1.17-.7 1.51-1a1.65 1.65 0 00-.33-1.82L4.3 4.3A2 2 0 017.12 1.47l.06.06A1.65 1.65 0 009 1.86 1.65 1.65 0 0010.51 1H11a2 2 0 014 0h.09c.67 0 1.17.7 1.51 1a1.65 1.65 0 001.82.33l.06-.06A2 2 0 0119.7 6.12l-.06.06a1.65 1.65 0 00-.33 1.82c.25.39.9 1 1.5 1H21a2 2 0 010 4h-.09c-.6 0-1.25.61-1.5 1z" stroke="#374151" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>Settings</a>
    </nav>
  `;
  document.body.appendChild(drawer);

  const openClass = 'open';
  const closeBtn = drawer.querySelector('.drawer-close');

  function openDrawer() {
    drawer.classList.add(openClass);
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.classList.add(openClass);
    // prevent body scroll
    document.documentElement.style.overflow = 'hidden';
    // focus first link
    const firstLink = drawer.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    drawer.classList.remove(openClass);
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove(openClass);
    document.documentElement.style.overflow = '';
  }

  // Attach triggers: #mobile-menu-btn if present
  function attachTriggers() {
    const btn = qs('#mobile-menu-btn');
    // If the header has a mobile button but it's hidden via CSS at large widths
    if (btn && window.getComputedStyle(btn).display !== 'none') {
      btn.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
    } else {
      // create a floating menu button
      const f = document.createElement('button');
      f.className = 'floating-menu-btn';
      f.setAttribute('aria-label', 'Open menu');
      f.innerHTML = '&#9776;';
      f.addEventListener('click', openDrawer);
      document.body.appendChild(f);
    }
  }

  // Close interactions
  backdrop.addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Basic focus trap: keep focus inside drawer while open
  document.addEventListener('focusin', (e) => {
    if (drawer.classList.contains(openClass) && !drawer.contains(e.target)) {
      e.stopPropagation();
      const first = drawer.querySelector('a,button');
      if (first) first.focus();
    }
  });

  attachTriggers();
})();
