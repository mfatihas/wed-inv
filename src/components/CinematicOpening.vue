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
        src="../assets/hero-bg.png" 
        alt="" 
        class="cinematic-bg-image"
      />
      <div class="cinematic-overlay"></div>
    </div>

    <!-- Content Layer -->
    <div class="cinematic-content" v-if="showContent">
      <!-- Couple Names with Letter-by-Letter Animation -->
      <h1 class="cinematic-title">
        <span class="cinematic-name cinematic-name-groom">
          <span 
            v-for="(letter, index) in name1Letters" 
            :key="`name1-${index}`"
            class="cinematic-letter"
            :style="{ 
              animationDelay: `${index * letterDelay}s`,
              opacity: showLetters ? undefined : 0
            }"
          >
            {{ letter }}
          </span>
        </span>
        <span class="cinematic-ampersand" :style="{ opacity: showAmpersand ? undefined : 0 }">
          &
        </span>
        <span class="cinematic-name cinematic-name-bride">
          <span 
            v-for="(letter, index) in name2Letters" 
            :key="`name2-${index}`"
            class="cinematic-letter"
            :style="{ 
              animationDelay: `${(name1Letters.length + index) * letterDelay}s`,
              opacity: showLetters ? undefined : 0
            }"
          >
            {{ letter }}
          </span>
        </span>
      </h1>

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
const showLetters = ref(false);
const showAmpersand = ref(false);
const showSubtitle = ref(false);
// New states for personalized gate
const showRecipient = ref(false);
const showCta = ref(false);

// Couple names split into letters
const name1 = content.couple.groomFirstName;
const name2 = content.couple.brideFirstName;
const name1Letters = ref(name1.split(''));
const name2Letters = ref(name2.split(''));

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
  lettersStart: 2500,            // Names start
  ampersandDelay: 2800,          // & appears
  subtitleDelay: 5500,           // Subtitle appears
  recipientDelay: 6500,          // "Kepada Yth" appears
  ctaDelay: 7500,                // Button appears
  // Auto-complete removed - waits for user interaction
};

// Letter-by-letter timing
const letterDelay = 0.1; // 100ms delay between each letter

// Animation sequence orchestration
onMounted(() => {
  isPlaying.value = true;

  // Phase 1-7: Standard Cinematic Sequence
  setTimeout(() => showBackground.value = true, timing.backgroundFadeStart);
  setTimeout(() => showScaleMotion.value = true, timing.backgroundScaleStart);
  setTimeout(() => showContent.value = true, timing.contentReveal);
  setTimeout(() => showLetters.value = true, timing.lettersStart);
  setTimeout(() => showAmpersand.value = true, timing.ampersandDelay);
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

/* Title - Flexbox for Asymmetric Layout */
.cinematic-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: var(--weight-light);
  line-height: 1;
  letter-spacing: 0.02em;
  color: var(--color-near-black);
  margin-bottom: clamp(2rem, 4vw, 3rem); /* Increased breathing space */
  gap: clamp(10px, 2vw, 30px);
}

.cinematic-name {
  display: inline-block;
  white-space: nowrap;
}

/* Asymmetric Composition Rules */

/* Groom: Slightly higher, larger, tighter */
.cinematic-name-groom {
  transform: translateY(-12px);
  font-size: 1.1em;
  letter-spacing: -0.01em;
}

/* Bride: Slightly lower, smaller, relaxed */
.cinematic-name-bride {
  transform: translateY(12px);
  font-size: 0.9em;
  letter-spacing: 0.05em;
}

/* Individual Letter Animation */
.cinematic-letter {
  display: inline-block;
  opacity: 0;
  animation: letterDrift 1200ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

/* Ampersand - Visual Pivot */
.cinematic-ampersand {
  display: inline-block;
  font-style: italic;
  font-weight: 300; /* Lighter */
  font-size: 0.8em;
  opacity: 0;
  transform: translateX(6px); /* Off-center pivot */
  transition: opacity 1500ms ease-in-out;
  color: var(--color-gold); /* Subtle accent */
}

.cinematic-ampersand[style*="opacity: undefined"] {
  opacity: 1;
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

/* Letter Drift - Each letter fades in with upward movement */
@keyframes letterDrift {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cinematic-title {
    font-size: clamp(2rem, 10vw, 4rem);
    flex-direction: column; /* Stack vertically on small screens */
    gap: 0.5rem;
  }
  
  /* Reset Asymmetry for vertical stack, or adjust specifically for vertical */
  .cinematic-name-groom {
    transform: none;
    font-size: 1.1em;
  }

  .cinematic-name-bride {
    transform: none;
    font-size: 0.9em;
  }

  .cinematic-ampersand {
    display: block;
    transform: none;
    margin: 0.2rem 0;
    font-size: 0.6em;
  }

  .cinematic-subtitle {
    font-size: clamp(0.875rem, 3vw, 1.25rem);
  }
}

@media (max-width: 480px) {
  .cinematic-content {
    width: 85%;
  }
  
  .cinematic-letter {
    /* Slightly faster on mobile for better experience */
    animation-duration: 1000ms;
  }
  
  .cinematic-title {
    margin-bottom: 1.5rem;
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