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
  background-color: var(--color-bg-dark, #1a1a1a); /* Dark/Neutral background */
  color: var(--color-white);
  text-align: center;
  /* Min height to hold the viewport */
  min-height: 80vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.verse-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Icon */
.verse-icon {
  margin-bottom: var(--spacing-xl);
  opacity: 0;
  color: var(--color-gold);
  transition: opacity 1500ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.verse-icon.revealed {
  opacity: 0.4; /* Low opacity as requested */
}

/* Typography override for Verse */
.verse-text {
  font-family: var(--font-serif, serif); /* Use serif as requested */
  font-weight: 500; /* Medium weight */
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
  opacity: 0;
  transform: translateY(10px); /* Subtle shift for text */
  transition: opacity 2000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 2000ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.verse-text.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Reference */
.verse-reference {
  opacity: 0;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6); /* Reduced opacity */
  transition: opacity 1500ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.verse-reference.revealed {
  opacity: 1;
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .verse-text {
    font-size: 1.1rem; /* Slightly larger on mobile for readability if needed, or adjust from global */
  }
}
</style>
