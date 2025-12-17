<template>
  <div v-if="!isComplete" class="cinematic-opening" :class="{ 'is-playing': isPlaying, 'fading-out': fadingOut }">
    <!-- Background Image Layer -->
    <div 
      class="cinematic-bg" 
      :class="{
        'reveal': showBackground,
        'scale-motion': showScaleMotion
      }"
    >
      <img 
        src="../assets/cinematic-bg.png" 
        alt="" 
        class="cinematic-bg-image"
      />
      <div class="cinematic-overlay"></div>
    </div>

    <!-- Content Layer -->
    <div class="cinematic-content" v-if="showContent">
      <!-- Artistic Initials Image -->
      <div 
        class="cinematic-initials-container"
        :class="{ 'show': showInitials }"
      >
        <img 
          src="../assets/initials-fn-2.png" 
          alt="F N" 
          class="cinematic-initials-image"
        />
      </div>

      <!-- Subtitle -->
      <p 
        class="cinematic-subtitle" 
        :class="{ 'show': showSubtitle }"
      >
        {{ content.hero.subtitle }}
      </p>

      <!-- Personalized Gate -->
      <div 
        class="cinematic-recipient"
        :class="{ 'show': showRecipient }"
      >
        <p class="recipient-label">Kepada Yth.</p>
        <p class="recipient-name">{{ guestName }}</p>
      </div>

      <!-- Enter Button -->
      <button 
        type="button"
        class="cinematic-cta"
        :class="{ 'show': showCta }"
        @click="handleEnter"
      >
        Buka Undangan
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { content } from '../config/content.js';

// Emit event when animation completes
const emit = defineEmits(['complete']);

// Get guest name from URL parameter
const guestName = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('to') || urlParams.get('guest') || urlParams.get('name');
  return name || 'Tamu Undangan';
});

// Animation state
const isPlaying = ref(false);
const isComplete = ref(false);
const fadingOut = ref(false);
const showBackground = ref(false);
const showScaleMotion = ref(false);
const showContent = ref(false);
const showInitials = ref(false);
const showSubtitle = ref(false);
// New states for personalized gate
const showRecipient = ref(false);
const showCta = ref(false);

// Handle manual completion via button
const handleEnter = () => {
  // Unmute the music player (browsers allow unmute after user interaction)
  if (window.unmuteMusicPlayer) {
    window.unmuteMusicPlayer();
  }
  
  fadingOut.value = true;
  
  // Wait for fade out animation (1.5s) then complete
  setTimeout(() => {
    isComplete.value = true;
    emit('complete');
  }, 1500);
};

// Timing configuration (in milliseconds)
const timing = {
  initialSilence: 500,           // Pre-load silence
  backgroundFadeStart: 500,      // Background start
  backgroundScaleStart: 800,     // Scale motion
  contentReveal: 2300,           // Content container visible
  initialsStart: 2500,           // Artistic initials image appears
  subtitleDelay: 4200,           // Subtitle appears
  recipientDelay: 5200,          // "Kepada Yth" appears
  ctaDelay: 6200,                // Button appears
  // Auto-complete removed - waits for user interaction
};

// Animation sequence orchestration
onMounted(() => {
  isPlaying.value = true;

  // Phase 1-7: Cinematic Sequence with Artistic Initials
  setTimeout(() => showBackground.value = true, timing.backgroundFadeStart);
  setTimeout(() => showScaleMotion.value = true, timing.backgroundScaleStart);
  setTimeout(() => showContent.value = true, timing.contentReveal);
  setTimeout(() => showInitials.value = true, timing.initialsStart);
  setTimeout(() => showSubtitle.value = true, timing.subtitleDelay);

  // Phase 8: Personalized Gate
  setTimeout(() => showRecipient.value = true, timing.recipientDelay);
  setTimeout(() => showCta.value = true, timing.ctaDelay);
});
</script>

<style scoped>
/* Container - Full screen overlay */
.cinematic-opening {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: var(--color-ivory);
  overflow: hidden;
  transition: opacity 1500ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Fade-out state for smooth transition to main content */
.cinematic-opening.fading-out {
  opacity: 0;
}

/* Background Image Layer */
.cinematic-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(1.15);
  will-change: opacity, transform;
}

/* Background Reveal Animation - Slow fade in (1800-2200ms) */
.cinematic-bg.reveal {
  animation: cinematicImageReveal 2000ms ease-in-out forwards;
}

/* Scale Motion Animation - Slow camera push (3500-4500ms) */
.cinematic-bg.scale-motion {
  animation: 
    cinematicImageReveal 2000ms ease-in-out forwards,
    cinematicScale 4000ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

.cinematic-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Soft overlay for readability */
.cinematic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(255, 248, 240, 0.4) 100%
  );
}

/* Content Layer */
.cinematic-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  width: 90%;
  max-width: 1200px;
}

/* Artistic Initials Container */
.cinematic-initials-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
  opacity: 0;
  transform: scale(0.98);
  transition:
    opacity 1600ms cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 1600ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.cinematic-initials-container.show {
  opacity: 1;
  transform: scale(1);
}

/* Artistic Initials Image */
.cinematic-initials-image {
  width: auto;
  height: clamp(100px, 12vw, 200px);
  max-width: 90%;
  object-fit: contain;
  filter: contrast(1.05) brightness(0.98);
  will-change: opacity, transform;
}

/* Subtitle */
.cinematic-subtitle {
  font-family: var(--font-accent);
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: var(--weight-normal);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-gray-dark);
  opacity: 0;
  transform: translateY(10px);
  transition: 
    opacity 1400ms ease-in-out,
    transform 1400ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.cinematic-subtitle.show {
  opacity: 1;
  transform: translateY(0);
}

/* Keyframe Animations */

/* Background Image Fade-In */
@keyframes cinematicImageReveal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Cinematic Scale Motion - Slow camera push */
@keyframes cinematicScale {
  from {
    transform: scale(1.15);
  }
  to {
    transform: scale(1.0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cinematic-initials-image {
    height: clamp(120px, 20vw, 220px);
  }

  .cinematic-subtitle {
    font-size: clamp(0.875rem, 3vw, 1.25rem);
  }
}

@media (max-width: 480px) {
  .cinematic-content {
    width: 85%;
  }
  
  .cinematic-initials-container {
    margin-bottom: 1.5rem;
  }
  
  .cinematic-initials-image {
    height: clamp(100px, 24vw, 180px);
  }
  
  .recipient-name {
    font-size: 1.25rem;
  }
}
</style>

<style scoped>
/* Recipient & Gate Styles */
.cinematic-recipient {
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 1200ms ease-in-out, transform 1200ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.cinematic-recipient.show {
  opacity: 1;
  transform: translateY(0);
}

.recipient-label {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gray-dark);
  margin-bottom: 0.5rem;
  font-weight: var(--weight-light);
}

.recipient-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-near-black);
  font-weight: var(--weight-normal);
  line-height: 1.2;
}

/* CTA Button */
.cinematic-cta {
  margin-top: 2.5rem;
  padding: 0.75rem 2rem;
  background: transparent;
  border: 1px solid var(--color-gray-dark);
  color: var(--color-near-black);
  font-family: var(--font-accent);
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: all 1200ms cubic-bezier(0.22, 0.61, 0.36, 1);
  
  /* Mobile compatibility */
  position: relative;
  z-index: 100;
  pointer-events: auto;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.cinematic-cta.show {
  opacity: 1;
  transform: translateY(0);
}

.cinematic-cta:hover {
  background-color: var(--color-near-black);
  color: var(--color-ivory);
  border-color: var(--color-near-black);
}

.cinematic-cta:active {
  transform: scale(0.98);
}
</style>