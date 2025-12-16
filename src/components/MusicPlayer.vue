<template>
  <div class="music-player-container">
    <!-- Hidden YouTube Player -->
    <div id="youtube-player" class="hidden-player"></div>

    <!-- Floating Control Widget -->
    <button 
      class="music-widget" 
      :class="{ 'is-playing': isPlaying }"
      @click="togglePlay"
      aria-label="Toggle music"
    >
      <div class="music-icon-wrapper">
        <!-- Play Icon -->
        <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
        </svg>
        
        <!-- Pause Icon (Vinyl/Bars Equalizer Effect) -->
        <div v-else class="equalizer">
          <span class="bar bar-1"></span>
          <span class="bar bar-2"></span>
          <span class="bar bar-3"></span>
          <span class="bar bar-4"></span>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { content } from '../config/content.js';

const isPlaying = ref(false);
let player = null;
let apiReady = false;

// Load YouTube IFrame API
const loadYouTubeAPI = () => {
  if (window.YT && window.YT.Player) {
    initPlayer();
    return;
  }

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () => {
    initPlayer();
  };
};

const initPlayer = () => {
  player = new window.YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: content.music.youtubeId,
    playerVars: {
      'playsinline': 1,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'mute': 1, // Start muted to bypass browser autoplay restrictions
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

const onPlayerReady = (event) => {
  apiReady = true;
  event.target.setVolume(content.music.volume);
  
  // Setup Media Session API
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Wedding Celebration',
      artist: content.couple.coupleNames,
      album: 'The Wedding',
      artwork: [
        { src: 'https://via.placeholder.com/512x512.png?text=Wedding', sizes: '512x512', type: 'image/png' } // Placeholder or app icon
      ]
    });

    navigator.mediaSession.setActionHandler('play', () => {
      togglePlay();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      togglePlay();
    });
  }

  // Attempt autoplay muted (browsers allow this)
  if (content.music.autoplay) {
    player.playVideo(); // Starts muted due to playerVars
  }
  
  // Expose unmute function globally for CinematicOpening to call
  window.unmuteMusicPlayer = () => {
    if (player) {
      player.unMute();
    }
  };
};

const onPlayerStateChange = (event) => {
  if (event.data === window.YT.PlayerState.PLAYING) {
    isPlaying.value = true;
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'playing';
    }
  } else if (event.data === window.YT.PlayerState.PAUSED) {
    isPlaying.value = false;
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
  } else if (event.data === window.YT.PlayerState.ENDED) {
    isPlaying.value = false;
    // Loop
    player.playVideo(); 
  }
};

const togglePlay = () => {
  if (!apiReady || !player) return;

  if (isPlaying.value) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

onMounted(() => {
  loadYouTubeAPI();
});

onUnmounted(() => {
  // Cleanup if needed
});
</script>

<style scoped>
.music-player-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 1000;
}

.hidden-player {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.music-widget {
  position: fixed;
  bottom: 24px;
  right: 24px; /* Positioned bottom-right */
  z-index: 999; /* High Z-Index to float above content */
  
  width: 48px;
  height: 48px;
  border-radius: 50%;
  
  background-color: var(--color-white, #ffffff);
  border: 1px solid var(--color-gold, #D4AF37);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Reset button styles */
  padding: 0;
  outline: none;
  
  /* Re-enable pointer events for the button */
  pointer-events: auto;
}

.music-widget:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.music-icon-wrapper {
  color: var(--color-gold, #D4AF37);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Equalizer Animation */
.equalizer {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 16px;
}

.bar {
  width: 3px;
  background-color: currentColor;
  border-radius: 2px;
  animation: equalize 1s infinite alternate;
}

.bar-1 { height: 8px; animation-delay: -0.4s; }
.bar-2 { height: 16px; animation-delay: -0.2s; }
.bar-3 { height: 12px; animation-delay: -0.6s; }
.bar-4 { height: 10px; animation-delay: -0.1s; }

@keyframes equalize {
  0% { height: 4px; }
  100% { height: 100%; }
}

/* Mobile responsive positioning */
@media (max-width: 768px) {
  .music-widget {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
}
</style>
