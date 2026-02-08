const postsContainer = document.getElementById("postsContainer");

// 🔹 Fetch all posts
async function loadPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/posts");
    const result = await res.json();

    if (!result.success || result.data.length === 0) {
      postsContainer.innerHTML =
        "<p style='text-align:center;'>No issues reported yet.</p>";
      return;
    }

    postsContainer.innerHTML = "";

    result.data.forEach((post) => {
      const issue = post.issue;

      const postDiv = document.createElement("div");
      postDiv.className = "post-card";

      postDiv.innerHTML = `
        <div class="post-header">
          <div>
            <h3 class="post-title">${issue.title}</h3>
            <div class="post-meta">📍 ${issue.location}</div>
          </div>
          <span class="post-status ${issue.status}">
            ${issue.status.replace("_", " ")}
          </span>
        </div>

        <p class="post-description">${issue.description}</p>

        ${
          issue.images && issue.images.length > 0
            ? `
            <div class="post-images">
              ${issue.images
                .map(
                  (img) =>
                    `<img src="http://localhost:5000${img}" alt="Issue Image">`
                )
                .join("")}
            </div>
          `
            : ""
        }

        <div class="post-actions">
          <div class="post-action" onclick="upvotePost('${post._id}')">
            🔼 Upvote <span>${post.upvotes}</span>
          </div>
          <div class="post-action" onclick="likePost('${post._id}')">
            ❤️ Like <span>${post.likes}</span>
          </div>
          <div class="post-action" onclick="openComments('${post._id}')">
            💬 Comments
          </div>
        </div>

        <div class="post-watermark">Civic Chai ☕</div>
      `;

      postsContainer.appendChild(postDiv);
    });
  } catch (error) {
    console.error(error);
    postsContainer.innerHTML =
      "<p style='text-align:center;'>Server error while loading posts.</p>";
  }
}

// 🔼 Upvote
async function upvotePost(postId) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to upvote issues.");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/posts/${postId}/upvote`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Already upvoted");
      return;
    }

    loadPosts();
  } catch (error) {
    console.error(error);
  }
}

// ❤️ Like
async function likePost(postId) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to like issues.");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/posts/${postId}/like`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Already liked");
      return;
    }

    loadPosts();
  } catch (error) {
    console.error(error);
  }
}

// 💬 Placeholder for comments (next step)
function openComments(postId) {
  alert("Comments UI coming next 🚧");
}

// 🚀 Initial load
loadPosts();
