<template>
  <section class="guestbook section-lg" ref="sectionRef">
    <div class="container">
      <!-- Section Title -->
      <div class="guestbook-header scroll-animate" :class="{ 'is-visible': isVisible }">
        <h2 class="text-heading text-center mb-md">{{ content.guestBookSection.title }}</h2>
        <p class="text-body text-center text-muted mb-xl">
          {{ content.guestBookSection.subtitle }}
        </p>
      </div>

      <!-- Form -->
      <div class="guestbook-form-wrapper scroll-animate" :class="{ 'is-visible': isVisible }" style="transition-delay: 0.2s;">
        <form @submit.prevent="submitMessage" class="guestbook-form">
          <div class="form-group">
            <label for="name" class="text-accent">{{ content.guestBookSection.form.nameLabel }}</label>
            <input
              id="name"
              v-model="newMessage.name"
              type="text"
              class="form-input"
              :placeholder="content.guestBookSection.form.namePlaceholder"
              required
            />
          </div>

          <div class="form-group">
            <label for="message" class="text-accent">{{ content.guestBookSection.form.messageLabel }}</label>
            <textarea
              id="message"
              v-model="newMessage.message"
              class="form-input form-textarea"
              :placeholder="content.guestBookSection.form.messagePlaceholder"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">
            <span>{{ content.guestBookSection.form.submitButton }}</span>
          </button>
        </form>
      </div>

      <!-- Messages List -->
      <div class="messages-list" v-if="messages.length > 0">
        <TransitionGroup name="message">
          <div
            v-for="(message, index) in messages"
            :key="message.id"
            class="message-card scroll-animate"
            :class="{ 'is-visible': isVisible }"
            :style="{ transitionDelay: `${(index * 0.1) + 0.4}s` }"
          >
            <p class="message-text text-body">{{ message.message }}</p>
            <p class="message-author text-accent">— {{ message.name }}</p>
            <p class="message-date text-accent text-muted">{{ formatDate(message.date) }}</p>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

const sectionRef = ref(null);
const isVisible = ref(false);

// Form data
const newMessage = ref({
  name: '',
  message: ''
});

// Messages from localStorage
const messages = ref([]);

// Load messages from localStorage
const loadMessages = () => {
  const stored = localStorage.getItem('wedding-messages');
  if (stored) {
    try {
      messages.value = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse messages:', e);
      messages.value = [];
    }
  }
};

// Save messages to localStorage
const saveMessages = () => {
  localStorage.setItem('wedding-messages', JSON.stringify(messages.value));
};

// Submit new message
const submitMessage = () => {
  if (!newMessage.value.name.trim() || !newMessage.value.message.trim()) {
    return;
  }

  const message = {
    id: Date.now(),
    name: newMessage.value.name.trim(),
    message: newMessage.value.message.trim(),
    date: new Date().toISOString()
  };

  // Add to beginning of array for newest first
  messages.value.unshift(message);
  
  // Save to localStorage
  saveMessages();

  // Reset form
  newMessage.value = {
    name: '',
    message: ''
  };
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Intersection Observer
let observer = null;

onMounted(() => {
  loadMessages();

  observer = new IntersectionObserver(
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
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.guestbook {
  background-color: var(--color-white);
}

.guestbook-header {
  margin-bottom: var(--spacing-xl);
}

/* Form */
.guestbook-form-wrapper {
  max-width: 600px;
  margin: 0 auto var(--spacing-2xl);
}

.guestbook-form {
  background-color: var(--color-beige);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--color-gray-dark);
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-bottom: 2px solid transparent;
  background-color: var(--color-white);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-near-black);
  transition: border-color var(--duration-fast) var(--ease-luxury),
              box-shadow var(--duration-fast) var(--ease-luxury);
}

.form-input:focus {
  outline: none;
  border-bottom-color: var(--color-gold-dark);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.form-input::placeholder {
  color: var(--color-gray);
  font-style: italic;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-near-black);
  color: var(--color-white);
  border-radius: var(--radius-sm);
  font-family: var(--font-accent);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  transition: transform var(--duration-fast) var(--ease-luxury),
              box-shadow var(--duration-fast) var(--ease-luxury);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Messages List */
.messages-list {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  gap: var(--spacing-md);
}

.message-card {
  background-color: var(--color-ivory);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-gold);
}

.message-text {
  color: var(--color-gray-dark);
  margin-bottom: var(--spacing-sm);
  font-style: italic;
}

.message-author {
  color: var(--color-near-black);
  margin-bottom: var(--spacing-xs);
  font-weight: var(--weight-medium);
}

.message-date {
  font-size: 0.75rem;
  color: var(--color-gray);
}

/* Message Transitions */
.message-enter-active {
  animation: slideInMessage var(--duration-normal) var(--ease-cinematic);
}

.message-leave-active {
  animation: fadeOut var(--duration-fast) var(--ease-luxury);
}

@keyframes slideInMessage {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .guestbook-form {
    padding: var(--spacing-md);
  }

  .message-card {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .form-input {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .guestbook-form-wrapper {
    margin-bottom: var(--spacing-xl);
  }
}
</style>
