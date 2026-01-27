// ========================================
// AR EXPERIENCE CONTROLLER
// Handles AR.js integration and interactions
// ========================================

// Global variables
let arScene;
let marker;
let markerlessModel;
let audio;
let isMarkerMode = true;
let isPlaying = false;
let markerDetected = false;

// Wait for DOM and AR libraries to load
window.addEventListener('load', function () {
    console.log('AR Experience initializing...');

    // Get DOM elements
    const loadingScreen = document.getElementById('loadingScreen');
    arScene = document.getElementById('arScene');
    marker = document.getElementById('marker');
    markerlessModel = document.getElementById('markerlessModel');
    audio = document.getElementById('narrationAudio');

    const backBtn = document.getElementById('backBtn');
    const toggleModeBtn = document.getElementById('toggleModeBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const instructions = document.getElementById('instructions');
    const audioControls = document.getElementById('audioControls');
    const markerStatus = document.getElementById('markerStatus');
    const statusText = document.getElementById('statusText');
    const infoPanel = document.getElementById('infoPanel');
    const closeInfoBtn = document.getElementById('closeInfoBtn');
    const errorModal = document.getElementById('errorModal');
    const retryBtn = document.getElementById('retryBtn');

    // ========== INITIALIZATION ==========

    // Check browser compatibility
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showError('Browser tidak mendukung akses kamera',
            'Silakan gunakan browser Chrome, Firefox, atau Safari versi terbaru.');
        return;
    }

    // Request camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            console.log('Camera access granted');
            // Stop the stream immediately, AR.js will handle it
            stream.getTracks().forEach(track => track.stop());

            // Initialize AR
            setTimeout(() => {
                initAR();
            }, 1000);
        })
        .catch(function (error) {
            console.error('Camera access denied:', error);
            showError('Akses kamera ditolak',
                'Mohon izinkan akses kamera untuk menggunakan fitur AR. Periksa pengaturan browser Anda.');
        });

    // ========== AR INITIALIZATION ==========

    function initAR() {
        console.log('AR initialized');

        // Hide loading screen
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);

        // Setup marker detection
        if (marker) {
            marker.addEventListener('markerFound', function () {
                console.log('Marker detected!');
                markerDetected = true;
                markerStatus.classList.add('detected');
                statusText.textContent = 'Marker terdeteksi!';

                // Hide instructions, show audio controls
                instructions.classList.add('hidden');
                audioControls.classList.remove('hidden');

                // Auto play audio
                setTimeout(() => {
                    playAudio();
                }, 500);

                // Show info panel after a moment
                setTimeout(() => {
                    infoPanel.classList.remove('hidden');
                }, 2000);
            });

            marker.addEventListener('markerLost', function () {
                console.log('Marker lost');
                markerDetected = false;
                markerStatus.classList.remove('detected');
                statusText.textContent = 'Mencari marker...';

                // Pause audio when marker is lost
                pauseAudio();
            });
        }
    }

    // ========== MODE SWITCHING ==========

    if (toggleModeBtn) {
        toggleModeBtn.addEventListener('click', function () {
            isMarkerMode = !isMarkerMode;

            if (isMarkerMode) {
                // Switch to marker mode
                if (markerlessModel) markerlessModel.setAttribute('visible', 'false');
                toggleModeBtn.textContent = 'Mode Tanpa Marker';
                instructions.querySelector('h3').textContent = 'Arahkan kamera ke marker';
                statusText.textContent = 'Mencari marker...';
            } else {
                // Switch to markerless mode
                if (markerlessModel) markerlessModel.setAttribute('visible', 'true');
                toggleModeBtn.textContent = 'Mode Marker';
                instructions.classList.add('hidden');
                audioControls.classList.remove('hidden');
                statusText.textContent = 'Mode tanpa marker';
                markerStatus.classList.add('detected');

                // Auto play audio in markerless mode
                setTimeout(() => {
                    playAudio();
                }, 500);
            }
        });
    }

    // ========== AUDIO CONTROLS ==========

    // Play/Pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }

    function playAudio() {
        if (audio) {
            audio.play()
                .then(() => {
                    isPlaying = true;
                    document.getElementById('playIcon').style.display = 'none';
                    document.getElementById('pauseIcon').style.display = 'block';
                })
                .catch(error => {
                    console.error('Audio play error:', error);
                });
        }
    }

    function pauseAudio() {
        if (audio) {
            audio.pause();
            isPlaying = false;
            document.getElementById('playIcon').style.display = 'block';
            document.getElementById('pauseIcon').style.display = 'none';
        }
    }

    // Audio time update
    if (audio) {
        audio.addEventListener('loadedmetadata', function () {
            durationDisplay.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', function () {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('ended', function () {
            isPlaying = false;
            document.getElementById('playIcon').style.display = 'block';
            document.getElementById('pauseIcon').style.display = 'none';
            progressBar.style.width = '0%';
        });
    }

    // Progress bar click to seek
    if (progressBar && progressBar.parentElement) {
        progressBar.parentElement.addEventListener('click', function (e) {
            if (audio && audio.duration) {
                const rect = this.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const percentage = clickX / width;
                audio.currentTime = percentage * audio.duration;
            }
        });
    }

    // Volume button (toggle mute)
    if (volumeBtn && audio) {
        volumeBtn.addEventListener('click', function () {
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                `;
            } else {
                volumeBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                `;
            }
        });
    }

    // ========== NAVIGATION ==========

    // Back button
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            // Stop audio
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }

            // Navigate back
            window.location.href = 'index.html';
        });
    }

    // Close info panel
    if (closeInfoBtn) {
        closeInfoBtn.addEventListener('click', function () {
            infoPanel.classList.add('hidden');
        });
    }

    // ========== ERROR HANDLING ==========

    function showError(title, message) {
        loadingScreen.classList.add('hidden');
        document.getElementById('errorTitle').textContent = title;
        document.getElementById('errorMessage').textContent = message;
        errorModal.classList.remove('hidden');
    }

    // Retry button
    if (retryBtn) {
        retryBtn.addEventListener('click', function () {
            window.location.reload();
        });
    }

    // ========== UTILITY FUNCTIONS ==========

    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ========== PERFORMANCE MONITORING ==========

    let frameCount = 0;
    let lastTime = performance.now();

    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - lastTime >= 1000) {
            const fps = frameCount;
            console.log(`AR Performance: ${fps} FPS`);

            // Warn if performance is poor
            if (fps < 20) {
                console.warn('Low FPS detected. Consider reducing model complexity.');
            }

            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(monitorPerformance);
    }

    // Start monitoring after AR loads
    setTimeout(() => {
        monitorPerformance();
    }, 3000);

    // ========== ACCESSIBILITY ==========

    // Keyboard controls
    document.addEventListener('keydown', function (e) {
        switch (e.key) {
            case ' ': // Space bar
                e.preventDefault();
                if (isPlaying) {
                    pauseAudio();
                } else {
                    playAudio();
                }
                break;
            case 'Escape':
                if (!infoPanel.classList.contains('hidden')) {
                    infoPanel.classList.add('hidden');
                }
                break;
            case 'm':
            case 'M':
                if (audio) {
                    audio.muted = !audio.muted;
                }
                break;
        }
    });

    // ========== SCREEN WAKE LOCK ==========

    // Keep screen awake during AR experience
    let wakeLock = null;

    async function requestWakeLock() {
        try {
            if ('wakeLock' in navigator) {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('Wake Lock activated');

                wakeLock.addEventListener('release', () => {
                    console.log('Wake Lock released');
                });
            }
        } catch (err) {
            console.error('Wake Lock error:', err);
        }
    }

    // Request wake lock after AR loads
    setTimeout(() => {
        requestWakeLock();
    }, 2000);

    // Re-request wake lock on visibility change
    document.addEventListener('visibilitychange', async () => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
            await requestWakeLock();
        }
    });

    // Release wake lock on page unload
    window.addEventListener('beforeunload', () => {
        if (wakeLock !== null) {
            wakeLock.release();
        }
    });

    // ========== CONSOLE MESSAGE ==========

    console.log('%c🎯 AR Experience Active', 'font-size: 18px; font-weight: bold; color: #8B4513;');
    console.log('%cKeyboard shortcuts:', 'font-size: 14px; color: #D4AF37;');
    console.log('  Space: Play/Pause audio');
    console.log('  M: Mute/Unmute');
    console.log('  ESC: Close info panel');

});

// ========== ERROR HANDLING ==========

window.addEventListener('error', function (e) {
    console.error('Global error:', e.error);
});

// Handle AR.js specific errors
window.addEventListener('arjs-video-loaded', function () {
    console.log('AR.js video stream loaded successfully');
});
