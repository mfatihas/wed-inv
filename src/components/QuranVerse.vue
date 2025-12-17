<template>
  <section class="quran-verse section-padding" ref="sectionRef">
    <div class="container">
      <div class="verse-content">
        <!-- Sacred Icon -->
        <div 
          class="verse-icon"
          :class="{ 'revealed': iconRevealed }"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Verse Text -->
        <blockquote 
          class="verse-text text-heading-sm"
          :class="{ 'revealed': textRevealed }"
        >
          &ldquo;{{ content.spiritual.verse }}&rdquo;
        </blockquote>

        <!-- Surah Reference -->
        <p 
          class="verse-reference text-caption"
          :class="{ 'revealed': referenceRevealed }"
        >
          {{ content.spiritual.surah }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

const sectionRef = ref(null);
const iconRevealed = ref(false);
const textRevealed = ref(false);
const referenceRevealed = ref(false);

const delays = {
  pause: 400,
  icon: 0,
  text: 800,
  reference: 2000
};

let observer = null;

const triggerReveal = () => {
  // Icon reveals immediately
  iconRevealed.value = true;

  // Verse text reveals after pause
  setTimeout(() => {
    textRevealed.value = true;
  }, delays.text);

  // Reference reveals last
  setTimeout(() => {
    referenceRevealed.value = true;
  }, delays.reference);
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerReveal();
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.6, // 60% visibility required
      rootMargin: '0px'
    }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.quran-verse {
  /* Elegant dusty rose/blush gradient for sophisticated contrast */
  background: linear-gradient(
    135deg,
    #f9f5f3 0%,
    #f5ede9 50%,
    #f3ebe9 100%
  );
  
  color: var(--color-text-dark, #2a2a2a);
  text-align: center;
  min-height: 80vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  overflow: hidden;
}

/* Soft radial overlay for depth and cinematic feel */
.quran-verse::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(245, 237, 225, 0.4) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* Subtle decorative corner accents */
.quran-verse::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.08) 0%, transparent 30%),
    radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.08) 0%, transparent 30%);
  pointer-events: none;
}

.verse-content {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-lg);
  position: relative;
  z-index: 1;
  
  /* Subtle depth with soft shadow */
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(5px);
}

/* Icon */
.verse-icon {
  margin-bottom: var(--spacing-xl);
  opacity: 0;
  color: #C9A961; /* Warmer, richer gold */
  transition: opacity 1500ms cubic-bezier(0.22, 0.61, 0.36, 1);
  filter: drop-shadow(0 2px 4px rgba(201, 169, 97, 0.3));
}

.verse-icon.revealed {
  opacity: 0.6; /* More visible for elegance */
}

/* Typography override for Verse */
.verse-text {
  font-family: var(--font-serif, serif);
  font-weight: 500;
  line-height: 1.9;
  margin-bottom: var(--spacing-xl);
  color: #3a3a3a; /* Slightly softer dark */
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 2000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 2000ms cubic-bezier(0.22, 0.61, 0.36, 1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.verse-text.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Reference */
.verse-reference {
  opacity: 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8B7355; /* Soft golden brown */
  font-size: 0.75rem;
  font-weight: 500;
  transition: opacity 1500ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.verse-reference.revealed {
  opacity: 0.85;
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .verse-content {
    padding: var(--spacing-2xl) var(--spacing-md);
  }
  
  .verse-text {
    font-size: 1.1rem;
    line-height: 1.8;
  }
  
  .verse-reference {
    font-size: 0.7rem;
  }
}

/* Large screens - more generous spacing */
@media (min-width: 1200px) {
  .verse-content {
    max-width: 1000px;
    padding: var(--spacing-4xl) var(--spacing-2xl);
  }
}
</style>
