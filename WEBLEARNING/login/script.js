document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const status = document.getElementById('login-status');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        (async () => {
            try {
                const mod = await import('../assets/firebase-modular-init.js');
                if (mod && mod.FB && mod.FB.auth) {
                    try {
                        const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js');
                        const cred = await signInWithEmailAndPassword(mod.FB.auth, data.email, data.password);
                        localStorage.setItem('weblearning_current', JSON.stringify({ uid: cred.user.uid, email: cred.user.email }));
                        status.textContent = 'Signed in via Firebase. Redirecting...';
                        setTimeout(() => location.href = '../home/index.html', 600);
                        return;
                    } catch (err) {
                        status.textContent = 'Firebase: ' + (err.message || err.code || 'Sign-in failed');
                        return;
                    }
                }
            } catch (e) {
                console.info('Firebase modular not available', e);
            }

            // fallback local
            const users = JSON.parse(localStorage.getItem('weblearning_users') || '[]');
            const user = users.find(u => u.email === data.email && u.password === data.password);
            if (user) {
                localStorage.setItem('weblearning_current', JSON.stringify({ email: user.email }));
                status.textContent = 'Signed in (local).';
                setTimeout(() => location.href = '../home/index.html', 600);
            } else {
                status.textContent = 'No matching local account. Try registering or configure Firebase in Settings.';
            }
        })();
    });
});
