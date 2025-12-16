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
        <!-- Error Message -->
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>

        <form @submit.prevent="submitMessage" class="guestbook-form">
          <div class="form-group">
            <label for="name" class="text-accent">{{ content.guestBookSection.form.nameLabel }}</label>
            <input
              id="name"
              v-model="newMessage.name"
              type="text"
              class="form-input"
              :placeholder="content.guestBookSection.form.namePlaceholder"
              :disabled="isSubmitting"
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
              :disabled="isSubmitting"
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">{{ content.guestBookSection.form.submitButton }}</span>
            <span v-else>Mengirim...</span>
          </button>
        </form>
      </div>

      <!-- Messages List -->
      <div v-if="isLoading" class="loading-message">
        <p>Memuat pesan...</p>
      </div>

      <div class="messages-list" v-else-if="messages.length > 0">
        <TransitionGroup name="message">
          <div
            v-for="(message, index) in messages"
            :key="message.id"
            class="message-card scroll-animate"
            :class="{ 'is-visible': isVisible, 'is-optimistic': message.isOptimistic }"
            :style="{ transitionDelay: `${(index * 0.1) + 0.4}s` }"
          >
            <p class="message-text text-body">{{ message.message }}</p>
            <p class="message-author text-accent">— {{ message.name }}</p>
            <p class="message-date text-accent text-muted">{{ formatDate(message.date) }}</p>
          </div>
        </TransitionGroup>
      </div>

      <div v-else-if="!isLoading && !error" class="no-messages">
        <p>Belum ada pesan. Jadilah yang pertama!</p>
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

// Messages from API
const messages = ref([]);
const isLoading = ref(false);
const isSubmitting = ref(false);
const error = ref(null);

// API endpoint
const API_URL = '/api/messages';

// Load messages from API
const loadMessages = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (data.success) {
      // Transform API data to match our format
      messages.value = data.data.map(msg => ({
        id: msg.id,
        name: msg.name,
        message: msg.message,
        date: msg.created_at
      }));
    } else {
      throw new Error(data.error || 'Failed to load messages');
    }
  } catch (e) {
    console.error('Failed to load messages:', e);
    error.value = 'Unable to load messages. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

// Submit new message
const submitMessage = async () => {
  if (!newMessage.value.name.trim() || !newMessage.value.message.trim()) {
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  // Create optimistic message for immediate UI feedback
  const optimisticMessage = {
    id: `temp-${Date.now()}`,
    name: newMessage.value.name.trim(),
    message: newMessage.value.message.trim(),
    date: new Date().toISOString(),
    isOptimistic: true
  };

  // Add optimistically to UI
  messages.value.unshift(optimisticMessage);

  // Reset form immediately for better UX
  const submittedData = { ...newMessage.value };
  newMessage.value = {
    name: '',
    message: ''
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: submittedData.name.trim(),
        message: submittedData.message.trim()
      })
    });

    const data = await response.json();

    if (data.success) {
      // Replace optimistic message with real data
      const index = messages.value.findIndex(m => m.id === optimisticMessage.id);
      if (index !== -1) {
        // Use splice to properly trigger Vue reactivity and avoid duplicates
        messages.value.splice(index, 1, {
          id: data.data.id,
          name: data.data.name,
          message: data.data.message,
          date: data.data.created_at,
          isOptimistic: false
        });
      }
    } else {
      throw new Error(data.error || 'Failed to submit message');
    }
  } catch (e) {
    console.error('Failed to submit message:', e);
    error.value = 'Unable to submit your message. Please try again.';
    
    // Remove optimistic message on failure
    messages.value = messages.value.filter(m => m.id !== optimisticMessage.id);
    
    // Restore form data so user doesn't lose their message
    newMessage.value = submittedData;
  } finally {
    isSubmitting.value = false;
  }
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

/* Error Message */
.error-message {
  background-color: #fee;
  color: #c33;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  border-left: 4px solid #c33;
}

.error-message p {
  margin: 0;
  font-size: 0.9rem;
}

/* Loading and No Messages States */
.loading-message,
.no-messages {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-gray);
  font-style: italic;
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

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
              box-shadow var(--duration-fast) var(--ease-luxury),
              opacity var(--duration-fast) var(--ease-luxury);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.message-card.is-optimistic {
  opacity: 0.7;
  border-left-color: var(--color-gray);
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
