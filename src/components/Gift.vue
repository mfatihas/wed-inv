<template>
  <section class="gift section-lg" ref="sectionRef">
    <div class="container">
      <!-- Section Title -->
      <div class="gift-header scroll-animate" :class="{ 'is-visible': isVisible }">
        <h2 class="text-heading text-center mb-md">{{ content.gift.title }}</h2>
        <p class="gift-description text-body text-center">{{ content.gift.description }}</p>
      </div>

      <!-- Gift Card -->
      <div class="gift-card scroll-animate" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.2s;">
        <div class="gift-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
        </div>
        
        <h3 class="gift-bank text-accent mb-sm">{{ content.gift.bankName }}</h3>
        <p class="gift-name text-body-large mb-sm">{{ content.gift.accountName }}</p>
        <p class="gift-number text-heading-sm mb-md">{{ content.gift.accountNumber }}</p>
        
        <button 
          @click="copyAccountNumber" 
          class="copy-button"
          :class="{ 'copied': isCopied }"
        >
          <svg v-if="!isCopied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{{ isCopied ? 'Tersalin!' : 'Salin Nomor Rekening' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

const sectionRef = ref(null);
const isVisible = ref(false);
const isCopied = ref(false);

// Copy to clipboard
const copyAccountNumber = async () => {
  try {
    await navigator.clipboard.writeText(content.gift.accountNumber);
    isCopied.value = true;
    
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Intersection Observer
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
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
.gift {
  background-color: var(--color-ivory);
}

.gift-header {
  max-width: 700px;
  margin: 0 auto var(--spacing-xl);
}

.gift-description {
  color: var(--color-gray-dark);
  line-height: var(--leading-relaxed);
}

/* Gift Card */
.gift-card {
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--color-white);
  padding: var(--spacing-2xl) var(--spacing-xl);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--shadow-md);
}

/* Gift Icon */
.gift-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  border-radius: 50%;
  background-color: var(--color-beige);
  color: var(--color-gold-dark);
}

.gift-bank {
  color: var(--color-gold-dark);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
}

.gift-name {
  color: var(--color-near-black);
  font-weight: var(--weight-medium);
}

.gift-number {
  font-family: var(--font-mono, monospace);
  color: var(--color-near-black);
  font-weight: var(--weight-medium);
  letter-spacing: 0.05em;
}

/* Copy Button */
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold-dark);
  font-family: var(--font-accent);
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background-color: var(--color-gold);
  color: var(--color-white);
}

.copy-button.copied {
  background-color: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  color: var(--color-white);
}

.copy-button svg {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .gift-card {
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .gift-number {
    font-size: 1.25rem;
  }

  .copy-button {
    font-size: 0.75rem;
    padding: var(--spacing-xs) var(--spacing-md);
  }
}
</style>
