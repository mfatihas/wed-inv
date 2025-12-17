<template>
  <MusicPlayer />
  
  <!-- Cinematic Opening Sequence -->
  <CinematicOpening v-if="!openingComplete" @complete="handleOpeningComplete" />
  
  <!-- Main Website Content -->
  <div v-else id="app" class="app">
    <Hero />
    <QuranVerse />
    <GreetingSection />
    <Couple v-if="isDesktop" />
    <CoupleMobile v-else />
    <Event />
    <Countdown />
    <Gallery />
    <Gift />
    <GuestBook />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CinematicOpening from './components/CinematicOpening.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import Hero from './components/Hero.vue';
import QuranVerse from './components/QuranVerse.vue';
import GreetingSection from './components/GreetingSection.vue';
import Couple from './components/Couple.vue';
import CoupleMobile from './components/CoupleMobile.vue';
import Event from './components/Event.vue';
import Countdown from './components/Countdown.vue';
import Gallery from './components/Gallery.vue';
import Gift from './components/Gift.vue';
import GuestBook from './components/GuestBook.vue';
import Footer from './components/Footer.vue';

// Opening animation state
const openingComplete = ref(false);

// Responsive breakpoint detection
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value > 768);

// Handle window resize
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  isDesktop.value = windowWidth.value > 768;
};

// Handle opening animation completion
const handleOpeningComplete = () => {
  openingComplete.value = true;
  // Add loaded class to trigger main content animations
  document.body.classList.add('loaded');
};

// Setup resize listener
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

// Cleanup
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
/* Import Global Styles */
@import './styles/global.css';
@import './styles/typography.css';
@import './styles/animations.css';

/* App Container */
.app {
  min-height: 100vh;
  opacity: 0;
  animation: fadeInFromCinematic 2000ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

/* Smooth fade-in animation for main content after cinematic opening */
@keyframes fadeInFromCinematic {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Smooth Scroll */
html {
  scroll-behavior: smooth;
}

/* Loading State */
body:not(.loaded) .app {
  opacity: 0;
}

body.loaded .app {
  animation: fadeIn var(--duration-slow) var(--ease-luxury) forwards;
}

/* Selection Styling */
::selection {
  background-color: var(--color-gold);
  color: var(--color-white);
}

::-moz-selection {
  background-color: var(--color-gold);
  color: var(--color-white);
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: var(--color-ivory);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-gold);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-gold-dark);
}
</style>
