<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Closing Message -->
        <p class="footer-message text-body-large text-center mb-md">
          {{ content.footer.message }}
        </p>

        <!-- Couple Names -->
        <p class="footer-names text-heading-sm text-center mb-lg">
          {{ content.couple.coupleNames }}
        </p>

        <!-- Divider -->
        <div class="footer-divider"></div>

        <!-- Meta Info -->
        <div class="footer-meta">
          <p class="text-accent">
            {{ content.footer.meta }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { content } from '../config/content.js';
// Footer component - content from configuration
</script>

<style scoped>
.footer {
  background-color: var(--color-near-black);
  color: var(--color-ivory);
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
}

.footer-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.footer-message {
  color: var(--color-ivory);
  font-style: italic;
  opacity: 0.9;
}

.footer-names {
  color: var(--color-white);
  font-family: var(--font-display);
  font-weight: var(--weight-light);
}

.footer-divider {
  width: 60px;
  height: 1px;
  background-color: var(--color-gold);
  margin: var(--spacing-lg) auto;
}

.footer-meta {
  color: var(--color-gray);
}

.footer-meta .text-accent {
  color: var(--color-gray);
  letter-spacing: var(--tracking-wide);
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: var(--spacing-xl) 0 var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .footer-message {
    font-size: var(--text-body);
  }
}
</style>
