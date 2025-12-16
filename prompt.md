# Antigravity AI Prompt
## Vue 3 · Modern Luxury · Editorial Typography · Cinematic Animation

Create a **modern digital wedding invitation website** using **Vue 3 (Composition API)** as a **Single Page Application (SPA)**.  
The website must feel like a **luxury fashion editorial**, suitable for **wedding gown photography**, with **cinematic motion and carefully curated typography content**.

---

## 1. Global Typography System (Style + Content)

Typography must be treated as a **design system and narrative tool**, not just visual styling.

### A. Centralized Typography Configuration
- Create a global typography configuration (e.g. `src/config/typography.js`)
- Define:
  - Font families
  - Font sizes (caption → body → heading → display)
  - Font weights
  - Line heights
  - Letter spacing
  - Text transform rules
- Expose typography via:
  - CSS variables
  - Or reusable utility classes
- All components must strictly use this configuration.

### B. Typography Roles (Content Rules)

#### 1. Display / Editorial Title
- Used only for couple names and hero statements
- Copy rules:
  - Minimal words
  - Poetic and timeless  
  - Example:
    - “Fatih & Novel”
    - “A Celebration of Love”

#### 2. Section Headings
- Used for section titles
- Copy rules:
  - Short, elegant, editorial
  - Title Case  
  - Example:
    - “The Wedding”
    - “Our Story”

#### 3. Body Text
- Used for descriptions, details, guest messages
- Copy rules:
  - Warm, graceful, formal but modern
  - No casual slang  
  - Example:
    - “With great joy, we invite you to celebrate our union…”

#### 4. Accent / Meta Text
- Used for dates, locations, labels
- Copy rules:
  - Uppercase
  - Short and factual  
  - Example:
    - “SATURDAY · JANUARY 2026”
    - “JAKARTA, INDONESIA”

Typography must guide **emotion, pacing, and storytelling**.

---

## 2. Visual & Color Direction
- Style: Modern · Editorial · Minimal Luxury
- Palette:
  - Ivory / white background
  - Soft nude or beige accents
  - Deep gray or near-black text
- Strong white space
- Fashion-magazine grid layout

---

## 3. Cinematic Animation & Motion Design

Motion must feel **cinematic, slow, and intentional**, inspired by luxury fashion films.

### Global Motion Principles
- Slow easing (`cubic-bezier`, `ease-in-out`)
- No sharp or bouncy motion
- Animation supports emotion, not decoration

### Page Load Sequence
- Soft fade from white
- Hero text staggered reveal
- Letter-by-letter animation for couple names
- Background image scales down subtly (1.08 → 1.0)

### Scroll-Driven Animation
- Use `IntersectionObserver`
- Sections fade in + move upward
- Text appears before images

### Image Motion
- Subtle parallax on hero
- Editorial image reveal using scale or mask

### Gallery Interaction
- Hover zoom + soft shadow
- Modal open with fade + scale + background blur

### Countdown Animation
- Smooth number transitions
- No flicker

### Guest Book Motion
- Input focus underline animation
- New messages slide in + fade

---

## 4. Technology Requirements
- Vue 3
- Composition API
- No backend
- Guest messages stored in localStorage
- Scoped CSS or pure CSS
- Clean, readable, commented code

---

## 5. Project Structure

```
src/
├─ App.vue
├─ main.js
├─ assets/
├─ config/
│  └─ typography.js
├─ styles/
│  ├─ typography.css
│  └─ animations.css
├─ components/
│  ├─ Hero.vue
│  ├─ Couple.vue
│  ├─ Event.vue
│  ├─ Countdown.vue
│  ├─ Gallery.vue
│  ├─ GuestBook.vue
│  └─ Footer.vue
```

---

## 6. Page Sections
1. Hero / Cover
2. The Couple
3. The Wedding
4. Countdown
5. Gallery
6. Wishes (Guest Book)
7. Footer

---

## 7. Example Content
- Couple: **Fatih & Novel**
- Language: **English**
- Theme: **Modern Luxury Wedding Invitation**

Ensure typography controls **both visual hierarchy and written tone**, and animations feel **cinematic, slow, and emotionally driven**.
