// Register Service Worker and handle install prompt
(async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
      console.log('[PWA] Service worker registered');
    } catch (e) {
      console.warn('[PWA] Service worker registration failed', e);
    }
  }

  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('install-app');
    if (btn) btn.style.display = 'inline-flex';
    btn?.addEventListener('click', async () => {
      btn.style.display = 'none';
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[PWA] Install choice:', outcome);
      deferredPrompt = null;
    });
  });
})();
