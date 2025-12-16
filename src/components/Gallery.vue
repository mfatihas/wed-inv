<template>
  <section class="gallery section-lg" ref="sectionRef">
    <div class="container">
      <!-- Section Title -->
      <div class="gallery-header scroll-animate" :class="{ 'is-visible': headerVisible }">
        <h2 class="text-heading text-center mb-xl">{{ content.gallerySection.title }}</h2>
      </div>

      <!-- Editorial Asymmetric Gallery Grid -->
      <div class="gallery-grid">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          :ref="el => imageRefs[index] = el"
          class="gallery-item"
          :class="[
            { 'is-revealed': revealedImages[index] },
            `gallery-item-${index % 6}` // For asymmetric heights
          ]"
          @click="openModal(index)"
        >
          <div class="gallery-image">
            <div class="image-placeholder">
              <span class="text-accent">{{ image.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Simple Modal Lightbox -->
      <Transition name="modal">
        <div v-if="modalOpen" class="modal" @click="closeModal">
          <div class="modal-backdrop"></div>
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal" aria-label="Close">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <div class="modal-image">
              <div class="image-placeholder-large">
                <span class="text-accent">{{ images[currentImageIndex]?.label }}</span>
              </div>
            </div>

            <!-- Navigation -->
            <button 
              v-if="currentImageIndex > 0"
              class="modal-nav modal-prev" 
              @click="prevImage"
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button 
              v-if="currentImageIndex < images.length - 1"
              class="modal-nav modal-next" 
              @click="nextImage"
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import { content } from '../config/content.js';

const sectionRef = ref(null);
const headerVisible = ref(false);
const modalOpen = ref(false);
const currentImageIndex = ref(0);

// Gallery images from content config
const images = ref(content.gallerySection.images);

// Refs for each image element
const imageRefs = reactive([]);

// Track which images have been revealed (one-time animation)
const revealedImages = reactive(images.value.map(() => false));

// Modal controls
const openModal = (index) => {
  currentImageIndex.value = index;
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = '';
};

const nextImage = () => {
  if (currentImageIndex.value < images.value.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

// Keyboard navigation
const handleKeydown = (e) => {
  if (!modalOpen.value) return;
  
  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  }
};

// Individual IntersectionObserver per image
let headerObserver = null;
let imageObservers = [];

onMounted(() => {
  // Header observer
  headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          headerVisible.value = true;
          headerObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px'
    }
  );

  if (sectionRef.value) {
    headerObserver.observe(sectionRef.value);
  }

  // Create individual observer for each image (60% threshold)
  images.value.forEach((_, index) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealedImages[index]) {
            revealedImages[index] = true;
            // Disconnect after reveal (one-time animation)
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.6, // 60% of image must be visible
        rootMargin: '0px'
      }
    );

    if (imageRefs[index]) {
      observer.observe(imageRefs[index]);
    }

    imageObservers.push(observer);
  });

  // Add keyboard listener
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  if (headerObserver) {
    headerObserver.disconnect();
  }
  imageObservers.forEach(observer => observer.disconnect());
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.gallery {
  background-color: var(--color-ivory);
}

.gallery-header {
  margin-bottom: var(--spacing-xl);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1000ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.gallery-header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Editorial Asymmetric Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: var(--spacing-md); /* Generous gutters */
  max-width: 1200px;
  margin: 0 auto;
}

/* Asymmetric Height Patterns */
/* Portrait (tall) images */
.gallery-item-0,
.gallery-item-2,
.gallery-item-4 {
  grid-row: span 2; /* Taller, portrait aspect */
}

/* Landscape (shorter) images */
.gallery-item-1,
.gallery-item-3,
.gallery-item-5 {
  grid-row: span 1; /* Shorter, landscape aspect */
}

.gallery-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--radius-portrait-editorial); /* Soft-rectangle, consistent with Couple */
  
  /* Initial state for cinematic reveal */
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 800ms cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 800ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Revealed state */
.gallery-item.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.gallery-image {
  width: 100%;
  height: 100%;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-nude) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Remove hover effects for editorial cleanliness */
/* No zoom, no overlay icons */

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-overlay);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1001;
}

.modal-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder-large {
  width: 80vw;
  max-width: 1000px;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-nude) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-portrait-editorial);
}

/* Modal Controls */
.modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 1002;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  color: var(--color-near-black);
  transition: transform var(--duration-fast) var(--ease-luxury);
}

.modal-close:hover {
  transform: rotate(90deg);
}

.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  color: var(--color-near-black);
  transition: transform var(--duration-fast) var(--ease-luxury);
}

.modal-nav:hover {
  transform: translateY(-50%) scale(1.1);
}

.modal-prev {
  left: var(--spacing-md);
}

.modal-next {
  right: var(--spacing-md);
}

/* Modal Transitions - Simple Fade */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 400ms ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: opacity 400ms ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px;
    gap: var(--spacing-sm);
  }

  .modal-nav {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 250px;
  }

  .image-placeholder-large {
    width: 90vw;
    aspect-ratio: 1/1;
  }
}
</style>
