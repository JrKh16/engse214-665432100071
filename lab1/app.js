// 1. รอ DOM โหลดให้เสร็จก่อน
document.addEventListener('DOMContentLoaded', () => {
    // 2. เก็บ Element ที่ใช้ไว้ในตัวแปร
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');

    // 3. สร้างฟังก์ชันสำหรับ Sanitize ข้อมูล
    const sanitize = (str) => {
        const temp = document.createElement('div');
        // .textContent จะแปลงอักขระพิเศษโดยอัตโนมัติ
        temp.textContent = str;
        return temp.innerHTML;
    };
    // 4. แสดงคอมเมนต์ (displayComments)
    function displayComments(comments) {
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            // 2. ใช้ฟังก์ชัน sanitize กับข้อมูลที่มาจากผู้ใช้ก่อนแสดงผล
            const safeName = sanitize(comment.name);
            const safeText = sanitize(comment.text);
            commentElement.innerHTML = `<strong>${safeName}:</strong> ${safeText}`;
            commentsContainer.appendChild(commentElement);
        });
    }
    // 5. โหลดคอมเมนต์จาก db.json
    async function fetchComments() {
        const response = await fetch('db.json');
        const data = await response.json();
        displayComments(data.comments);
    }
    
    // ... (ส่วน post data ไม่เปลี่ยนแปลง)
    fetchComments();
});