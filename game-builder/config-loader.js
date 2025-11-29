/**
 * Game Configuration Loader
 * Allows games to read configuration from URL parameters or localStorage
 */

class GameConfigLoader {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    /**
     * Load configuration from URL parameters or localStorage
     */
    loadConfig() {
        // Try to get config from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const configParam = urlParams.get('config');

        if (configParam) {
            try {
                const decoded = atob(configParam);
                this.config = JSON.parse(decoded);
                // Save to localStorage for persistence
                localStorage.setItem('game_config_current', JSON.stringify(this.config));
                return;
            } catch (e) {
                console.warn('Failed to parse config from URL:', e);
            }
        }

        // Try to load from localStorage
        const saved = localStorage.getItem('game_config_current');
        if (saved) {
            try {
                this.config = JSON.parse(saved);
            } catch (e) {
                console.warn('Failed to parse config from localStorage:', e);
            }
        }
    }

    /**
     * Get a configuration value
     * @param {string} key - Configuration key
     * @param {*} defaultValue - Default value if key not found
     * @returns {*} Configuration value or default
     */
    get(key, defaultValue = null) {
        return this.config[key] !== undefined ? this.config[key] : defaultValue;
    }

    /**
     * Get all configuration
     * @returns {Object} All configuration values
     */
    getAll() {
        return { ...this.config };
    }

    /**
     * Set a configuration value
     * @param {string} key - Configuration key
     * @param {*} value - Configuration value
     */
    set(key, value) {
        this.config[key] = value;
        localStorage.setItem('game_config_current', JSON.stringify(this.config));
    }

    /**
     * Apply configuration to game elements
     * This is a helper function that games can use to apply config
     */
    applyToGame(gameElement) {
        // Apply background color if specified
        if (this.config.bgColor) {
            document.body.style.backgroundColor = this.config.bgColor;
            if (gameElement) {
                gameElement.style.backgroundColor = this.config.bgColor;
            }
        }

        // Apply other common configurations
        // Games can extend this method for their specific needs
    }
}

// Make it available globally
window.GameConfigLoader = GameConfigLoader;

// Auto-instantiate if config parameter exists
if (window.location.search.includes('config=')) {
    window.gameConfig = new GameConfigLoader();
}

