// API Configuration
const API_BASE_URL = "http://localhost:5000/api";
const USE_MOCK_DATA = true; // Set to false when backend is ready

// Mock placeholder data
const mockPosts = [
  {
    _id: "1",
    upvotes: 342,
    likes: 89,
    userUpvoted: false,
    userLiked: false,
    comments: [
      { userName: "Priya Sharma", text: "This is a serious health hazard! My kids study here.", createdAt: "2026-02-07T12:30:00" },
      { userName: "Raj Kumar", text: "I've reported this to BMC 3 times already. No response!", createdAt: "2026-02-07T14:45:00" }
    ],
    issue: {
      title: "Overflowing Sewage Near School Gate",
      description: "Raw sewage has been overflowing for 3 days near the main entrance of Municipal School. Children are forced to walk through contaminated water. This is an urgent health hazard that needs immediate attention from authorities.",
      location: "Dadar West, Mumbai",
      priority: "CRITICAL",
      status: "pending",
      category: "Sanitation",
      images: ["https://images.unsplash.com/photo-1583317150194-b4cf68d8a0c7?w=800&h=600&fit=crop"],
      reportedBy: "Meera Desai",
      createdAt: "2026-02-07T09:30:00"
    }
  },
  {
    _id: "2",
    upvotes: 256,
    likes: 67,
    userUpvoted: false,
    userLiked: false,
    comments: [
      { userName: "Sunita Iyer", text: "Two chain snatching incidents already happened here!", createdAt: "2026-02-06T10:20:00" }
    ],
    issue: {
      title: "Broken Street Light - Safety Risk",
      description: "Main road streetlight has been non-functional for 2 weeks. The area becomes pitch dark at night, making it unsafe for women and senior citizens. Multiple residents have requested repair.",
      location: "Andheri East, Mumbai",
      priority: "HIGH",
      status: "in_progress",
      category: "Infrastructure",
      images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"],
      reportedBy: "Amit Patel",
      createdAt: "2026-02-06T18:45:00"
    }
  },
  {
    _id: "3",
    upvotes: 498,
    likes: 134,
    userUpvoted: false,
    userLiked: false,
    comments: [
      { userName: "Neha Gupta", text: "My husband's bike got damaged because of this!", createdAt: "2026-02-06T16:30:00" },
      { userName: "Rahul Joshi", text: "Why is this taking so long to fix?!", createdAt: "2026-02-06T17:15:00" },
      { userName: "Anjali Rao", text: "Sharing this everywhere. This needs immediate attention!", createdAt: "2026-02-06T19:00:00" }
    ],
    issue: {
      title: "Massive Pothole Causing Accidents",
      description: "A deep pothole on the main highway has caused multiple vehicle accidents. At least 4 two-wheelers have fallen in the past week. Commuters are taking risky detours to avoid it.",
      location: "Western Express Highway, Goregaon",
      priority: "HIGH",
      status: "pending",
      category: "Roads",
      images: ["https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=600&fit=crop"],
      reportedBy: "Vikram Singh",
      createdAt: "2026-02-06T14:20:00"
    }
  },
  {
    _id: "4",
    upvotes: 123,
    likes: 45,
    userUpvoted: false,
    userLiked: false,
    comments: [],
    issue: {
      title: "Illegal Garbage Dumping Site",
      description: "Open plot being used as illegal garbage dump. Foul smell, mosquito breeding, and stray animals creating nuisance for nearby residents. Needs immediate civic action.",
      location: "Kurla West, Mumbai",
      priority: "MEDIUM",
      status: "pending",
      category: "Sanitation",
      images: ["https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&h=600&fit=crop"],
      reportedBy: "Deepa Nair",
      createdAt: "2026-02-05T11:15:00"
    }
  },
  {
    _id: "5",
    upvotes: 567,
    likes: 178,
    userUpvoted: false,
    userLiked: false,
    comments: [
      { userName: "Pooja Saxena", text: "Finally fixed after 4 days! Thanks to everyone who upvoted!", createdAt: "2026-02-05T18:30:00" },
      { userName: "Arjun Khanna", text: "Good job Civic Chai! This actually worked!", createdAt: "2026-02-05T19:15:00" }
    ],
    issue: {
      title: "Water Pipeline Burst - Water Wastage",
      description: "Main water pipeline has burst, wasting thousands of liters daily. Meanwhile, our area faces water shortage every alternate day. This is criminal negligence.",
      location: "Malad East, Mumbai",
      priority: "CRITICAL",
      status: "resolved",
      category: "Water Supply",
      images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop"],
      reportedBy: "Kiran Yadav",
      createdAt: "2026-02-05T07:00:00"
    }
  },
  {
    _id: "6",
    upvotes: 89,
    likes: 34,
    userUpvoted: false,
    userLiked: false,
    comments: [
      { userName: "Sanjay Mishra", text: "My son got injured on the broken swing yesterday.", createdAt: "2026-02-04T20:00:00" }
    ],
    issue: {
      title: "Park Equipment Broken and Dangerous",
      description: "Children's park swings and slides are broken with sharp edges exposed. Multiple children have been injured. Immediate repair or removal needed for safety.",
      location: "Bandra West, Mumbai",
      priority: "MEDIUM",
      status: "in_progress",
      category: "Public Amenities",
      images: ["https://images.unsplash.com/photo-1560587831-4e3e2e08b9c8?w=800&h=600&fit=crop"],
      reportedBy: "Ritu Kapoor",
      createdAt: "2026-02-04T16:30:00"
    }
  },
  {
    _id: "7",
    upvotes: 234,
    likes: 67,
    userUpvoted: false,
    userLiked: false,
    comments: [
      { userName: "Kavita Deshmukh", text: "My mother was chased yesterday. Very scary!", createdAt: "2026-02-04T15:30:00" },
      { userName: "Nitin Verma", text: "We need sterilization drive, not culling!", createdAt: "2026-02-04T16:45:00" }
    ],
    issue: {
      title: "Stray Dog Menace in Residential Area",
      description: "Pack of aggressive stray dogs attacking residents, especially children and elderly. Multiple bite incidents reported. Need immediate animal control intervention.",
      location: "Powai, Mumbai",
      priority: "HIGH",
      status: "pending",
      category: "Public Safety",
      images: ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop"],
      reportedBy: "Mohit Agarwal",
      createdAt: "2026-02-04T08:45:00"
    }
  },
  {
    _id: "8",
    upvotes: 45,
    likes: 12,
    userUpvoted: false,
    userLiked: false,
    comments: [],
    issue: {
      title: "Bus Stop Shelter Damaged",
      description: "Bus stop shelter roof collapsed during rain. Commuters have no protection from sun and rain. Hundreds use this stop daily for commute to work and school.",
      location: "Thane West",
      priority: "LOW",
      status: "pending",
      category: "Infrastructure",
      images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop"],
      reportedBy: "Geeta Pillai",
      createdAt: "2026-02-03T12:00:00"
    }
  }
];

// Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem("token");
}

// Check if user is authenticated
function isAuthenticated() {
  return !!getAuthToken();
}

// Get priority badge class
function getPriorityClass(priority) {
  const classes = {
    'CRITICAL': 'badge-critical',
    'HIGH': 'badge-high',
    'MEDIUM': 'badge-medium',
    'LOW': 'badge-low',
    'P1': 'badge-critical',
    'P2': 'badge-high',
    'P3': 'badge-medium',
    'P4': 'badge-low'
  };
  return classes[priority?.toUpperCase()] || 'badge-medium';
}

// Get status badge class
function getStatusClass(status) {
  const statusLower = status?.toLowerCase().replace('_', '');
  const classes = {
    'pending': 'status-pending',
    'inprogress': 'status-progress',
    'resolved': 'status-resolved',
    'reported': 'status-pending',
    'underreview': 'status-progress',
    'fixed': 'status-resolved'
  };
  return classes[statusLower] || 'status-pending';
}

// Format status text
function formatStatus(status) {
  return status?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Pending';
}

// Format time ago
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (let [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
  
  return 'Just now';
}

// Load all posts from backend
async function loadPosts() {
  const container = document.getElementById('postsContainer');
  
  // Use mock data if enabled or if backend fails
  if (USE_MOCK_DATA) {
    console.log('Using mock data (backend disabled)');
    const sortedPosts = [...mockPosts].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    renderPosts(sortedPosts);
    return;
  }
  
  try {
    container.innerHTML = '<div class="loading">Loading posts</div>';
    
    console.log('Fetching from:', `${API_BASE_URL}/posts`);
    
    const res = await fetch(`${API_BASE_URL}/posts`);
    
    console.log('Response status:', res.status);
    console.log('Response ok:', res.ok);
    
    const result = await res.json();
    console.log('Full response:', result);
    
    // Handle different response structures
    let posts = [];
    
    // Try different possible response structures
    if (result.success && result.data) {
      posts = result.data;
      console.log('Using result.data structure');
    } else if (result.posts) {
      posts = result.posts;
      console.log('Using result.posts structure');
    } else if (Array.isArray(result)) {
      posts = result;
      console.log('Using direct array structure');
    } else if (result.data && Array.isArray(result.data)) {
      posts = result.data;
      console.log('Using result.data array structure');
    }
    
    console.log('Posts found:', posts.length);
    console.log('First post:', posts[0]);

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h2>No Posts Yet</h2>
          <p>Be the first to report a civic issue!</p>
          <a href="report.html" class="btn btn-primary">Report an Issue</a>
        </div>
      `;
      return;
    }

    // Sort by upvotes (most upvoted first)
    const sortedPosts = [...posts].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    
    console.log('Rendering', sortedPosts.length, 'posts');
    renderPosts(sortedPosts);
    
  } catch (error) {
    console.error('Backend error, falling back to mock data:', error);
    // Fallback to mock data if backend fails
    const sortedPosts = [...mockPosts].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    renderPosts(sortedPosts);
    
    // Show a notification
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 80px; right: 20px; background: #FFF4ED; border: 2px solid #FF6B35; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 1000; max-width: 350px;';
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 1.5rem;">⚠️</span>
        <div>
          <strong style="color: #FF6B35;">Demo Mode</strong>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: #666;">Showing placeholder data. Connect backend to see real posts.</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  }
}

// Render posts to the page
function renderPosts(posts) {
  const container = document.getElementById('postsContainer');
  
  container.innerHTML = posts.map(post => {
    const issue = post.issue || {};
    const reportedBy = issue.reportedBy || post.reportedBy || 'Anonymous';
    const reportedDate = issue.createdAt || post.createdAt || new Date().toISOString();
    
    return `
      <article class="post-card" id="post-${post._id}">
        <!-- Post Header -->
        <div class="post-header">
          <div class="post-meta">
            <div class="reporter-info">
              <div class="reporter-avatar">${reportedBy.charAt(0).toUpperCase()}</div>
              <div>
                <div class="reporter-name">${reportedBy}</div>
                <div class="post-time">${timeAgo(reportedDate)}</div>
              </div>
            </div>
            <div class="post-badges">
              ${issue.priority ? `<span class="priority-badge ${getPriorityClass(issue.priority)}">${issue.priority}</span>` : ''}
              <span class="status-badge ${getStatusClass(issue.status || post.status)}">${formatStatus(issue.status || post.status)}</span>
            </div>
          </div>
        </div>

        <!-- Post Content -->
        <div class="post-content">
          <h2 class="post-title">${issue.title || post.title || 'Untitled Issue'}</h2>
          <p class="post-description">${issue.description || post.description || ''}</p>
          
          ${issue.images && issue.images.length > 0 ? `
            <div class="post-image">
              <img src="${API_BASE_URL.replace('/api', '')}${issue.images[0]}" 
                   alt="${issue.title}" 
                   onerror="this.parentElement.style.display='none'">
            </div>
            ${issue.images.length > 1 ? `
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem; margin-top: 0.5rem;">
                ${issue.images.slice(1, 4).map(img => `
                  <img src="${API_BASE_URL.replace('/api', '')}${img}" 
                       alt="Additional image" 
                       style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;"
                       onerror="this.style.display='none'">
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          <div class="post-details">
            ${issue.category ? `<span class="post-category">📂 ${issue.category}</span>` : ''}
            <span class="post-location">📍 ${issue.location || 'Location not specified'}</span>
          </div>
        </div>

        <!-- Post Actions -->
        <div class="post-actions">
          <button class="action-btn ${post.userUpvoted ? 'active' : ''}" onclick="toggleUpvote('${post._id}')">
            <span class="action-icon">⬆️</span>
            <span class="action-text">Upvote</span>
            <span class="action-count">${post.upvotes || 0}</span>
          </button>
          
          <button class="action-btn" onclick="toggleComments('${post._id}')">
            <span class="action-icon">💬</span>
            <span class="action-text">Comment</span>
            <span class="action-count">${post.comments?.length || 0}</span>
          </button>
          
          <button class="action-btn ${post.userLiked ? 'active liked' : ''}" onclick="toggleLike('${post._id}')">
            <span class="action-icon">${post.userLiked ? '❤️' : '🤍'}</span>
            <span class="action-text">${post.userLiked ? 'Liked' : 'Like'}</span>
            <span class="action-count">${post.likes || 0}</span>
          </button>
          
          <button class="action-btn" onclick="sharePost('${post._id}', '${(issue.title || post.title || '').replace(/'/g, "\\'")}')">
            <span class="action-icon">📤</span>
            <span class="action-text">Share</span>
          </button>
        </div>

        <!-- Comments Section -->
        <div class="comments-section" id="comments-${post._id}">
          <div class="comments-list" id="comments-list-${post._id}">
            ${renderComments(post.comments || [])}
          </div>
          
          <div class="comment-input-wrapper">
            <input 
              type="text" 
              id="comment-input-${post._id}" 
              class="comment-input" 
              placeholder="${isAuthenticated() ? 'Add a comment...' : 'Login to comment'}"
              ${!isAuthenticated() ? 'disabled' : ''}
              onkeypress="if(event.key === 'Enter') addComment('${post._id}')"
            >
            <button 
              class="comment-submit-btn" 
              onclick="addComment('${post._id}')"
              ${!isAuthenticated() ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}
            >
              Post
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Render comments
function renderComments(comments) {
  if (!comments || comments.length === 0) {
    return '<p class="no-comments">No comments yet. Be the first to comment!</p>';
  }
  
  return comments.map(comment => `
    <div class="comment">
      <div class="comment-avatar">${(comment.userName || comment.user || 'A').charAt(0).toUpperCase()}</div>
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-user">${comment.userName || comment.user || 'Anonymous'}</span>
          <span class="comment-time">${timeAgo(comment.createdAt || comment.timestamp || new Date())}</span>
        </div>
        <p class="comment-text">${comment.text || comment.comment || ''}</p>
      </div>
    </div>
  `).join('');
}

// Toggle upvote
async function toggleUpvote(postId) {
  // Mock data mode - simulate locally
  if (USE_MOCK_DATA) {
    const post = mockPosts.find(p => p._id === postId);
    if (post) {
      if (post.userUpvoted) {
        post.upvotes--;
        post.userUpvoted = false;
      } else {
        post.upvotes++;
        post.userUpvoted = true;
      }
      loadPosts();
    }
    return;
  }
  
  if (!isAuthenticated()) {
    alert('Please login to upvote issues.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}/upvote`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return;
      }
      // Even if backend says "already upvoted", refresh to show current state
      loadPosts();
      return;
    }

    // Reload posts to reflect changes
    loadPosts();
    
  } catch (error) {
    console.error('Error upvoting:', error);
    alert('Unable to upvote. Please try again.');
  }
}

// Toggle like
async function toggleLike(postId) {
  // Mock data mode - simulate locally
  if (USE_MOCK_DATA) {
    const post = mockPosts.find(p => p._id === postId);
    if (post) {
      if (post.userLiked) {
        post.likes--;
        post.userLiked = false;
      } else {
        post.likes++;
        post.userLiked = true;
      }
      loadPosts();
    }
    return;
  }
  
  if (!isAuthenticated()) {
    alert('Please login to like issues.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return;
      }
      // Refresh to show current state
      loadPosts();
      return;
    }

    // Reload posts to reflect changes
    loadPosts();
    
  } catch (error) {
    console.error('Error liking:', error);
    alert('Unable to like. Please try again.');
  }
}

// Add comment
async function addComment(postId) {
  const commentInput = document.getElementById(`comment-input-${postId}`);
  const commentText = commentInput.value.trim();
  
  if (!commentText) {
    alert('Please enter a comment');
    return;
  }
  
  // Mock data mode - simulate locally
  if (USE_MOCK_DATA) {
    const post = mockPosts.find(p => p._id === postId);
    if (post) {
      post.comments.unshift({
        userName: "You",
        text: commentText,
        createdAt: new Date().toISOString()
      });
      commentInput.value = '';
      loadPosts();
      
      setTimeout(() => {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection && !commentsSection.classList.contains('show')) {
          commentsSection.classList.add('show');
        }
      }, 100);
    }
    return;
  }
  
  if (!isAuthenticated()) {
    alert('Please login to comment.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: commentText })
    });

    const result = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return;
      }
      alert(result.message || 'Unable to add comment');
      return;
    }

    // Clear input and reload posts
    commentInput.value = '';
    loadPosts();
    
    // Re-open the comments section after reload
    setTimeout(() => {
      const commentsSection = document.getElementById(`comments-${postId}`);
      if (commentsSection && !commentsSection.classList.contains('show')) {
        commentsSection.classList.add('show');
      }
    }, 100);
    
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('Unable to add comment. Please try again.');
  }
}

// Toggle comments section
function toggleComments(postId) {
  const commentsSection = document.getElementById(`comments-${postId}`);
  if (commentsSection) {
    commentsSection.classList.toggle('show');
  }
}

// Share post
function sharePost(postId, title) {
  const url = `${window.location.origin}/posts.html#post-${postId}`;
  const text = `Check out this civic issue: ${title}`;
  
  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: copy link
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      prompt('Copy this link:', url);
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  
  // Show scroll to top button
  window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }
  });
  
  // Auto-refresh posts every 30 seconds (only if not using mock data)
  if (!USE_MOCK_DATA) {
    setInterval(loadPosts, 30000);
  }
});
