<template>
  <section class="event section-lg" ref="sectionRef">
    <div class="container">
      <!-- Section Title -->
      <div class="event-header scroll-animate" :class="{ 'is-visible': isVisible }">
        <h2 class="text-heading text-center mb-xl">{{ content.eventSection.title }}</h2>
      </div>

      <!-- Event Details Grid -->
      <div class="event-grid">
        <!-- Ceremony -->
        <div class="event-card scroll-animate" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.2s;">
          <div class="event-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
              <path d="M2 17L12 22L22 17"/>
              <path d="M2 12L12 17L22 12"/>
            </svg>
          </div>
          <h3 class="event-type text-accent mb-sm">{{ content.eventSection.ceremony.type }}</h3>
          <p class="event-time text-body-large mb-sm">{{ content.wedding.ceremonyTime }}</p>
          <p class="event-date text-accent mb-md">{{ content.wedding.ceremonyDate }}</p>
          <p class="event-venue text-body">
            {{ content.venue.ceremony.location }}<br>
            {{ content.venue.ceremony.address }}
          </p>
          <a 
            :href="content.venue.ceremony.googleMapsUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="map-link scroll-animate"
            :class="{ 'is-visible': ceremonyMapLinkVisible }"
          >
            View on Google Maps
          </a>
        </div>

        <!-- Reception -->
        <div class="event-card scroll-animate" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.4s;">
          <div class="event-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3 class="event-type text-accent mb-sm">{{ content.eventSection.reception.type }}</h3>
          <p class="event-time text-body-large mb-sm">{{ content.wedding.receptionTime }}</p>
          <p class="event-date text-accent mb-md">{{ content.wedding.receptionDate }}</p>
          <p class="event-venue text-body">
            {{ content.venue.reception.location }}<br>
            {{ content.venue.reception.address }}
          </p>
          <a 
            :href="content.venue.reception.googleMapsUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="map-link scroll-animate"
            :class="{ 'is-visible': receptionMapLinkVisible }"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

const sectionRef = ref(null);
const isVisible = ref(false);
const ceremonyMapLinkVisible = ref(false);
const receptionMapLinkVisible = ref(false);

// Intersection Observer for scroll animations
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // Sequential reveal for map links
          setTimeout(() => {
            ceremonyMapLinkVisible.value = true;
          }, 300); // 300ms after main content
          setTimeout(() => {
            receptionMapLinkVisible.value = true;
          }, 500); // 500ms after main content
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
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.event {
  background-color: var(--color-beige);
}

.event-header {
  margin-bottom: var(--spacing-xl);
}

/* Event Grid */
.event-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
}

.event-card {
  background-color: var(--color-white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-fast) var(--ease-luxury),
              box-shadow var(--duration-fast) var(--ease-luxury);
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

/* Event Icon */
.event-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-md);
  border-radius: 50%;
  background-color: var(--color-beige);
  color: var(--color-gold-dark);
}

/* Event Details */
.event-type {
  color: var(--color-gold-dark);
}

.event-time {
  font-weight: var(--weight-medium);
  color: var(--color-near-black);
}

.event-date {
  color: var(--color-gray);
}

.event-venue {
  color: var(--color-gray-dark);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--spacing-sm);
}

/* Google Maps Link - Editorial Footnote */
.map-link {
  display: inline-block;
  margin-top: var(--spacing-sm);
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gray); /* Lighter than primary text */
  text-decoration: none;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 1000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              color 500ms ease,
              text-decoration 300ms ease;
}

.map-link.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.map-link:hover {
  color: var(--color-gold-dark);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Additional Info */
.event-info {
  text-align: center;
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  max-width: 600px;
  margin: 0 auto;
}

.event-info p:last-child {
  color: var(--color-gray-dark);
  font-weight: var(--weight-medium);
}

/* Responsive */
@media (max-width: 768px) {
  .event-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .event-card {
    padding: var(--spacing-md);
  }

  .event-icon {
    width: 60px;
    height: 60px;
  }

  .event-icon svg {
    width: 30px;
    height: 30px;
  }
}
</style>
