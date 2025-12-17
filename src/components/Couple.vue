<template>
  <section class="couple section-lg" ref="sectionRef">
    <div class="container">
      <!-- Section Title - Editorial Chapter Style -->
      <div class="couple-header">
        <h2 
          class="couple-section-title text-heading text-center"
          :class="{ 'revealed': sectionTitleRevealed }"
        >
          {{ content.coupleSection.title }}
        </h2>
      </div>

      <!-- 2x2 Grid Layout -->
      <div class="couple-grid">
        <!-- Row 1 Col 1: Groom Text -->
        <div class="couple-text groom-text" ref="groomCardRef">
          <p 
            class="couple-accent text-accent"
            :class="{ 'revealed': groomAccentRevealed }"
          >
            {{ content.coupleSection.groom.title.toUpperCase() }}
          </p>
          
          <h3 
            class="couple-name text-heading-sm"
            :class="{ 'revealed': groomNameRevealed }"
          >
            {{ content.couple.groomFullName }}
          </h3>
          
          <p 
            class="couple-bio text-body"
            :class="{ 'revealed': groomBioRevealed }"
          >
            {{ content.coupleSection.groom.bio }}
          </p>
        </div>
        
        <!-- Row 1 Col 2: Groom Image -->
        <div 
          class="couple-image groom-image"
          :class="{ 'revealed': groomImageRevealed }"
        >
          <div class="crown-accent crown-king"></div>
          <img src="../assets/crop-novel.jpg" :alt="content.couple.groomFullName" />
          <img src="../assets/portrait-frame.png" class="frame-overlay" alt="" />
        </div>

        <!-- Row 2 Col 1: Bride Image -->
        <div 
          class="couple-image bride-image"
          :class="{ 'revealed': brideImageRevealed }"
        >
          <div class="crown-accent crown-queen"></div>
          <img src="../assets/crop-fatih.jpg" :alt="content.couple.brideFullName" />
          <img src="../assets/portrait-frame.png" class="frame-overlay" alt="" />
        </div>

        <!-- Row 2 Col 2: Bride Text -->
        <div class="couple-text bride-text" ref="brideCardRef">
          <p 
            class="couple-accent text-accent"
            :class="{ 'revealed': brideAccentRevealed }"
          >
            {{ content.coupleSection.bride.title.toUpperCase() }}
          </p>
          
          <h3 
            class="couple-name text-heading-sm"
            :class="{ 'revealed': brideNameRevealed }"
          >
            {{ content.couple.brideFullName }}
          </h3>
          
          <p 
            class="couple-bio text-body"
            :class="{ 'revealed': brideBioRevealed }"
          >
            {{ content.coupleSection.bride.bio }}
          </p>
        </div>
      </div>

      <!-- Our Story Section -->
      <div 
        class="couple-story"
        ref="storyRef"
        :class="{ 'revealed': storyRevealed }"
      >
        <h3 class="story-title text-heading-sm text-center">
          {{ content.coupleSection.story.title }}
        </h3>
        <div class="story-content">
          <p class="text-body-large text-center">
            {{ content.coupleSection.story.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

// Separate refs for individual observation
const sectionRef = ref(null);
const groomCardRef = ref(null);
const brideCardRef = ref(null);
const storyRef = ref(null);

// Reveal states - sequential narrative
const sectionTitleRevealed = ref(false);

// Groom reveal states
const groomAccentRevealed = ref(false);
const groomNameRevealed = ref(false);
const groomBioRevealed = ref(false);
const groomImageRevealed = ref(false);

// Bride reveal states
const brideAccentRevealed = ref(false);
const brideNameRevealed = ref(false);
const brideBioRevealed = ref(false);
const brideImageRevealed = ref(false);

// Story reveal state
const storyRevealed = ref(false);

// Sequential animation timing within each block (in milliseconds)
const personDelays = {
  pause: 200,        // Initial pause before starting
  accent: 400,       // Role (as accent)
  name: 800,         // Full name
  bio: 1200,         // Body copy
  image: 2000,       // Portrait image (LAST, after text settles)
};

// Observers
let sectionObserver = null;
let groomObserver = null;
let brideObserver = null;
let storyObserver = null;

// Trigger sequence for Groom (independent)
const triggerGroomReveal = () => {
  setTimeout(() => {
    groomAccentRevealed.value = true;
  }, personDelays.pause);
  
  setTimeout(() => {
    groomNameRevealed.value = true;
  }, personDelays.accent);
  
  setTimeout(() => {
    groomBioRevealed.value = true;
  }, personDelays.name);
  
  setTimeout(() => {
    groomImageRevealed.value = true;
  }, personDelays.image);
};

// Trigger sequence for Bride (independent)
const triggerBrideReveal = () => {
  setTimeout(() => {
    brideAccentRevealed.value = true;
  }, personDelays.pause);
  
  setTimeout(() => {
    brideNameRevealed.value = true;
  }, personDelays.accent);
  
  setTimeout(() => {
    brideBioRevealed.value = true;
  }, personDelays.name);
  
  setTimeout(() => {
    brideImageRevealed.value = true;
  }, personDelays.image);
};

onMounted(() => {
  // Section title observer (triggers early)
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionTitleRevealed.value = true;
          sectionObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px'
    }
  );

  // Groom card observer (independent, 60% visibility)
  groomObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerGroomReveal();
          groomObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.6,  // 60% of Groom block must be visible
      rootMargin: '0px'
    }
  );

  // Bride card observer (independent, 60% visibility)
  brideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerBrideReveal();
          brideObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.6,  // 60% of Bride block must be visible
      rootMargin: '0px'
    }
  );

  // Story observer (triggers when visible)
  storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          storyRevealed.value = true;
          storyObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px'
    }
  );

  // Attach observers to elements
  if (sectionRef.value) {
    sectionObserver.observe(sectionRef.value);
  }
  
  if (groomCardRef.value) {
    groomObserver.observe(groomCardRef.value);
  }
  
  if (brideCardRef.value) {
    brideObserver.observe(brideCardRef.value);
  }
  
  if (storyRef.value) {
    storyObserver.observe(storyRef.value);
  }
});

onUnmounted(() => {
  if (sectionObserver) sectionObserver.disconnect();
  if (groomObserver) groomObserver.disconnect();
  if (brideObserver) brideObserver.disconnect();
  if (storyObserver) storyObserver.disconnect();
});
</script>

<style scoped>
.couple {
  background-image: url('../assets/couple-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.couple::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3); /* Subtle overlay for text readability */
  pointer-events: none;
}

/* Section Title - Editorial Chapter Style */
.couple-section-title {
  margin-bottom: var(--spacing-2xl);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.couple-section-title.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* 2x2 Grid Layout */
.couple-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: var(--spacing-3xl);
  row-gap: var(--spacing-xs);
  max-width: 1200px;
  margin: 0 auto var(--spacing-2xl);
  align-items: start;
}

/* Text cells */
.couple-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: var(--spacing-lg);
}

/* Groom text - top left */
.groom-text {
  grid-column: 1;
  grid-row: 1;
}

/* Bride image - top right */
.bride-image {
  grid-column: 2;
  grid-row: 1;
}

/* Groom image - bottom left */
.groom-image {
  grid-column: 1;
  grid-row: 2;
}

/* Bride text - bottom right */
.bride-text {
  grid-column: 2;
  grid-row: 2;
}

/* Name Accent */
.couple-accent {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-gray);
  font-weight: var(--weight-normal);
  margin-bottom: var(--spacing-xs);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 1000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.couple-accent.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Full Name */
.couple-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: var(--weight-light);
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: var(--color-near-black);
  margin-bottom: var(--spacing-sm);
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 1000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.couple-name.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Bio */
.couple-bio {
  color: var(--color-gray-dark);
  line-height: var(--leading-relaxed);
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 1200ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1200ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.couple-bio.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Portrait Image */
.couple-image {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  border-radius: 50% / 40%;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 2000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 2000ms cubic-bezier(0.22, 0.61, 0.36, 1);
  box-shadow: 0 12px 48px rgba(42, 40, 38, 0.12),
              0 4px 16px rgba(42, 40, 38, 0.08);
  /* Elegant border accent */
  border: 2px solid rgba(198, 164, 116, 0.3);
  outline: 1px solid rgba(198, 164, 116, 0.15);
  outline-offset: -4px;
}

.couple-image.revealed {
  opacity: 1;
  transform: scale(1.0);
}

.couple-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.crown-accent {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background-image: url('../assets/crown-accent.png');
  background-size: 300% 300%;
  background-repeat: no-repeat;
  z-index: 3;
  opacity: 0.9;
}

/* King crown - middle row, left (red ornate crown) */
.crown-king {
  background-position: 0% 50%;
}

/* Queen crown - middle row, middle (purple ornate crown) */
.crown-queen {
  background-position: 50% 50%;
}

.frame-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  z-index: 2;
}

/* Our Story Section */
.couple-story {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-2xl) 0 0;
  border-top: 1px solid var(--color-border);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1200ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1200ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.couple-story.revealed {
  opacity: 1;
  transform: translateY(0);
}

.story-title {
  margin-bottom: var(--spacing-md);
  color: var(--color-near-black);
}

.story-content {
  max-width: 700px;
  margin: 0 auto;
}

.story-content p {
  color: var(--color-gray-dark);
  font-style: italic;
  line-height: var(--leading-loose);
}

/* Desktop - Enhanced */
@media (min-width: 769px) {
  .couple-grid {
    gap: var(--spacing-2xl);
  }
  
  .couple-image {
    min-height: 500px;
  }

  .story-title {
    font-size: clamp(2rem, 3vw, 2.5rem);
  }

  .story-content p {
    font-size: 1.25rem;
    line-height: 2;
  }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .couple-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  /* Reset grid positioning for mobile */
  .groom-text,
  .bride-image,
  .groom-image,
  .bride-text {
    grid-column: 1;
    grid-row: auto;
  }

  .couple-text {
    padding: 0;
  }

  .couple-story {
    padding: var(--spacing-xl) 0 0;
  }
  
  .couple-image {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .couple-image {
    aspect-ratio: 1/1;
    max-width: 320px;
  }
  
  .couple-name {
    font-size: calc(var(--text-display) * 0.85);
  }
}
</style>
