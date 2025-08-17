document.addEventListener('DOMContentLoaded', () => {
    const polaroids = document.querySelectorAll('.polaroid');
    const passwordSection = document.getElementById('password-section');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');

    let currentIndex = polaroids.length - 1;
    let isAnimating = false; // Renamed from isScrolling for clarity

    // --- NEW: Variables to track touch movements ---
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50; // Minimum distance for a swipe to be registered

    function showNextPhoto() {
        if (currentIndex >= 0) {
            polaroids[currentIndex].classList.add('swiped');
            currentIndex--;
        }
    }

    function showPreviousPhoto() {
        if (currentIndex < polaroids.length - 1) {
            currentIndex++;
            polaroids[currentIndex].classList.remove('swiped');
        }
    }

    function handleSwipe() {
        // This function will now be used by both mouse and touch
        if (isAnimating) return;
        isAnimating = true;

        // Check if the user is swiping up (to see the next photo)
        if (touchEndY < touchStartY - swipeThreshold) {
            showNextPhoto();
        } 
        // Check if the user is swiping down (to see the previous photo)
        else if (touchEndY > touchStartY + swipeThreshold) {
            showPreviousPhoto();
        }

        togglePasswordSection();
        
        // Reset the animation flag after the transition is done
        setTimeout(() => { isAnimating = false; }, 800);
    }

    function togglePasswordSection() {
        if (currentIndex < 0) {
            passwordSection.classList.remove('hidden');
        } else {
            passwordSection.classList.add('hidden');
        }
    }

    // --- MOUSE WHEEL event listener (slightly modified) ---
    window.addEventListener('wheel', (event) => {
        if (isAnimating) return;
        isAnimating = true;

        if (event.deltaY > 0) { // Scrolling down
            showNextPhoto();
        } else { // Scrolling up
            showPreviousPhoto();
        }
        
        togglePasswordSection();

        setTimeout(() => { isAnimating = false; }, 800);
    });

    // --- NEW: TOUCH event listeners ---
    window.addEventListener('touchstart', (event) => {
        // Record the starting Y position of the touch
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener('touchend', (event) => {
        // Record the ending Y position of the touch
        touchEndY = event.changedTouches[0].screenY;
        // Call the swipe handler to process the gesture
        handleSwipe();
    });


    // --- PASSWORD logic (remains the same) ---
    passwordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const enteredPassword = passwordInput.value.trim().toLowerCase();
        
        if (enteredPassword === 'boobuu') {
            window.location.href = 'secret.html';
        } else {
            passwordInput.classList.add('shake');
            passwordInput.value = '';

            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    });
});
