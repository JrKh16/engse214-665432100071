document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');

    // ตรวจสอบว่ามีผู้ใช้ล็อกอินหรือไม่
    if (!loggedInUser) {
        window.location.href = '/login.html';
        return;
    }

    // **หัวใจสำคัญของการแก้ไข IDOR**
    // ตรวจสอบว่า ID ที่ร้องขอกับ ID ของผู้ใช้ที่ล็อกอินตรงกันหรือไม่
    if (loggedInUser.id.toString() !== requestedId) {
        document.body.innerHTML = '<h1>Access Denied</h1>';
        return;
    }

    // ถ้าผ่านการตรวจสอบ จึงค่อย fetch ข้อมูลโปรไฟล์
    fetchUserProfile(requestedId);
});