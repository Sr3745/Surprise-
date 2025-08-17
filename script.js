document.addEventListener('DOMContentLoaded', () => {
    const polaroids = document.querySelectorAll('.polaroid');
    const passwordSection = document.getElementById('password-section');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');

    let currentIndex = polaroids.length - 1;
    let isScrolling = false;

    function togglePasswordSection() {
        if (currentIndex < 0) {
            passwordSection.classList.remove('hidden');
        } else {
            passwordSection.classList.add('hidden');
        }
    }

    window.addEventListener('wheel', (event) => {
        if (isScrolling) return;
        isScrolling = true;

        setTimeout(() => { isScrolling = false; }, 800);

        if (event.deltaY > 0) {
            if (currentIndex >= 0) {
                polaroids[currentIndex].classList.add('swiped');
                currentIndex--;
            }
        } else {
            if (currentIndex < polaroids.length - 1) {
                currentIndex++;
                polaroids[currentIndex].classList.remove('swiped');
            }
        }
        togglePasswordSection();
    });

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