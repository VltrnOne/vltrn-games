/**
 * GDevelop Examples Loader
 * Loads examples from the GDevelop-examples repository
 */

class GDevelopExamplesLoader {
    constructor() {
        this.examples = [];
        this.examplesPath = '/gdevelop-examples-temp/examples/';
    }

    /**
     * Load all examples from the repository
     */
    async loadAllExamples() {
        try {
            // In production, this would fetch from your server API
            // For now, we'll parse the examples directory structure
            const response = await fetch('/api/gdevelop/examples');
            if (response.ok) {
                this.examples = await response.json();
                return this.examples;
            }
        } catch (error) {
            console.warn('Could not load from API, using static list');
        }

        // Fallback: Use static list
        return this.getStaticExamples();
    }

    /**
     * Get static list of popular examples
     */
    getStaticExamples() {
        return [
            {
                id: 'platformer',
                name: 'Platformer',
                description: 'Classic side-scrolling platformer',
                category: 'platformer',
                tags: ['platformer', '2d', 'jumping'],
                preview: '🏃',
                projectFile: 'platformer/platformer.json'
            },
            {
                id: '3d-platformer',
                name: '3D Platformer',
                description: '3D platformer with camera controls',
                category: '3d',
                tags: ['3d', 'platformer'],
                preview: '🎮',
                projectFile: '3d-platformer/3d-platformer.json'
            },
            {
                id: 'space-shooter',
                name: 'Space Shooter',
                description: 'Top-down space shooter',
                category: 'shooter',
                tags: ['shooter', 'space'],
                preview: '🚀',
                projectFile: 'space-shooter/space-shooter.json'
            },
            {
                id: 'flappy-bird',
                name: 'Flappy Bird',
                description: 'Classic Flappy Bird clone',
                category: 'puzzle',
                tags: ['puzzle', 'endless'],
                preview: '🐦',
                projectFile: 'flappy-bird/flappy-bird.json'
            },
            {
                id: 'top-down-rpg',
                name: 'Top Down RPG',
                description: 'RPG with inventory and quests',
                category: 'rpg',
                tags: ['rpg', 'top-down'],
                preview: '⚔️',
                projectFile: 'top-down-rpg/top-down-rpg.json'
            },
            {
                id: '3d-racing-game',
                name: '3D Racing Game',
                description: '3D car racing with physics',
                category: 'racing',
                tags: ['racing', '3d'],
                preview: '🏎️',
                projectFile: '3d-racing-game/3d-racing-game.json'
            },
            {
                id: 'breakout',
                name: 'Breakout',
                description: 'Classic Breakout/Arkanoid',
                category: 'puzzle',
                tags: ['puzzle', 'classic'],
                preview: '🎯',
                projectFile: 'breakout/breakout.json'
            },
            {
                id: 'starting-platformer',
                name: 'Starting Platformer',
                description: 'Template for creating platformers',
                category: 'starting',
                tags: ['template', 'platformer'],
                preview: '📝',
                projectFile: 'starting-platformer/starting-platformer.json'
            }
        ];
    }

    /**
     * Get example by ID
     */
    getExample(id) {
        return this.examples.find(ex => ex.id === id);
    }

    /**
     * Filter examples by category
     */
    filterByCategory(category) {
        if (!category) return this.examples;
        return this.examples.filter(ex => 
            ex.category === category || 
            ex.tags.includes(category)
        );
    }

    /**
     * Search examples
     */
    search(query) {
        if (!query) return this.examples;
        const lowerQuery = query.toLowerCase();
        return this.examples.filter(ex =>
            ex.name.toLowerCase().includes(lowerQuery) ||
            ex.description.toLowerCase().includes(lowerQuery) ||
            ex.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    /**
     * Get all categories
     */
    getCategories() {
        const categories = new Set();
        this.examples.forEach(ex => {
            categories.add(ex.category);
            ex.tags.forEach(tag => categories.add(tag));
        });
        return Array.from(categories).sort();
    }
}

// Make globally available
if (typeof window !== 'undefined') {
    window.GDevelopExamplesLoader = GDevelopExamplesLoader;
}

