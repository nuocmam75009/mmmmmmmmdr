// Playlist brooepfjopqsdjisdjio
const playlist = [
  {
    // cute playlist innitttttttttttt
    title: "Charcoal & Steel - MANGO",
    src: "assets/song1.mp3"
  },
  {
    title: "Hojean - Hold Me",
    src: "assets/song2.mp3"
  },
  {
    title: "Yung Kai - Blue",
    src: "assets/song3.mp3"
  }
];

let currentSongIndex = 0;
let audioPlayer;
let isInitialized = false;

// Init the music player
function initMusicPlayer() {
  if (isInitialized) return; // Prevent multiple initializations

  audioPlayer = document.getElementById('player');

  if (audioPlayer) {
    // Load saved state from localStorage
    const savedIndex = localStorage.getItem('currentSongIndex');
    const savedTime = localStorage.getItem('currentSongTime');
    const wasPlaying = localStorage.getItem('wasPlaying') === 'true';

    if (savedIndex !== null) {
      currentSongIndex = parseInt(savedIndex);
    }

    // Set initial song
    loadSong(currentSongIndex);

    // Restore playback position if it was playing
    if (savedTime && wasPlaying) {
      audioPlayer.currentTime = parseFloat(savedTime);
      audioPlayer.play();
    }

    // Add event listeners
    audioPlayer.addEventListener('ended', nextSong);
    audioPlayer.addEventListener('loadeddata', updateSongTitle);
    audioPlayer.addEventListener('play', savePlayState);
    audioPlayer.addEventListener('pause', savePlayState);
    audioPlayer.addEventListener('timeupdate', savePlayState);

    isInitialized = true;
  }
}

// Load a specific song
function loadSong(index) {
  const player = document.getElementById('player');
  if (!player || !playlist[index]) return;

  player.src = playlist[index].src;
  currentSongIndex = index;
  updateSongTitle();
  savePlayState();
}

// boutons

function previousSong() {
  const player = document.getElementById('player');
  if (!player) return;

  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  player.play().catch(e => console.log('Play failed:', e));
}


function nextSong() {
  const player = document.getElementById('player');
  if (!player) return;

  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  player.play().catch(e => console.log('Play failed:', e));
}

// Update song title
function updateSongTitle() {
  const songTitleElement = document.getElementById('songTitle');
  if (songTitleElement && playlist[currentSongIndex]) {
    songTitleElement.textContent = playlist[currentSongIndex].title;
  }
}

// Save current play state to localStorage
function savePlayState() {
  const player = document.getElementById('player');
  if (player) {
    localStorage.setItem('currentSongIndex', currentSongIndex.toString());
    localStorage.setItem('currentSongTime', player.currentTime.toString());
    localStorage.setItem('wasPlaying', (!player.paused).toString());
  }
}

// Make functions globally available
window.previousSong = previousSong;
window.nextSong = nextSong;
window.initMusicPlayer = initMusicPlayer;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initMusicPlayer();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMusicPlayer);
} else {
  initMusicPlayer();
}
