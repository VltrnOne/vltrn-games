#!/bin/bash
# Add AI Agent loader to all HTML pages

echo "Adding AI Agent to all HTML pages..."

# Find all HTML files
find . -name "*.html" -type f ! -path "./.git/*" ! -path "./node_modules/*" ! -path "./gdevelop-engine-temp/*" ! -path "./gdevelop-examples-temp/*" ! -path "./microstudio-temp/*" | while read file; do
    # Check if AI agent is already added
    if ! grep -q "ai-agent-loader.js" "$file"; then
        # Add before </body> tag
        if grep -q "</body>" "$file"; then
            sed -i '' 's|</body>|    <script src="/js/ai-agent-loader.js"></script>\n</body>|' "$file"
            echo "Added AI Agent to: $file"
        fi
    fi
done

echo "Done!"

