document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const status = document.getElementById('register-status');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        // Try modular Firebase first (dynamic import)
        try {
            const mod = await import('../assets/firebase-modular-init.js');
            if (mod && mod.FB && mod.FB.auth) {
                try {
                    const { createUserWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js');
                    const cred = await createUserWithEmailAndPassword(mod.FB.auth, data.email, data.password);
                    // Save profile to Firestore if available
                    if (mod.FB.db) {
                        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js');
                        await setDoc(doc(mod.FB.db, 'users', cred.user.uid), { name: data.name || '', email: data.email, createdAt: new Date().toISOString() });
                    }
                    status.textContent = 'Account created via Firebase. Redirecting...';
                    setTimeout(() => location.href = '../login/index.html', 900);
                    return;
                } catch (err) {
                    status.textContent = 'Firebase: ' + (err.message || err.code || 'Registration failed');
                    return;
                }
            }
        } catch (e) {
            // ignore modular init errors and fallback
            console.info('Firebase modular init not available', e);
        }

        // Fallback to localStorage
        const users = JSON.parse(localStorage.getItem('weblearning_users') || '[]');
        if (users.find(u => u.email === data.email)) {
            status.textContent = 'An account with that email already exists (local).';
            return;
        }
        users.push(data);
        localStorage.setItem('weblearning_users', JSON.stringify(users));
        status.textContent = 'Account created locally. You can sign in now.';
        setTimeout(() => location.href = '../login/index.html', 900);
    });
});
