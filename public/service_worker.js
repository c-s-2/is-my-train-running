if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  const trigger = document.querySelector('.add-to-home');

  trigger.style.display = 'block';
  deferredPrompt = e;

  trigger.addEventListener('click', (e) => {
    trigger.style.display = 'none';
    deferredPrompt.prompt();

    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
