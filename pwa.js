(function(){
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', function(){
    navigator.serviceWorker.register('./sw.js')
      .then(function(reg){ console.log('[PWA] SW registered', reg.scope); })
      .catch(function(err){ console.warn('[PWA] SW registration failed', err); });
  });

  // Install prompt UI
  let deferredPrompt = null;
  let installBtn = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    hideInstallButton();
    deferredPrompt = null;
    console.log('[PWA] Installed');
  });

  function showInstallButton(){
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) return;
    if (installBtn) { installBtn.style.display = 'inline-flex'; return; }

    installBtn = document.createElement('button');
    installBtn.textContent = 'Install App';
    installBtn.setAttribute('aria-label', 'Install SafetyFirst App');
    installBtn.style.cssText = [
      'position:fixed', 'bottom:20px', 'left:20px', 'z-index:10000',
      'background:#2563eb', 'color:#fff', 'border:none', 'border-radius:9999px',
      'padding:10px 14px', 'box-shadow:0 6px 18px rgba(0,0,0,.2)', 'cursor:pointer',
      'font:600 14px Inter,system-ui,Arial',
    ].join(';');

    installBtn.addEventListener('click', async function(){
      if (!deferredPrompt) return hideInstallButton();
      installBtn.disabled = true;
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log('[PWA] Install choice:', choice.outcome);
      } catch (e) {
        console.warn('[PWA] Install prompt error', e);
      } finally {
        installBtn.disabled = false;
        deferredPrompt = null; // Safari may not support again until next event
        hideInstallButton();
      }
    });

    document.body.appendChild(installBtn);
  }

  function hideInstallButton(){
    if (installBtn) installBtn.style.display = 'none';
  }
})();
