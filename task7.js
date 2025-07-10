const input = document.getElementById("markdownInput");
const preview = document.getElementById("markdownPreview");
const blogListDiv = document.getElementById("blogList");

input.addEventListener("input", () => {
  const markdownText = input.value;
  preview.innerHTML = marked.parse(markdownText);
});

function saveBlog() {
  const title = document.getElementById("blogTitle").value.trim();
  const content = input.value.trim();
  if (!title || !content) {
    alert("Please provide both title and content!");
    return;
  }

  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  blogs.push({ title, content, date: new Date().toLocaleString() });
  localStorage.setItem("blogs", JSON.stringify(blogs));

  alert("Blog published!");
  document.getElementById("blogTitle").value = "";
  input.value = "";
  preview.innerHTML = "";
}

function loadBlogs() {
  blogListDiv.innerHTML = "";
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  if (blogs.length === 0) {
    blogListDiv.innerHTML = "<p>No blogs yet.</p>";
    return;
  }

  blogs.reverse().forEach(blog => {
    const blogDiv = document.createElement("div");
    blogDiv.className = "blog-item";
    blogDiv.innerHTML = `
      <h3>${blog.title}</h3>
      <small>${blog.date}</small>
      <div>${marked.parse(blog.content)}</div>
    `;
    blogListDiv.appendChild(blogDiv);
  });
}

function toggleView() {
  const editorView = document.getElementById("editorView");
  const blogListView = document.getElementById("blogListView");

  if (editorView.style.display === "none") {
    editorView.style.display = "block";
    blogListView.style.display = "none";
  } else {
    loadBlogs();
    editorView.style.display = "none";
    blogListView.style.display = "block";
  }
}
