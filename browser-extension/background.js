// VLTRN Game Code Assistant - Background Service Worker

console.log('🚀 VLTRN Game Code Assistant background worker started');

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('📨 Message received:', request);

  if (request.type === 'INJECT_CODE') {
    // Forward to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, request);
      }
    });
  }

  sendResponse({status: 'received'});
  return true;
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('✅ VLTRN Game Code Assistant installed');

    // Open welcome page
    chrome.tabs.create({
      url: 'https://vltrngames.com'
    });
  }
});

// Handle extension clicks
chrome.action.onClicked.addListener((tab) => {
  // Inject content script if not already injected
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
