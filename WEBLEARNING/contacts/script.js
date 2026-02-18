document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        (async () => {
            try {
                const mod = await import('../assets/firebase-modular-init.js');
                if (mod && mod.FB && mod.FB.db) {
                    try {
                        const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js');
                        await addDoc(collection(mod.FB.db, 'contacts'), { ...data, createdAt: serverTimestamp() });
                        status.textContent = 'Message sent to Firebase. Thank you!';
                        form.reset();
                        return;
                    } catch (err) {
                        console.error('Firebase save failed', err);
                        status.textContent = 'Failed to send to Firebase. Saved locally instead.';
                    }
                }
            } catch (e) {
                console.info('Firebase modular not available', e);
            }

            // Fallback: store locally
            const list = JSON.parse(localStorage.getItem('weblearning_contacts') || '[]');
            list.push({ ...data, createdAt: new Date().toISOString() });
            localStorage.setItem('weblearning_contacts', JSON.stringify(list));
            status.textContent = 'Message saved locally. Configure Firebase in Settings to send messages.';
            form.reset();
        })();
    });
});
