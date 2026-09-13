// ALL STARS CLAN tracker front-end routing.
// Localhost keeps same-origin API calls. GitHub Pages sends only /api and
// Live Arena traffic to the tracker PC through ngrok.
(()=>{
  const onGitHub=location.hostname.toLowerCase().endsWith('.github.io');
  let override='';
  try{override=localStorage.getItem('ASC.ApiBaseOverride')||''}catch{}
  window.ASC_CONFIG={
    apiBaseUrl: override || (onGitHub?'https://ion-kebab-muster.ngrok-free.dev':''),
    publicDataUrl:'public-data.json'
  };
})();
