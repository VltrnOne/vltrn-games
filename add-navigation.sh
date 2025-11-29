#!/bin/bash

# Navigation HTML and CSS to add to each game page
NAV_STYLES='
        /* VLTRN Navigation */
        .vltrn-nav {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 99999;
            display: flex;
            gap: 10px;
        }

        .vltrn-nav-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 10px 16px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            transition: all 0.3s;
            border: none;
            cursor: pointer;
        }

        .vltrn-nav-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
        }

        @media (max-width: 768px) {
            .vltrn-nav {
                top: 5px;
                left: 5px;
                gap: 5px;
            }

            .vltrn-nav-btn {
                padding: 8px 12px;
                font-size: 12px;
            }
        }
'

NAV_HTML='
    <div class="vltrn-nav">
        <a href="/" class="vltrn-nav-btn">
            <span>🏠</span>
            <span>Home</span>
        </a>
        <a href="javascript:history.back()" class="vltrn-nav-btn">
            <span>←</span>
            <span>Back</span>
        </a>
    </div>
'

echo "Adding navigation to all game pages..."

# Add to Robot Lyric
echo "Processing Robot Lyric..."
# (Would use sed or similar to inject)

echo "Done!"
