document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.getElementById("comments-container");
  const commentForm = document.getElementById("comment-form");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");

  const sanitize = (str) => {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  };

  // โค้ดส่วนนี้มีช่องโหว่
  function displayComments(comments) {
    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      // ปัญหา! ใช้ .innerHTML โดยตรง
      commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.text}`;
      commentsContainer.appendChild(commentElement);
    });
  }

  // ✅ ฟังก์ชันดึงคอมเมนต์จาก JSON Server
  async function fetchComments() {
    try {
      const response = await fetch("http://localhost:3000/comments");
      const data = await response.json();
      displayComments(data); // ✅ แก้ตรงนี้
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }

  // ✅ ฟังก์ชันส่งคอมเมนต์ใหม่ไปยัง JSON Server
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newComment = {
      name: nameInput.value.trim(),
      text: commentInput.value.trim(),
    };
    if (!newComment.name || !newComment.text) {
      alert("กรุณากรอกชื่อและความคิดเห็น");
      return;
    }
    try {
      await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      // ล้าง input และโหลดคอมเมนต์ใหม่
      nameInput.value = "";
      commentInput.value = "";
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  });
  fetchComments(); // โหลดคอมเมนต์เมื่อเปิดหน้า
});
