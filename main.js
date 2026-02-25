const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});


// Fun Form Logic
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const statusMsg = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending... 🚀';
    statusMsg.textContent = '';
    statusMsg.className = '';

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            statusMsg.textContent = "Thanks for your submission! You're awesome! 🎉";
            statusMsg.className = 'status-success';
            form.reset();
            submitBtn.textContent = 'Sent! ✨';
            
            // Trigger Confetti!
            fireConfetti();
            
            // Reset button text after a few seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send with Joy ✨';
            }, 3000);
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                statusMsg.textContent = result.errors.map(error => error["message"]).join(", ");
            } else {
                statusMsg.textContent = "Oops! There was a problem submitting your form";
            }
            statusMsg.className = 'status-error';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Try Again 😔';
        }
    } catch (error) {
        statusMsg.textContent = "Oops! There was a problem submitting your form";
        statusMsg.className = 'status-error';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Try Again 😔';
    }
}

function fireConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

form.addEventListener('submit', handleSubmit);
