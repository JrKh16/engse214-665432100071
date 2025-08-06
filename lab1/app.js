document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.getElementById("comments-container");
  const commentForm = document.getElementById("comment-form");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");

  /**
   * Sanitizes a string to prevent XSS attacks by converting HTML entities.
   * @param {string} str - The string to sanitize.
   * @returns {string} The sanitized string.
   */
  const sanitize = (str) => {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  };

  // โค้ดส่วนนี้มีช่องโหว่
  /**
   * Displays a list of comments in the comments container.
   * @param {Array<Object>} comments - An array of comment objects, each with 'name' and 'text' properties.
   */
  function displayComments(comments) {
    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("list-group-item", "list-group-item-action", "flex-column", "align-items-start");

      const authorElement = document.createElement("h5");
      authorElement.classList.add("mb-1", "fw-bold", "text-primary");
      authorElement.textContent = comment.name;

      const textElement = document.createElement("p");
      textElement.classList.add("mb-1", "text-break");
      textElement.textContent = comment.text;

      commentElement.appendChild(authorElement);
      commentElement.appendChild(textElement);
      commentsContainer.appendChild(commentElement);
    });
  }

  // ✅ ฟังก์ชันดึงคอมเมนต์จาก JSON Server
  /**
   * Fetches comments from the JSON Server and displays them.
   * @async
   * @function fetchComments
   * @returns {Promise<void>}
   */
  async function fetchComments() {
    try {
      const response = await fetch("http://localhost:3000/comments");
      const data = await response.json();
      displayComments(data); // ✅ แก้ตรงนี้
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }

  /**
   * Handles the submission of the comment form.
   * Prevents default form submission, validates input, posts new comment to JSON Server,
   * clears input fields, and refreshes the comment list.
   * @async
   * @function commentForm.addEventListener
   * @param {Event} e - The submit event object.
   * @returns {Promise<void>}
   */
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
