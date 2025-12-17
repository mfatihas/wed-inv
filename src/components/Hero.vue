<template>
  <section class="hero">
    <!-- Background Image with Parallax -->
    <div class="hero-bg" ref="heroBackground">
      <div class="hero-overlay"></div>
    </div>

    <!-- Content with scroll-based fade -->
    <div class="hero-content" ref="heroContent">
      <!-- Context Line - Opening Sentence -->
      <p class="hero-context text-accent">
        The Wedding of
      </p>
      
      <!-- Couple Names - Editorial Title Card -->
      <h1 class="hero-title">
        <span class="hero-name">{{ name1 }}</span>
        <span class="hero-ampersand"> & </span>
        <span class="hero-name">{{ name2 }}</span>
      </h1>

      <!-- Subtitle Line 1 - Narrative -->
      <p class="hero-subtitle-primary text-accent">
        {{ content.hero.subtitle }}
      </p>

      <!-- Subtitle Line 2 - Metadata -->
      <p class="hero-subtitle-secondary text-accent">
        {{ content.wedding.saveTheDate }}
      </p>
    </div>

    <!-- Enhanced Scroll Indicator -->
    <div class="scroll-indicator" ref="scrollIndicator">
      <p class="scroll-text">Scroll to explore</p>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

// Couple names
const name1 = content.couple.groomFirstName;
const name2 = content.couple.brideFirstName;

// Refs for parallax and scroll effects
const heroBackground = ref(null);
const heroContent = ref(null);
const scrollIndicator = ref(null);

// Parallax and fade effect
let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      
      if (heroBackground.value) {
        // Parallax effect
        const parallaxOffset = scrolled * 0.5;
        heroBackground.value.style.transform = `translateY(${parallaxOffset}px)`;
      }

      if (heroContent.value && scrollIndicator.value) {
        // Calculate fade progress (0 to 1) based on scroll
        // Text fades faster than background
        const fadeProgress = Math.min(scrolled / 300, 1);
        const contentOpacity = 1 - fadeProgress;
        
        // Apply fade to content
        heroContent.value.style.opacity = contentOpacity;
        scrollIndicator.value.style.opacity = contentOpacity;
      }

      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-beige);
}

/* Background with Parallax */
.hero-bg {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  background-image: url('../assets/hero-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(255, 248, 240, 0.3) 100%
  );
}

/* Content - Editorial Positioning (shifted down 5%) */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--spacing-md);
  /* Shift down 5% from center for editorial feel */
  transform: translateY(5%);
  will-change: opacity;
  transition: opacity 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Context Line - Opening Sentence */
.hero-context {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gray);
  font-weight: var(--weight-normal);
  margin-bottom: var(--spacing-sm);
  opacity: 0.8;
}

/* Title - Luxury Editorial Title Card */
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-display-large);
  font-weight: var(--weight-light);
  /* Increased line-height for breathing space */
  line-height: 1.3;
  letter-spacing: 0.02em;
  color: var(--color-near-black);
  margin-bottom: var(--spacing-lg);
}

.hero-name {
  display: inline-block;
}

/* Ampersand - Softer, acts as pause */
.hero-ampersand {
  display: inline-block;
  margin: 0 0.5em;
  font-style: italic;
  opacity: 0.7;
  font-weight: 300;
}

/* Subtitle Line 1 - Primary Narrative */
.hero-subtitle-primary {
  margin-bottom: var(--spacing-sm);
  color: var(--color-gray-dark);
  font-family: var(--font-accent);
  font-size: var(--text-accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: var(--weight-normal);
}

/* Subtitle Line 2 - Metadata */
.hero-subtitle-secondary {
  color: var(--color-gray);
  font-family: var(--font-accent);
  /* Smaller than primary subtitle */
  font-size: calc(var(--text-accent) * 0.85);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: var(--weight-light);
  margin-top: var(--spacing-xs);
}

/* Enhanced Scroll Indicator with Text */
.scroll-indicator {
  position: absolute;
  bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: fadeInBounce 2s ease-in-out 1s forwards;
  opacity: 0;
  will-change: opacity;
  transition: opacity 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.scroll-text {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gray);
  font-weight: var(--weight-normal);
}

.scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--color-gray) 50%,
    transparent 100%
  );
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes fadeInBounce {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(10px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }

  .hero-title {
    font-size: var(--text-display);
    /* Maintain breathing space on mobile */
    line-height: 1.25;
  }
  
  .hero-content {
    /* Slightly less shift on mobile */
    transform: translateY(3%);
  }
  
  .scroll-indicator {
    bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 20px));
  }
  
  .scroll-text {
    font-size: 0.7rem;
  }
  
  .hero-subtitle-primary {
    font-size: calc(var(--text-accent) * 0.9);
  }
  
  .hero-subtitle-secondary {
    font-size: calc(var(--text-accent) * 0.75);
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: var(--spacing-sm);
    /* Minimal shift on small screens */
    transform: translateY(2%);
  }

  .hero-ampersand {
    display: block;
    margin: 0.2em 0;
  }
  
  .scroll-line {
    height: 40px;
  }
}
</style>
