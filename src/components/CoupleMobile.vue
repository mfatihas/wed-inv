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

      <!-- Couple Grid -->
      <div class="couple-grid">
        <!-- Groom Card -->
        <div class="couple-card" ref="groomCardRef">
          <!-- Name Accent - Identity Marker -->
          <p 
            class="couple-accent text-accent"
            :class="{ 'revealed': groomAccentRevealed }"
          >
            {{ content.coupleSection.groom.title.toUpperCase() }}
          </p>
          
          <!-- Full Name - Title Card -->
          <h3 
            class="couple-name text-heading-sm"
            :class="{ 'revealed': groomNameRevealed }"
          >
            {{ content.couple.groomFullName }}
          </h3>
          
          <!-- Body Copy - Poetic Bio -->
          <p 
            class="couple-bio text-body"
            :class="{ 'revealed': groomBioRevealed }"
          >
            {{ content.coupleSection.groom.bio }}
          </p>
          
          <!-- Portrait Image - Emotional Payoff (Last) -->
          <div 
            class="couple-image"
            :class="{ 'revealed': groomImageRevealed }"
          >
            <img src="../assets/crop-fatih.jpg" :alt="content.couple.groomFullName" />
          </div>
        </div>

        <!-- Bride Card -->
        <div class="couple-card" ref="brideCardRef">
          <!-- Name Accent -->
          <p 
            class="couple-accent text-accent"
            :class="{ 'revealed': brideAccentRevealed }"
          >
            {{ content.coupleSection.bride.title.toUpperCase() }}
          </p>
          
          <!-- Full Name -->
          <h3 
            class="couple-name text-heading-sm"
            :class="{ 'revealed': brideNameRevealed }"
          >
            {{ content.couple.brideFullName }}
          </h3>
          
          <!-- Body Copy -->
          <p 
            class="couple-bio text-body"
            :class="{ 'revealed': brideBioRevealed }"
          >
            {{ content.coupleSection.bride.bio }}
          </p>
          
          <!-- Portrait Image (Last) -->
          <div 
            class="couple-image"
            :class="{ 'revealed': brideImageRevealed }"
          >
            <img src="../assets/crop-novel.jpg" :alt="content.couple.brideFullName" />
          </div>
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

/* Couple Grid - Editorial Layout */
.couple-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3xl);
  margin-bottom: var(--spacing-xl); /* Reduced from 3xl to xl */
}

.couple-card {
  position: relative;
  text-align: center;
}

/* Name Accent - Identity Marker */
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

/* Full Name - Title Card */
.couple-name {
  font-family: var(--font-display);
  font-size: var(--text-display);
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

/* Role Label - Metadata */
.couple-role {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-gray);
  font-weight: var(--weight-light);
  margin-bottom: var(--spacing-md);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 1000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.couple-role.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Body Copy - Poetic, Narrow Width */
.couple-bio {
  color: var(--color-gray-dark);
  max-width: 420px;
  margin: 0 auto var(--spacing-lg);
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

/* Portrait Image - Editorial Frame with Ornate Gold Border */
.couple-image {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 2/3; /* Narrower, taller portrait */
  margin: 0 auto;
  overflow: hidden;
  border-radius: 45% / 35%; /* Balanced oval shape */
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 2000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 2000ms cubic-bezier(0.22, 0.61, 0.36, 1);
  /* Ornate gold frame */
  border: 8px solid rgba(198, 164, 116, 0.7);
  outline: 3px solid rgba(198, 164, 116, 0.4);
  outline-offset: 2px;
  /* Shadow for depth */
  box-shadow: 
    0 12px 48px rgba(42, 40, 38, 0.15),
    0 4px 16px rgba(42, 40, 38, 0.1),
    inset 0 0 20px rgba(198, 164, 116, 0.15);
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

/* Asymmetric Editorial Nuance */
/* Groom: Slightly firmer presence with marginally stronger shadow */
.couple-card:first-child .couple-image {
  box-shadow: 0 12px 52px rgba(42, 40, 38, 0.14),
              0 4px 18px rgba(42, 40, 38, 0.10);
}

/* Bride: Slightly softer presence with marginally softer shadow */
.couple-card:last-child .couple-image {
  box-shadow: 0 12px 44px rgba(42, 40, 38, 0.10),
              0 4px 14px rgba(42, 40, 38, 0.06);
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

/* Responsive */
@media (max-width: 768px) {
  .couple-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }

  .couple-story {
    padding: var(--spacing-xl) 0 0;
  }
  
  .couple-bio {
    max-width: 100%;
  }
  
  .couple-image {
    max-width: 220px;
  }
}

@media (max-width: 480px) {
  .couple-grid {
    gap: var(--spacing-xl);
  }

  .couple-image {
    max-width: 200px;
  }
  
  .couple-name {
    font-size: calc(var(--text-display) * 0.85);
  }
}
</style>