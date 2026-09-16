// Menu hamburger toggle
const menu = document.getElementById("menu");
const nav = document.getElementById("navigation");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// File Upload Interactivity
const fileInput = document.getElementById('attachment');
const fileLabel = document.getElementById('file-label');
const fileLabelText = document.getElementById('file-upload-text');
const removeFileBtn = document.getElementById('remove-file-btn');

function resetFileInput() {
    if (fileInput) fileInput.value = '';
    if (fileLabelText) fileLabelText.textContent = 'Attach File or Image (Optional)';
    if (fileLabel) fileLabel.classList.remove('has-file');
    if (removeFileBtn) removeFileBtn.style.display = 'none';
}

if (fileInput) {
    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
            fileLabelText.textContent = `📎 ${file.name} (${sizeInMb} MB)`;
            if (fileLabel) fileLabel.classList.add('has-file');
            if (removeFileBtn) removeFileBtn.style.display = 'inline-block';
        } else {
            resetFileInput();
        }
    });
}

if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetFileInput();
    });
}

// Auto-detect backend URL (localhost for local dev / file://, Render for production)
const isLocal = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' || 
                window.location.protocol === 'file:' ||
                window.location.hostname === '';

const BACKEND_URL = isLocal
    ? 'http://localhost:5000'
    : 'https://portfolio-backend-oj6i.onrender.com';

const form = document.getElementById('notes-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitBtn = document.getElementById('submit-btn');

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Build FormData payload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            formData.append('attachment', fileInput.files[0]);
        }

        // Show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Submitting...';

        try {
            const response = await fetch(`${BACKEND_URL}/api/submit-note`, {
                method: 'POST',
                body: formData // Let browser set multipart boundary
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ ' + (data.message || 'Thank you! Your note has been submitted.'));
                form.reset();
                resetFileInput();
            } else {
                alert('❌ Error: ' + (data.error || 'Failed to submit'));
            }
        } catch (error) {
            alert('❌ Connection error. Please make sure the backend server is running.');
            console.error('Submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
