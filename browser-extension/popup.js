// VLTRN Code Assistant - Popup Script

document.addEventListener('DOMContentLoaded', function() {
  const statusEl = document.getElementById('status');
  const statusTextEl = document.getElementById('statusText');
  const engineInfoEl = document.getElementById('engineInfo');
  const engineNameEl = document.getElementById('engineName');
  const openBtn = document.getElementById('openVltrn');

  // Check if on VLTRN Games site
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;

    if (url.includes('vltrngames.com') || url.includes('localhost')) {
      statusEl.className = 'status active';
      statusTextEl.textContent = '✅ Extension Active';

      // Try to detect engine
      chrome.tabs.sendMessage(currentTab.id, {type: 'GET_ENGINE'}, function(response) {
        if (response && response.engine) {
          engineInfoEl.style.display = 'block';
          engineNameEl.textContent = response.engine.name;
        }
      });
    } else {
      statusEl.className = 'status inactive';
      statusTextEl.textContent = '⚠️ Navigate to vltrngames.com to use this extension';
    }
  });

  // Open VLTRN Games button
  openBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://vltrngames.com/microstudio'
    });
  });
});
