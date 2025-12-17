<template>
  <section class="greeting-section section-padding" ref="sectionRef">
    <div class="container">
      <!-- Islamic Geometric Ornament (Top) -->
      <div 
        class="ornament ornament-top"
        :class="{ 'revealed': ornamentRevealed }"
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <!-- Islamic Star Pattern -->
          <g class="star-pattern">
            <path d="M50,15 L55,40 L80,40 L60,55 L70,80 L50,65 L30,80 L40,55 L20,40 L45,40 Z" fill="none" stroke="currentColor" stroke-width="0.5"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="0.3"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="0.3"/>
          </g>
        </svg>
      </div>

      <div class="greeting-content">
        <!-- Salam Text -->
        <h2 
          class="salam-text text-heading-lg"
          :class="{ 'revealed': salamRevealed }"
        >
          {{ content.greeting.salam }}
        </h2>

        <!-- Invitation Text -->
        <p 
          class="invitation-text text-body-lg"
          :class="{ 'revealed': invitationRevealed }"
        >
          {{ content.greeting.invitation }}
        </p>
      </div>

      <!-- Islamic Geometric Ornament (Bottom) -->
      <div 
        class="ornament ornament-bottom"
        :class="{ 'revealed': ornamentRevealed }"
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <!-- Islamic Star Pattern -->
          <g class="star-pattern">
            <path d="M50,15 L55,40 L80,40 L60,55 L70,80 L50,65 L30,80 L40,55 L20,40 L45,40 Z" fill="none" stroke="currentColor" stroke-width="0.5"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="0.3"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="0.3"/>
          </g>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

const sectionRef = ref(null);
const ornamentRevealed = ref(false);
const salamRevealed = ref(false);
const invitationRevealed = ref(false);

const delays = {
  ornament: 200,
  salam: 600,
  invitation: 1400
};

let observer = null;

const triggerReveal = () => {
  // Ornaments reveal first
  setTimeout(() => {
    ornamentRevealed.value = true;
  }, delays.ornament);

  // Salam reveals second
  setTimeout(() => {
    salamRevealed.value = true;
  }, delays.salam);

  // Invitation reveals last
  setTimeout(() => {
    invitationRevealed.value = true;
  }, delays.invitation);
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
      threshold: 0.4, // 40% visibility required
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
.greeting-section {
  /* Soft warm ivory and champagne background with subtle gradient */
  background: linear-gradient(
    180deg,
    #faf8f3 0%,
    #f5f1e8 50%,
    #faf8f3 100%
  );
  
  /* Soft vignette effect */
  position: relative;
  overflow: hidden;
  
  /* Generous spacing */
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-4xl) var(--spacing-lg);
}

/* Vignette overlay */
.greeting-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(0, 0, 0, 0.03) 100%
  );
  pointer-events: none;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.greeting-content {
  padding: 0 var(--spacing-xl);
}

/* Islamic Ornaments */
.ornament {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  opacity: 0;
  color: var(--color-gold);
  transition: opacity 2000ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.ornament.revealed {
  opacity: 0.15; /* Very low opacity as requested */
}

.ornament-top {
  margin-bottom: var(--spacing-3xl);
}

.ornament-bottom {
  margin-top: var(--spacing-3xl);
}

.ornament svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Salam Text */
.salam-text {
  font-family: var(--font-serif);
  font-weight: 500;
  color: var(--color-gold-dark, #8B7355);
  margin-bottom: var(--spacing-2xl);
  letter-spacing: 0.02em;
  
  /* Animation starting state */
  opacity: 0;
  transform: translateY(30px);
  transition: 
    opacity 2500ms cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 2500ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.salam-text.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Invitation Text */
.invitation-text {
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 2;
  color: var(--color-text, #333);
  max-width: 700px;
  margin: 0 auto;
  
  /* Animation starting state */
  opacity: 0;
  transform: translateY(30px);
  transition: 
    opacity 2500ms cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 2500ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.invitation-text.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .greeting-section {
    min-height: 80vh;
    padding: var(--spacing-3xl) var(--spacing-md);
  }

  .greeting-content {
    padding: 0 var(--spacing-md);
  }

  .ornament {
    width: 50px;
    height: 50px;
  }

  .ornament-top {
    margin-bottom: var(--spacing-2xl);
  }

  .ornament-bottom {
    margin-top: var(--spacing-2xl);
  }

  .salam-text {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-xl);
  }

  .invitation-text {
    font-size: 1rem;
    line-height: 1.8;
  }
}

/* Premium editorial feel with generous negative space */
@media (min-width: 1200px) {
  .greeting-section {
    padding: var(--spacing-5xl) var(--spacing-2xl);
  }

  .container {
    max-width: 1000px;
  }
}
</style>
