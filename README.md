# Wedding Invitation Website

A modern luxury wedding invitation SPA built with Vue 3, featuring cinematic animations, editorial typography, and elegant design inspired by fashion editorials.

## Features

- **Cinematic Animations**: Slow, intentional motion with luxury easing curves
- **Editorial Typography**: Sophisticated typography system with semantic roles
- **Responsive Design**: Elegant layout that adapts to all screen sizes
- **Interactive Gallery**: Photo gallery with modal, hover effects, and keyboard navigation
- **Live Countdown**: Real-time countdown to the wedding date
- **Guest Book**: Message system with localStorage persistence
- **Parallax Effects**: Subtle parallax scrolling on hero section
- **Scroll Animations**: IntersectionObserver-powered animations

## Project Structure

```
├── index.html              # Main HTML entry point
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── src/
    ├── main.js            # Vue app initialization
    ├── App.vue            # Main app component
    ├── config/
    │   └── typography.js  # Typography configuration
    ├── styles/
    │   ├── global.css     # Global styles and palette
    │   ├── typography.css # Typography utilities
    │   └── animations.css # Animation utilities
    ├── components/
    │   ├── Hero.vue       # Hero section
    │   ├── Couple.vue     # Couple introduction
    │   ├── Event.vue      # Wedding event details
    │   ├── Countdown.vue  # Countdown timer
    │   ├── Gallery.vue    # Photo gallery
    │   ├── GuestBook.vue  # Guest wishes
    │   └── Footer.vue     # Footer section
    └── assets/            # Images and static assets
```

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:3000`.

## Customization

### Wedding Details

Update the following files with your actual wedding information:

1. **Couple Names**: Edit in `src/components/Hero.vue` and `src/components/Footer.vue`
2. **Wedding Date**: Update in `src/components/Countdown.vue` (line 36)
3. **Event Details**: Modify in `src/components/Event.vue`
4. **Story & Bio**: Customize in `src/components/Couple.vue`

### Images

Replace placeholder images in `src/assets/` directory:
- Hero background image
- Couple photos
- Gallery images

Then update the image references in the respective components.

### Color Palette

Customize colors in `src/styles/global.css`:
- `--color-ivory`: Background color
- `--color-nude`: Accent color
- `--color-gold`: Highlight color
- `--color-near-black`: Text color

### Typography

Modify fonts in `src/config/typography.js` or change Google Fonts import in `index.html`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technology Stack

- **Vue 3**: Progressive JavaScript framework
- **Composition API**: Modern Vue development approach
- **Vite**: Fast build tool and dev server
- **Pure CSS**: No CSS framework dependencies
- **LocalStorage**: Client-side data persistence

## Design Principles

1. **Modern Luxury**: Fashion editorial-inspired design
2. **Cinematic Motion**: Slow, intentional animations
3. **Editorial Typography**: Content and hierarchy-driven typography
4. **White Space**: Strong use of negative space
5. **Emotional Design**: Every element supports the narrative

## Performance

- Optimized animations with `transform` and `opacity`
- IntersectionObserver for efficient scroll detection
- Minimal dependencies for fast loading
- CSS-based animations (GPU accelerated)

## License

Private use for wedding invitation purposes.

---

Made with ♥ for Fatih & Novel
