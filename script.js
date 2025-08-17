document.addEventListener('DOMContentLoaded', () => {
    const polaroids = document.querySelectorAll('.polaroid');
    const passwordSection = document.getElementById('password-section');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');

    let currentIndex = polaroids.length - 1;
    let isAnimating = false;
    let touchStartY = 0;

    function showNextPhoto() {
        // Guard clause: Do nothing if an animation is running or we're at the end.
        if (isAnimating || currentIndex < 0) return;
        
        isAnimating = true;
        polaroids[currentIndex].classList.add('swiped');
        currentIndex--;
        togglePasswordSection();
        
        // Reset the animation lock after the CSS transition finishes (600ms)
        setTimeout(() => { isAnimating = false; }, 600);
    }

    function showPreviousPhoto() {
        // Guard clause: Do nothing if an animation is running or we're at the beginning.
        if (isAnimating || currentIndex >= polaroids.length - 1) return;
        
        isAnimating = true;
        currentIndex++;
        polaroids[currentIndex].classList.remove('swiped');
        togglePasswordSection();

        // Reset the animation lock after the CSS transition finishes (600ms)
        setTimeout(() => { isAnimating = false; }, 600);
    }
    
    function togglePasswordSection() {
        if (currentIndex < 0) {
            passwordSection.classList.remove('hidden');
        } else {
            passwordSection.classList.add('hidden');
        }
    }

    // --- MOUSE WHEEL LISTENER ---
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) { // Scrolling down
            showNextPhoto();
        } else { // Scrolling up
            showPreviousPhoto();
        }
    });

    // --- TOUCH LISTENERS ---
    window.addEventListener('touchstart', (event) => {
        // Record the starting Y position of the touch
        touchStartY = event.changedTouches[0].screenY;
    });

    window.addEventListener('touchend', (event) => {
        const touchEndY = event.changedTouches[0].screenY;
        const swipeDistance = touchStartY - touchEndY;
        const swipeThreshold = 50; // Min pixels for a swipe

        if (swipeDistance > swipeThreshold) {
            // Swiped Up
            showNextPhoto();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped Down
            showPreviousPhoto();
        }
    });

    // --- PASSWORD LOGIC ---
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