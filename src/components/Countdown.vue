<template>
  <section class="countdown section-lg" ref="sectionRef">
    <div class="container">
      <!-- Section Title -->
      <div class="countdown-header scroll-animate" :class="{ 'is-visible': isVisible }">
        <h2 class="text-heading text-center mb-md">{{ content.countdownSection.title }}</h2>
        <p class="text-accent text-center mb-xl">{{ content.countdownSection.subtitle }}</p>
      </div>

      <!-- Countdown Timer -->
      <div class="countdown-timer scroll-animate" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.2s;">
        <div class="countdown-item">
          <div class="countdown-number">{{ days }}</div>
          <div class="countdown-label text-accent">{{ content.countdownSection.labels.days }}</div>
        </div>

        <div class="countdown-separator">:</div>

        <div class="countdown-item">
          <div class="countdown-number">{{ hours }}</div>
          <div class="countdown-label text-accent">{{ content.countdownSection.labels.hours }}</div>
        </div>

        <div class="countdown-separator">:</div>

        <div class="countdown-item">
          <div class="countdown-number">{{ minutes }}</div>
          <div class="countdown-label text-accent">{{ content.countdownSection.labels.minutes }}</div>
        </div>

        <div class="countdown-separator">:</div>

        <div class="countdown-item">
          <div class="countdown-number">{{ seconds }}</div>
          <div class="countdown-label text-accent">{{ content.countdownSection.labels.seconds }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { content } from '../config/content.js';

const sectionRef = ref(null);
const isVisible = ref(false);

// Wedding date from content config
const weddingDate = new Date(content.wedding.dateTime);

// Countdown values
const now = ref(new Date());

// Computed countdown values with smooth transitions
const days = computed(() => {
  const diff = Math.max(0, weddingDate - now.value);
  return Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
});

const hours = computed(() => {
  const diff = Math.max(0, weddingDate - now.value);
  return Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
});

const minutes = computed(() => {
  const diff = Math.max(0, weddingDate - now.value);
  return Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
});

const seconds = computed(() => {
  const diff = Math.max(0, weddingDate - now.value);
  return Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
});

// Update timer
let intervalId = null;

onMounted(() => {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }

  // Start countdown
  intervalId = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.countdown {
  background-color: var(--color-white);
}

.countdown-header {
  margin-bottom: var(--spacing-xl);
}

/* Countdown Timer */
.countdown-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  max-width: 800px;
  margin: 0 auto;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.countdown-number {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: var(--weight-light);
  line-height: 1;
  color: var(--color-near-black);
  margin-bottom: var(--spacing-xs);
  /* Smooth number transition */
  transition: transform var(--duration-fast) var(--ease-luxury);
}

/* Prevent flicker during updates */
.countdown-number::before {
  content: '';
  display: block;
  height: 0;
}

.countdown-label {
  color: var(--color-gray);
}

.countdown-separator {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: var(--weight-light);
  color: var(--color-gold);
  margin: 0 var(--spacing-xs);
  padding-bottom: var(--spacing-md);
}

/* Responsive */
@media (max-width: 768px) {
  .countdown-timer {
    gap: var(--spacing-sm);
  }

  .countdown-item {
    min-width: 80px;
  }

  .countdown-number {
    font-size: 2.5rem;
  }

  .countdown-separator {
    font-size: 2rem;
    margin: 0 var(--spacing-xs);
  }
}

@media (max-width: 480px) {
  .countdown-timer {
    gap: var(--spacing-xs);
  }

  .countdown-item {
    min-width: 60px;
  }

  .countdown-number {
    font-size: 2rem;
  }

  .countdown-separator {
    font-size: 1.5rem;
    margin: 0;
  }

  .countdown-label {
    font-size: 0.75rem;
  }
}
</style>
