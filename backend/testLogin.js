async function testLogin() {
    try {
        const response = await fetch('https://inventory-management-fj7b.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'admin123' })
        });
        const data = await response.json();
        if (response.ok) {
            console.log('✅ Login Success:', data);
        } else {
            console.error('❌ Login Failed:', data);
        }
    } catch (error) {
        console.error('❌ Login Error:', error.message);
    }
}

testLogin();
