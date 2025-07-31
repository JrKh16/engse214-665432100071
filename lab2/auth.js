// ฟังก์ชัน Hashing จำลอง (เพื่อการศึกษาเท่านั้น)
// ในโลกจริง ควรใช้ async และไลบรารีเช่น bcrypt
function simpleHash(password) {
    let hash = "hashed_";
    for (let i = 0; i < password.length; i++) {
        hash += (password.charCodeAt(i) % 10);
    }
    return hash + "_end";
}

// แก้ไขฟังก์ชัน register
registerForm.addEventListener('submit', async (e) => {
    // ...
    const hashedPassword = simpleHash(password); // Hashing รหัสผ่าน

    const response = await fetch('http://localhost:3000/users', {
        // ...
        body: JSON.stringify({ email, password: hashedPassword }) // บันทึกค่า hash
    });
    // ...
});

// แก้ไขฟังก์ชัน login
loginForm.addEventListener('submit', async (e) => {
    // ...
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    const users = await response.json();

    if (users.length > 0) {
        const user = users[0];
        // เปรียบเทียบรหัสผ่านที่ป้อนเข้ามาหลังจาก hash แล้ว
        if (simpleHash(password) === user.password) {
            // Login successful
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = `/profile.html?id=${user.id}`;
        } else {
            // Invalid password
        }
    }
    // ...
});