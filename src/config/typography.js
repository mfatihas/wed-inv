/**
 * Typography Configuration
 * Centralized typography system for the wedding invitation website
 * Defines fonts, sizes, weights, and semantic roles
 */

export const typography = {
    // Font Families
    fonts: {
        display: "'Cormorant Garamond', serif",
        heading: "'Montserrat', sans-serif",
        body: "'Lora', serif",
        accent: "'Montserrat', sans-serif"
    },

    // Font Sizes (in rem)
    sizes: {
        caption: '0.875rem',    // 14px
        body: '1rem',           // 16px
        bodyLarge: '1.125rem',  // 18px
        h4: '1.5rem',           // 24px
        h3: '2rem',             // 32px
        h2: '3rem',             // 48px
        h1: '4rem',             // 64px
        display: '5rem',        // 80px
        displayLarge: '6rem'    // 96px
    },

    // Font Weights
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
    },

    // Line Heights
    lineHeights: {
        tight: 1.1,
        normal: 1.5,
        relaxed: 1.7,
        loose: 2
    },

    // Letter Spacing
    letterSpacing: {
        tight: '-0.02em',
        normal: '0',
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.2em'
    },

    // Typography Roles (Semantic Usage)
    roles: {
        // Display / Editorial Title - For couple names and hero statements
        display: {
            font: "'Cormorant Garamond', serif",
            size: '5rem',
            weight: 300,
            lineHeight: 1.1,
            letterSpacing: '0.02em',
            transform: 'none',
            // Content rules: Minimal words, poetic and timeless
            // Example: "Fatih & Novel", "A Celebration of Love"
        },

        // Section Headings - For section titles
        heading: {
            font: "'Montserrat', sans-serif",
            size: '2rem',
            weight: 500,
            lineHeight: 1.3,
            letterSpacing: '0.05em',
            transform: 'none',
            // Content rules: Short, elegant, editorial, Title Case
            // Example: "The Wedding", "Our Story"
        },

        // Body Text - For descriptions, details, guest messages
        body: {
            font: "'Lora', serif",
            size: '1rem',
            weight: 400,
            lineHeight: 1.7,
            letterSpacing: '0',
            transform: 'none',
            // Content rules: Warm, graceful, formal but modern, no casual slang
            // Example: "With great joy, we invite you to celebrate our union…"
        },

        // Accent / Meta Text - For dates, locations, labels
        accent: {
            font: "'Montserrat', sans-serif",
            size: '0.875rem',
            weight: 500,
            lineHeight: 1.5,
            letterSpacing: '0.15em',
            transform: 'uppercase',
            // Content rules: Uppercase, short and factual
            // Example: "SATURDAY · JANUARY 2026", "JAKARTA, INDONESIA"
        }
    }
};

export default typography;
