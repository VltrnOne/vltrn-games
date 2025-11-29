/**
 * AI Agent Loader - Include this script on all pages
 * Automatically loads the AI agent on every page
 */

(function() {
    // Load AI Agent script
    const script = document.createElement('script');
    script.src = '/js/ai-agent.js';
    script.async = true;
    document.head.appendChild(script);
})();

