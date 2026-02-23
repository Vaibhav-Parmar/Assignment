// ========================================
// SkillSwap - Interactive JavaScript (Enhanced Version)
// ========================================

// =====================
// Sample Skills Data
// =====================
const skillsData = [
    { id: 1, title: "Guitar Lessons", teacher: "Rahul Sharma", category: "music", icon: "🎸", level: "intermediate", description: "Learn acoustic guitar from basics to advanced chords.", wantedSkill: "Python" },
    { id: 2, title: "Python Programming", teacher: "Priya Patel", category: "tech", icon: "🐍", level: "advanced", description: "Web development with Python and Django.", wantedSkill: "Guitar" },
    { id: 3, title: "Italian Cooking", teacher: "Marco Rossi", category: "cooking", icon: "🍝", level: "expert", description: "Authentic Italian recipes from scratch.", wantedSkill: "Photography" },
    { id: 4, title: "Digital Art", teacher: "Yuki Tanaka", category: "art", icon: "🎨", level: "advanced", description: "Digital illustration and character design.", wantedSkill: "Piano" },
    { id: 5, title: "Yoga & Meditation", teacher: "Anjali Gupta", category: "fitness", icon: "🧘", level: "expert", description: "Hatha Yoga and mindfulness meditation.", wantedSkill: "Cooking" },
    { id: 6, title: "Spanish Language", teacher: "Carlos Mendez", category: "language", icon: "🌮", level: "intermediate", description: "Conversational Spanish for beginners.", wantedSkill: "Web Dev" },
    { id: 7, title: "Piano Basics", teacher: "Emily Johnson", category: "music", icon: "🎹", level: "beginner", description: "Learn piano fundamentals and music theory.", wantedSkill: "Spanish" },
    { id: 8, title: "Web Development", teacher: "Alex Kim", category: "tech", icon: "💻", level: "advanced", description: "Full-stack web development with React.", wantedSkill: "French" },
    { id: 9, title: "Sushi Making", teacher: "Kenji Yamamoto", category: "cooking", icon: "🍣", level: "expert", description: "Traditional Japanese sushi techniques.", wantedSkill: "Digital Art" },
    { id: 10, title: "Photography", teacher: "Sarah Williams", category: "art", icon: "📷", level: "intermediate", description: "Portrait and landscape photography.", wantedSkill: "Yoga" },
    { id: 11, title: "Gym Training", teacher: "Mike Thompson", category: "fitness", icon: "🏋️", level: "expert", description: "Strength training and fitness programming.", wantedSkill: "Guitar" },
    { id: 12, title: "French Language", teacher: "Sophie Martin", category: "language", icon: "🥐", level: "advanced", description: "French for intermediate to advanced learners.", wantedSkill: "Sushi" },
    { id: 13, title: "Data Science", teacher: "James Wilson", category: "tech", icon: "📊", level: "advanced", description: "Machine learning and data analysis.", wantedSkill: "Cooking" },
    { id: 14, title: "Pottery", teacher: "Lisa Chen", category: "art", icon: "🏺", level: "beginner", description: "Hand-building ceramic techniques.", wantedSkill: "Photography" },
    { id: 15, title: "Martial Arts", teacher: "Bruce Lee Jr", category: "fitness", icon: "🥋", level: "intermediate", description: "Basic self-defense and martial arts.", wantedSkill: "Python" }
];

// Sample Users Data
const usersData = [
    { id: 1, name: "Rahul Sharma", email: "rahul@email.com", avatar: "👨‍💻", bio: "Passionate guitarist with 5 years of teaching experience", location: "Mumbai, India", skills: ["Guitar"], rating: 4.8, swapsCompleted: 45 },
    { id: 2, name: "Priya Patel", email: "priya@email.com", avatar: "👩‍💼", bio: "Full-stack developer and Python enthusiast", location: "Bangalore, India", skills: ["Python", "Web Dev"], rating: 4.9, swapsCompleted: 62 },
    { id: 3, name: "Marco Rossi", email: "marco@email.com", avatar: "👨‍🍳", bio: "Professional chef specializing in Italian cuisine", location: "Rome, Italy", skills: ["Italian Cooking"], rating: 5.0, swapsCompleted: 38 }
];

// State Management with localStorage
function getStorage(key, defaultValue) {
    try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch(e) { return defaultValue; }
}
function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Initialize state from localStorage
let favorites = getStorage('skillSwapFavorites', []);
let currentUser = getStorage('skillSwapCurrentUser', null);
let conversations = getStorage('skillSwapConversations', []);
let scheduledSwaps = getStorage('skillSwapScheduledSwaps', []);
let mySkills = getStorage('skillSwapMySkills', []);
let reviews = getStorage('skillSwapReviews', []);
let forumPosts = getStorage('skillSwapForumPosts', [
    { id: 1, title: "Getting Started with SkillSwap", author: "Admin", category: "general", content: "Welcome to SkillSwap! This is a great platform to exchange skills. Here's how to get started...", date: "2024-01-15", likes: 24, comments: 8 },
    { id: 2, title: "Tips for Great Video Calls", author: "Priya Patel", category: "tips", content: "Here are some tips for making the most of your video call skill swaps...", date: "2024-01-18", likes: 18, comments: 5 },
    { id: 3, title: "My First Swap Experience!", author: "Alex Chen", category: "success", content: "I just completed my first skill swap and it was amazing! Here's my story...", date: "2024-01-20", likes: 32, comments: 12 }
]);
let blogPosts = getStorage('skillSwapBlogPosts', [
    { id: 1, title: "Top 10 Tips for Successful Skill Swapping", author: "SkillSwap Team", date: "2024-01-20", image: "", content: "Learn how to maximize your skill exchange experience with these proven tips...", category: "tips", readTime: "5 min" },
    { id: 2, title: "How AI is Changing Skill Learning", author: "Tech Team", date: "2024-01-18", image: "", content: "Discover how artificial intelligence is revolutionizing the way we learn new skills...", category: "technology", readTime: "7 min" },
    { id: 3, title: "Success Story: From Beginner to Expert", author: "Maria R", date: "2024-01-15", image: "", content: "Follow Maria's journey as she went from complete beginner to expert in just 6 months...", category: "success", readTime: "4 min" }
]);
let notifications = getStorage('skillSwapNotifications', []);
let currentSkill = null;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let currentDashboardTab = 'overview';
let currentConversation = null;

// DOM Elements
const skillsGrid = document.getElementById('skillsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// =====================
// Loading Animation
// =====================
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
}

// =====================
// Toast Notifications
// =====================
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <span class="toast-close">&times;</span>
    `;
    
    toastContainer.appendChild(toast);
    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    setTimeout(() => toast.remove(), 5000);
}

// =====================
// Search Functionality
// =====================
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') { renderSkills(); return; }
    
    const filteredSkills = skillsData.filter(skill => 
        skill.title.toLowerCase().includes(searchTerm) ||
        skill.teacher.toLowerCase().includes(searchTerm) ||
        skill.category.toLowerCase().includes(searchTerm)
    );
    
    skillsGrid.innerHTML = filteredSkills.map(skill => createSkillCard(skill)).join('');
    animateCards();
    if (filteredSkills.length === 0) {
        skillsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--gray-500);">No skills found matching your search.</p>';
    }
}

// =====================
// Dark Mode Toggle
// =====================
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    showToast(isDarkMode ? 'Dark mode enabled' : 'Light mode enabled', 'success');
}

// =====================
// Modal Functions
// =====================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// =====================
// Skill Detail Modal
// =====================
function showSkillDetail(skill) {
    currentSkill = skill;
    const modalBody = document.getElementById('skillModalBody');
    if (!modalBody) return;
    
    const isFavorite = favorites.some(f => f.id === skill.id);
    modalBody.innerHTML = `
        <div class="skill-detail-header">
            <span class="skill-detail-icon">${skill.icon}</span>
            <h2 class="skill-detail-title">${skill.title}</h2>
            <p class="skill-detail-teacher">by ${skill.teacher}</p>
            <span class="skill-detail-category">${skill.category}</span>
            ${skill.level ? `<span class="skill-detail-level">${skill.level}</span>` : ''}
        </div>
        <p class="skill-detail-description">${skill.description || ''}</p>
        ${skill.wantedSkill ? `<p class="skill-wanted"><strong>Wants to learn:</strong> ${skill.wantedSkill}</p>` : ''}
        <div class="skill-detail-actions">
            <button class="btn btn-primary" onclick="toggleFavorite(${skill.id})">
                ${isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
            <button class="btn btn-outline" onclick="openScheduleModal(${skill.id})">📅 Schedule Swap</button>
            <button class="btn btn-outline" onclick="openContactModal(${skill.id})">📬 Contact</button>
        </div>
    `;
    openModal('skillModal');
}

// =====================
// Favorites System
// =====================
function toggleFavorite(skillId) {
    const skill = skillsData.find(s => s.id === skillId);
    if (!skill) return;
    
    const index = favorites.findIndex(f => f.id === skillId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites', 'success');
    } else {
        favorites.push(skill);
        showToast('Added to favorites!', 'success');
    }
    setStorage('skillSwapFavorites', favorites);
    updateFavoritesPanel();
    if (currentSkill && currentSkill.id === skillId) showSkillDetail(skill);
}

function updateFavoritesPanel() {
    const favoritesContent = document.getElementById('favoritesContent');
    if (!favoritesContent) return;
    
    if (favorites.length === 0) {
        favoritesContent.innerHTML = '<p class="no-favorites">No favorites yet. Click on a skill card to add it!</p>';
        return;
    }
    
    favoritesContent.innerHTML = favorites.map(skill => `
        <div class="favorite-item">
            <span class="favorite-item-icon">${skill.icon}</span>
            <div class="favorite-item-info">
                <div class="favorite-item-title">${skill.title}</div>
                <div class="favorite-item-teacher">by ${skill.teacher}</div>
            </div>
            <button class="favorite-item-remove" onclick="toggleFavorite(${skill.id})">&times;</button>
        </div>
    `).join('');
}

function toggleFavoritesPanel() {
    const panel = document.getElementById('favoritesPanel');
    if (panel) panel.classList.toggle('active');
}

// =====================
// Contact Modal
// =====================
function openContactModal(skillId) {
    const skill = skillsData.find(s => s.id === skillId);
    if (!skill) return;
    closeModal('skillModal');
    openModal('contactModal');
    document.getElementById('contactModal').dataset.skillId = skillId;
}

// =====================
// Schedule Modal
// =====================
function openScheduleModal(skillId) {
    const skill = skillsData.find(s => s.id === skillId);
    if (!skill) return;
    closeModal('skillModal');
    openModal('scheduleModal');
    document.getElementById('scheduleModal').dataset.skillId = skillId;
}

function handleSchedule(e) {
    e.preventDefault();
    const skillId = parseInt(document.getElementById('scheduleModal').dataset.skillId);
    const skill = skillsData.find(s => s.id === skillId);
    if (!skill) return;
    
    const newSwap = {
        id: Date.now(),
        skillId: skillId,
        skillTitle: skill.title,
        teacher: skill.teacher,
        date: document.getElementById('scheduleDate').value,
        time: document.getElementById('scheduleTime').value,
        type: document.getElementById('scheduleType').value,
        notes: document.getElementById('scheduleNotes').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    scheduledSwaps.push(newSwap);
    setStorage('skillSwapScheduledSwaps', scheduledSwaps);
    closeModal('scheduleModal');
    showToast('Swap scheduled successfully!', 'success');
    document.getElementById('scheduleForm').reset();
}

// =====================
// Add Skill Modal
// =====================
function handleAddSkill(e) {
    e.preventDefault();
    const newSkill = {
        id: Date.now(),
        title: document.getElementById('skillTitle').value,
        category: document.getElementById('skillCategory').value,
        level: document.getElementById('skillLevel').value,
        description: document.getElementById('skillDescription').value,
        wantedSkill: document.getElementById('skillWanted').value,
        icon: getCategoryIcon(document.getElementById('skillCategory').value),
        teacher: currentUser ? currentUser.name : 'You',
        isUserCreated: true
    };
    
    mySkills.push(newSkill);
    skillsData.push(newSkill);
    setStorage('skillSwapMySkills', mySkills);
    closeModal('addSkillModal');
    showToast('Skill added successfully!', 'success');
    document.getElementById('addSkillForm').reset();
    renderSkills();
}

function getCategoryIcon(category) {
    const icons = { music: '🎵', tech: '💻', cooking: '🍳', art: '🎨', fitness: '💪', language: '🌍', business: '💼', photography: '📷' };
    return icons[category] || '📚';
}

// =====================
// Auth Functions
// =====================
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        currentUser = { name: email.split('@')[0], email: email, avatar: '👤', isLoggedIn: true };
        setStorage('skillSwapCurrentUser', currentUser);
        closeModal('loginModal');
        showToast('Welcome back! Login successful.', 'success');
        document.getElementById('loginForm').reset();
        updateNavForLoggedInUser();
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    
    if (name && email) {
        currentUser = { name: name, email: email, avatar: '👤', isLoggedIn: true, bio: '', location: '', skills: [] };
        setStorage('skillSwapCurrentUser', currentUser);
        closeModal('signupModal');
        showToast(`Welcome to SkillSwap, ${name}! Your account has been created.`, 'success');
        document.getElementById('signupForm').reset();
        updateNavForLoggedInUser();
    }
}

function handleLogout() {
    currentUser = null;
    setStorage('skillSwapCurrentUser', null);
    showToast('Logged out successfully', 'success');
    updateNavForLoggedOutUser();
}

function updateNavForLoggedInUser() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;
    
    navActions.innerHTML = `
        <button class="theme-toggle" id="themeToggle" title="Toggle Dark Mode">${isDarkMode ? '☀️' : '🌙'}</button>
        <button class="btn btn-icon" id="notificationBtn" title="Notifications">🔔</button>
        <button class="btn btn-primary" id="dashboardBtn">📊 Dashboard</button>
        <button class="btn btn-outline" id="logoutBtn">Logout</button>
    `;
    
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('notificationBtn').addEventListener('click', toggleNotificationsPanel);
    document.getElementById('dashboardBtn').addEventListener('click', toggleDashboardPanel);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

function updateNavForLoggedOutUser() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;
    
    navActions.innerHTML = `
        <button class="theme-toggle" id="themeToggle" title="Toggle Dark Mode">${isDarkMode ? '☀️' : '🌙'}</button>
        <button class="btn btn-primary" id="loginBtn">Login</button>
        <button class="btn btn-outline" id="signupBtn">Sign Up</button>
    `;
    
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('signupBtn').addEventListener('click', () => openModal('signupModal'));
}

// =====================
// Contact Form
// =====================
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    if (name && email && message) {
        const skillId = parseInt(document.getElementById('contactModal').dataset.skillId || '0');
        const skill = skillsData.find(s => s.id === skillId);
        
        if (skill && currentUser) {
            const existingConv = conversations.find(c => c.teacher === skill.teacher);
            if (existingConv) {
                existingConv.messages.push({ from: 'You', text: message, time: new Date().toISOString() });
            } else {
                conversations.push({
                    id: Date.now(),
                    teacher: skill.teacher,
                    skill: skill.title,
                    messages: [{ from: 'You', text: message, time: new Date().toISOString() }]
                });
            }
            setStorage('skillSwapConversations', conversations);
        }
        
        closeModal('contactModal');
        showToast('Message sent successfully! The teacher will contact you soon.', 'success');
        document.getElementById('contactForm').reset();
    }
}

// =====================
// Dashboard Panel
// =====================
function toggleDashboardPanel() {
    const panel = document.getElementById('dashboardPanel');
    if (panel) {
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) renderDashboard(currentDashboardTab);
    }
}

function renderDashboard(tab) {
    currentDashboardTab = tab;
    const content = document.getElementById('dashboardContent');
    if (!content) return;
    
    document.querySelectorAll('.dash-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    switch(tab) {
        case 'overview': content.innerHTML = renderOverviewTab(); break;
        case 'my-skills': content.innerHTML = renderMySkillsTab(); break;
        case 'swaps': content.innerHTML = renderSwapsTab(); break;
        case 'messages': content.innerHTML = renderMessagesTab(); break;
        case 'schedule': content.innerHTML = renderScheduleTab(); break;
        case 'reviews': content.innerHTML = renderReviewsTab(); break;
        case 'analytics': content.innerHTML = renderAnalyticsTab(); break;
        case 'settings': content.innerHTML = renderSettingsTab(); break;
    }
}

function renderOverviewTab() {
    const stats = { totalSwaps: scheduledSwaps.length, avgRating: 4.5, connections: favorites.length + 5, hoursLearned: Math.floor(Math.random() * 50) + 10 };
    return `
        <div class="dash-overview">
            <div class="dash-stats-grid">
                <div class="dash-stat-card"><span class="dash-stat-icon">🔄</span><div class="dash-stat-info"><span class="dash-stat-number">${stats.totalSwaps}</span><span class="dash-stat-label">Total Swaps</span></div></div>
                <div class="dash-stat-card"><span class="dash-stat-icon">⭐</span><div class="dash-stat-info"><span class="dash-stat-number">${stats.avgRating}</span><span class="dash-stat-label">Avg Rating</span></div></div>
                <div class="dash-stat-card"><span class="dash-stat-icon">👥</span><div class="dash-stat-info"><span class="dash-stat-number">${stats.connections}</span><span class="dash-stat-label">Connections</span></div></div>
                <div class="dash-stat-card"><span class="dash-stat-icon">⏱️</span><div class="dash-stat-info"><span class="dash-stat-number">${stats.hoursLearned}</span><span class="dash-stat-label">Hours Learned</span></div></div>
            </div>
            <div class="dash-quick-actions">
                <h4>Quick Actions</h4>
                <div class="dash-actions-grid">
                    <button class="btn btn-primary" onclick="openModal('addSkillModal')">➕ Add Skill</button>
                    <button class="btn btn-outline" onclick="renderDashboard('my-skills')">📝 My Skills</button>
                    <button class="btn btn-outline" onclick="toggleFavoritesPanel()">❤️ Favorites</button>
                    <button class="btn btn-outline" onclick="openModal('settingsModal')">⚙️ Settings</button>
                </div>
            </div>
            <div class="dash-recent-activity">
                <h4>Recent Activity</h4>
                ${scheduledSwaps.slice(-3).map(swap => `<div class="activity-item"><span class="activity-icon">📅</span><div class="activity-info"><span class="activity-title">Scheduled: ${swap.skillTitle}</span><span class="activity-time">${swap.date} at ${swap.time}</span></div></div>`).join('') || '<p>No recent activity</p>'}
            </div>
        </div>
    `;
}

function renderMySkillsTab() {
    return `
        <div class="dash-my-skills">
            <div class="dash-header-row"><h4>My Skills</h4><button class="btn btn-primary btn-sm" onclick="openModal('addSkillModal')">➕ Add Skill</button></div>
            <div class="skills-list">
                ${mySkills.length > 0 ? mySkills.map(skill => `<div class="my-skill-card"><span class="skill-icon">${skill.icon}</span><div class="skill-info"><h5>${skill.title}</h5><span class="skill-level">${skill.level}</span></div><button class="btn-delete" onclick="deleteMySkill(${skill.id})">🗑️</button></div>`).join('') : '<p>You haven\'t added any skills yet!</p>'}
            </div>
        </div>
    `;
}

function deleteMySkill(skillId) {
    mySkills = mySkills.filter(s => s.id !== skillId);
    setStorage('skillSwapMySkills', mySkills);
    showToast('Skill removed', 'success');
    renderDashboard('my-skills');
}

function renderSwapsTab() {
    return `
        <div class="dash-swaps">
            <h4>My Swaps</h4>
            <div class="swaps-list">
                ${scheduledSwaps.length > 0 ? scheduledSwaps.map(swap => `<div class="swap-card"><div class="swap-info"><h5>${swap.skillTitle}</h5><p>with ${swap.teacher}</p><span class="swap-date">📅 ${swap.date} at ${swap.time}</span></div><div class="swap-status ${swap.status}">${swap.status}</div><div class="swap-actions">${swap.status === 'confirmed' ? '<button class="btn btn-primary btn-sm" onclick="openVideoCallModal()">📹 Join Call</button>' : ''}<button class="btn btn-outline btn-sm" onclick="openReviewModal(${swap.id})">⭐ Review</button></div></div>`).join('') : '<p>No scheduled swaps yet.</p>'}
            </div>
        </div>
    `;
}

function renderMessagesTab() {
    return `
        <div class="dash-messages">
            <h4>Messages</h4>
            <button class="btn btn-primary" onclick="openMessagingPanel()">💬 Open Full Messaging</button>
            <div class="message-list">
                ${conversations.length > 0 ? conversations.map(conv => `<div class="message-preview"><span class="message-avatar">👤</span><div class="message-info"><h5>${conv.teacher}</h5><p>${conv.messages[conv.messages.length - 1].text.substring(0, 50)}...</p></div></div>`).join('') : '<p>No messages yet. Contact a teacher to start a conversation!</p>'}
            </div>
        </div>
    `;
}

function renderScheduleTab() {
    return `
        <div class="dash-schedule">
            <h4>Schedule</h4>
            <div class="calendar-view">
                <div class="calendar-header"><button class="btn btn-outline btn-sm">◀ Prev</button><span>January 2024</span><button class="btn btn-outline btn-sm">Next ▶</button></div>
                <div class="calendar-grid">
                    ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `<span class="day-name">${d}</span>`).join('')}
                    ${Array(35).fill(0).map((_, i) => { const day = i + 1; const hasEvent = scheduledSwaps.some(s => new Date(s.date).getDate() === day); return `<div class="calendar-day ${hasEvent ? 'has-event' : ''}">${day}</div>`; }).join('')}
                </div>
            </div>
            <div class="upcoming-sessions">
                <h5>Upcoming Sessions</h5>
                ${scheduledSwaps.filter(s => s.status !== 'completed').map(swap => `<div class="session-card"><span class="session-icon">${swap.type === 'video' ? '📹' : swap.type === 'chat' ? '💬' : '🏠'}</span><div class="session-info"><h6>${swap.skillTitle}</h6><p>${swap.date} at ${swap.time}</p></div></div>`).join('') || '<p>No upcoming sessions</p>'}
            </div>
        </div>
    `;
}

function renderReviewsTab() {
    return `
        <div class="dash-reviews">
            <h4>Reviews</h4>
            <div class="reviews-summary"><div class="rating-big">4.8 ⭐</div><p>Based on ${reviews.length || 12} reviews</p></div>
            <div class="reviews-list">
                ${reviews.length > 0 ? reviews.map(review => `<div class="review-card"><div class="review-header"><span class="review-stars">${'⭐'.repeat(review.rating)}</span><span class="review-date">${review.date}</span></div><h5>${review.title}</h5><p>${review.text}</p></div>`).join('') : '<p>No reviews yet. Complete swaps to receive reviews!</p>'}
            </div>
        </div>
    `;
}

function renderAnalyticsTab() {
    return `
        <div class="dash-analytics">
            <h4>Analytics</h4>
            <div class="analytics-cards">
                <div class="analytics-card"><div class="analytics-icon">📈</div><span class="analytics-number">${Math.floor(Math.random() * 20) + 5}</span><span class="analytics-label">Skills Learned</span></div>
                <div class="analytics-card"><div class="analytics-icon">🎓</div><span class="analytics-number">${Math.floor(Math.random() * 30) + 10}</span><span class="analytics-label">Skills Taught</span></div>
                <div class="analytics-card"><div class="analytics-icon">⏰</div><span class="analytics-number">${Math.floor(Math.random() * 100) + 20}</span><span class="analytics-label">Hours Exchanged</span></div>
            </div>
            <div class="progress-section">
                <h5>Monthly Progress</h5>
                <div class="progress-bars">
                    <div class="progress-item"><span>January</span><div class="progress-bar"><div class="progress-fill" style="width: 60%"></div></div></div>
                    <div class="progress-item"><span>February</span><div class="progress-bar"><div class="progress-fill" style="width: 75%"></div></div></div>
                    <div class="progress-item"><span>March</span><div class="progress-bar"><div class="progress-fill" style="width: 45%"></div></div></div>
                </div>
            </div>
        </div>
    `;
}

function renderSettingsTab() {
    return `
        <div class="dash-settings">
            <h4>Account Settings</h4>
            <form id="settingsFormDash">
                <div class="form-group"><label>Display Name</label><input type="text" value="${currentUser?.name || ''}" placeholder="Your name"></div>
                <div class="form-group"><label>Email</label><input type="email" value="${currentUser?.email || ''}" placeholder="your@email.com"></div>
                <div class="form-group"><label>Bio</label><textarea placeholder="Tell others about yourself...">${currentUser?.bio || ''}</textarea></div>
                <div class="form-group"><label>Location</label><input type="text" value="${currentUser?.location || ''}" placeholder="City, Country"></div>
                <button type="submit" class="btn btn-primary">💾 Save Settings</button>
            </form>
        </div>
    `;
}

// =====================
// Messaging Panel
// =====================
function openMessagingPanel() {
    const panel = document.getElementById('messagingPanel');
    if (panel) { panel.classList.add('active'); renderConversationsList(); }
}

function toggleMessagingPanel() {
    const panel = document.getElementById('messagingPanel');
    if (panel) panel.classList.toggle('active');
}

function renderConversationsList() {
    const list = document.getElementById('conversationsList');
    if (!list) return;
    list.innerHTML = conversations.length > 0 ? conversations.map(conv => `<div class="conversation-item" onclick="openConversation(${conv.id})"><span class="conv-avatar">👤</span><div class="conv-info"><span class="conv-name">${conv.teacher}</span><span class="conv-skill">${conv.skill}</span></div></div>`).join('') : '<p class="no-conversations">No conversations yet</p>';
}

function openConversation(convId) {
    currentConversation = conversations.find(c => c.id === convId);
    const chatArea = document.getElementById('chatArea');
    if (!chatArea || !currentConversation) return;
    chatArea.innerHTML = `
        <div class="chat-header"><span>${currentConversation.teacher}</span><span class="chat-skill">${currentConversation.skill}</span></div>
        <div class="chat-messages" id="chatMessages">
            ${currentConversation.messages.map(msg => `<div class="chat-message ${msg.from === 'You' ? 'sent' : 'received'}"><span class="msg-text">${msg.text}</span><span class="msg-time">${new Date(msg.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>`).join('')}
        </div>
        <div class="chat-input"><input type="text" id="chatInput" placeholder="Type a message..." onkeypress="handleChatKeypress(event)"><button onclick="sendMessage()">📤</button></div>
    `;
    chatArea.querySelector('#chatMessages').scrollTop = chatArea.querySelector('#chatMessages').scrollHeight;
}

function handleChatKeypress(e) { if (e.key === 'Enter') sendMessage(); }

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input || !currentConversation) return;
    const text = input.value.trim();
    if (!text) return;
    currentConversation.messages.push({ from: 'You', text: text, time: new Date().toISOString() });
    setStorage('skillSwapConversations', conversations);
    openConversation(currentConversation.id);
    input.value = '';
}

// =====================
// Video Call Modal
// =====================
function openVideoCallModal() { openModal('videoCallModal'); }

function handleVideoCallControls() {
    document.getElementById('toggleMic').addEventListener('click', function() {
        this.classList.toggle('muted');
        this.textContent = this.classList.contains('muted') ? '🔇' : '🎤';
        showToast(this.classList.contains('muted') ? 'Microphone muted' : 'Microphone unmuted', 'success');
    });
    document.getElementById('toggleCamera').addEventListener('click', function() {
        this.classList.toggle('off');
        this.textContent = this.classList.contains('off') ? '📷' : '📹';
        showToast(this.classList.contains('off') ? 'Camera off' : 'Camera on', 'success');
    });
    document.getElementById('shareScreen').addEventListener('click', function() { showToast('Screen sharing started', 'success'); });
    document.getElementById('endCall').addEventListener('click', function() { closeModal('videoCallModal'); showToast('Call ended', 'success'); });
}

// =====================
// Review Modal
// =====================
function openReviewModal(swapId) { openModal('reviewModal'); document.getElementById('reviewModal').dataset.swapId = swapId; }

function handleReviewSubmit(e) {
    e.preventDefault();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const title = document.getElementById('reviewTitle').value;
    const text = document.getElementById('reviewText').value;
    if (rating === 0) { showToast('Please select a rating', 'warning'); return; }
    const newReview = { id: Date.now(), rating: rating, title: title, text: text, date: new Date().toISOString().split('T')[0], author: currentUser?.name || 'Anonymous' };
    reviews.push(newReview);
    setStorage('skillSwapReviews', reviews);
    closeModal('reviewModal');
    showToast('Review submitted! Thank you for your feedback.', 'success');
    document.getElementById('reviewForm').reset();
}

function handleStarRating() {
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            document.getElementById('reviewRating').value = rating;
            stars.forEach((s, i) => { s.textContent = i < rating ? '⭐' : '☆'; });
        });
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            stars.forEach((s, i) => { s.textContent = i < rating ? '⭐' : '☆'; });
        });
    });
}

// =====================
// Notifications Panel
// =====================
function toggleNotificationsPanel() {
    const panel = document.getElementById('notificationsPanel');
    if (panel) panel.classList.toggle('active');
}

function renderNotifications() {
    const list = document.getElementById('notificationsList');
    if (!list) return;
    const sampleNotifications = [
        { id: 1, text: 'New message from Priya Patel', time: '2 min ago', icon: '💬', read: false },
        { id: 2, text: 'Your swap with Rahul is confirmed', time: '1 hour ago', icon: '✅', read: false },
        { id: 3, text: 'New skill recommendation available', time: '3 hours ago', icon: '🤖', read: true }
    ];
    list.innerHTML = sampleNotifications.map(n => `<div class="notification-item ${n.read ? '' : 'unread'}"><span class="notif-icon">${n.icon}</span><div class="notif-content"><p>${n.text}</p><span class="notif-time">${n.time}</span></div></div>`).join('');
}

// =====================
// Forum Section
// =====================
function renderForum() {
    const forumPostsEl = document.getElementById('forumPosts');
    if (!forumPostsEl) return;
    forumPostsEl.innerHTML = forumPosts.map(post => `<div class="forum-post" data-category="${post.category}"><div class="post-header"><span class="post-category">${post.category}</span><span class="post-date">${post.date}</span></div><h3 class="post-title">${post.title}</h3><p class="post-content">${post.content}</p><div class="post-footer"><span class="post-author">👤 ${post.author}</span><span class="post-likes">❤️ ${post.likes}</span><span class="post-comments">💬 ${post.comments}</span></div></div>`).join('');
}

// =====================
// Blog Section
// =====================
function renderBlog() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    blogGrid.innerHTML = blogPosts.map(post => `<div class="blog-card"><div class="blog-image">📚</div><div class="blog-content"><span class="blog-category">${post.category}</span><h3>${post.title}</h3><p>${post.content.substring(0, 100)}...</p><div class="blog-meta"><span>👤 ${post.author}</span><span>📅 ${post.date}</span><span>⏱️ ${post.readTime}</span></div></div></div>`).join('');
}

// =====================
// AI Recommendations
// =====================
function renderRecommendations() {
    const recGrid = document.getElementById('recommendationsGrid');
    if (!recGrid) return;
    const recommendations = skillsData.slice(0, 4).map(skill => ({ ...skill, matchScore: Math.floor(Math.random() * 30) + 70, reason: 'Based on your interest in ' + skill.category }));
    recGrid.innerHTML = recommendations.map(skill => `<div class="recommendation-card"><div class="rec-header"><span class="rec-icon">${skill.icon}</span><span class="rec-score">${skill.matchScore}% Match</span></div><h3>${skill.title}</h3><p class="rec-teacher">by ${skill.teacher}</p><p class="rec-reason">🤖 ${skill.reason}</p><button class="btn btn-primary" onclick="showSkillDetail(${skill.id})">View Details</button></div>`).join('');
}

// =====================
// New Post Modal
// =====================
function handleNewPost(e) {
    e.preventDefault();
    const newPost = { id: Date.now(), title: document.getElementById('postTitle').value, category: document.getElementById('postCategory').value, content: document.getElementById('postContent').value, author: currentUser?.name || 'Anonymous', date: new Date().toISOString().split('T')[0], likes: 0, comments: 0 };
    forumPosts.unshift(newPost);
    setStorage('skillSwapForumPosts', forumPosts);
    closeModal('newPostModal');
    showToast('Post published successfully!', 'success');
    document.getElementById('newPostForm').reset();
    renderForum();
}

// =====================
// Settings Modal
// =====================
function handleSettingsSave(e) {
    e.preventDefault();
    if (currentUser) {
        currentUser.name = document.getElementById('settingsName')?.value || currentUser.name;
        currentUser.bio = document.getElementById('settingsBio')?.value || '';
        currentUser.location = document.getElementById('settingsLocation')?.value || '';
        setStorage('skillSwapCurrentUser', currentUser);
    }
    closeModal('settingsModal');
    showToast('Settings saved successfully!', 'success');
}

function switchSettingsTab(tabName) {
    document.querySelectorAll('.settings-tab').forEach(tab => { tab.classList.toggle('active', tab.dataset.settingsTab === tabName); });
    document.querySelectorAll('.settings-content').forEach(content => { content.style.display = content.id === 'settings' + tabName.charAt(0).toUpperCase() + tabName.slice(1) ? 'block' : 'none'; });
}

// =====================
// Render Functions
// =====================
function createSkillCard(skill) {
    const isFavorite = favorites.some(f => f.id === skill.id);
    return `<div class="skill-card" data-category="${skill.category}" data-id="${skill.id}"><span class="skill-icon">${skill.icon}</span><h3 class="skill-title">${skill.title}</h3><p class="skill-teacher">by ${skill.teacher}</p>${skill.level ? `<span class="skill-level-tag">${skill.level}</span>` : ''}<div class="skill-tags"><span class="skill-tag">${isFavorite ? '❤️' : '🤍'} Swap Now</span></div></div>`;
}

function renderSkills(filter = 'all') {
    const filteredSkills = filter === 'all' ? skillsData : skillsData.filter(skill => skill.category === filter);
    if (skillsGrid) {
        skillsGrid.innerHTML = filteredSkills.map(skill => createSkillCard(skill)).join('');
        document.querySelectorAll('.skill-card').forEach(card => { card.addEventListener('click', handleSkillCardClick); });
        animateCards();
    }
}

function handleSkillCardClick(e) {
    const card = e.target.closest('.skill-card');
    if (!card) return;
    const skillId = parseInt(card.dataset.id);
    const skill = skillsData.find(s => s.id === skillId);
    if (skill) showSkillDetail(skill);
}

function animateCards() {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => { card.style.transition = 'all 0.5s ease'; card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, index * 80);
    });
}

// =====================
// DOMContentLoaded - Initialize Everything
// =====================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideLoader, 1500);
    if (isDarkMode) { document.body.classList.add('dark-mode'); const themeToggle = document.getElementById('themeToggle'); if (themeToggle) themeToggle.textContent = '☀️'; }
    renderSkills();
    updateFavoritesPanel();
    renderForum();
    renderBlog();
    renderRecommendations();
    renderNotifications();
    if (currentUser) updateNavForLoggedInUser();
    
    const animatedElements = document.querySelectorAll('.step-card, .feature-card, .skill-card, .testimonial-card');
    animatedElements.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(40px)'; el.style.transition = 'all 0.6s ease'; });
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } }); }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
    document.querySelectorAll('.btn').forEach(btn => { btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.03)'); btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)'); });
    
    filterButtons.forEach(button => { button.addEventListener('click', () => { filterButtons.forEach(btn => btn.classList.remove('active')); button.classList.add('active'); renderSkills(button.dataset.category); }); });
    document.getElementById('searchBtn')?.addEventListener('click', handleSearch);
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
    document.getElementById('themeToggle')?.addEventListener('click', toggleDarkMode);
    document.getElementById('loginBtn')?.addEventListener('click', () => openModal('loginModal'));
    document.getElementById('signupBtn')?.addEventListener('click', () => openModal('signupModal'));
    document.getElementById('loginModalClose')?.addEventListener('click', () => closeModal('loginModal'));
    document.getElementById('signupModalClose')?.addEventListener('click', () => closeModal('signupModal'));
    document.getElementById('skillModalClose')?.addEventListener('click', () => closeModal('skillModal'));
    document.getElementById('contactModalClose')?.addEventListener('click', () => closeModal('contactModal'));
    document.getElementById('scheduleModalClose')?.addEventListener('click', () => closeModal('scheduleModal'));
    document.getElementById('reviewModalClose')?.addEventListener('click', () => closeModal('reviewModal'));
    document.getElementById('addSkillModalClose')?.addEventListener('click', () => closeModal('addSkillModal'));
    document.getElementById('videoCallModalClose')?.addEventListener('click', () => closeModal('videoCallModal'));
    document.getElementById('settingsModalClose')?.addEventListener('click', () => closeModal('settingsModal'));
    document.getElementById('newPostModalClose')?.addEventListener('click', () => closeModal('newPostModal'));
    document.getElementById('switchToSignup')?.addEventListener('click', (e) => { e.preventDefault(); closeModal('loginModal'); openModal('signupModal'); });
    document.getElementById('switchToLogin')?.addEventListener('click', (e) => { e.preventDefault(); closeModal('signupModal'); openModal('loginModal'); });
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
    document.getElementById('contactForm')?.addEventListener('submit', handleContact);
    document.getElementById('scheduleForm')?.addEventListener('submit', handleSchedule);
    document.getElementById('addSkillForm')?.addEventListener('submit', handleAddSkill);
    document.getElementById('reviewForm')?.addEventListener('submit', handleReviewSubmit);
    document.getElementById('newPostForm')?.addEventListener('submit', handleNewPost);
    document.getElementById('settingsFormDash')?.addEventListener('submit', handleSettingsSave);
    document.getElementById('favoritesLink')?.addEventListener('click', (e) => { e.preventDefault(); toggleFavoritesPanel(); });
    document.getElementById('favoritesClose')?.addEventListener('click', toggleFavoritesPanel);
    document.getElementById('dashboardClose')?.addEventListener('click', toggleDashboardPanel);
    document.querySelectorAll('.dash-nav-btn').forEach(btn => { btn.addEventListener('click', () => renderDashboard(btn.dataset.tab)); });
    document.getElementById('messagingClose')?.addEventListener('click', toggleMessagingPanel);
    document.getElementById('notificationsClose')?.addEventListener('click', toggleNotificationsPanel);
    document.getElementById('startSwappingBtn')?.addEventListener('click', () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); });
    document.getElementById('newPostBtn')?.addEventListener('click', () => openModal('newPostModal'));
    document.querySelectorAll('[data-forum-category]').forEach(btn => { btn.addEventListener('click', () => { document.querySelectorAll('[data-forum-category]').forEach(b => b.classList.remove('active')); btn.classList.add('active'); const category = btn.dataset.forumCategory; document.querySelectorAll('.forum-post').forEach(post => { post.style.display = category === 'all' || post.dataset.category === category ? 'block' : 'none'; }); }); });
    handleStarRating();
    handleVideoCallControls();
    document.querySelectorAll('.settings-tab').forEach(tab => { tab.addEventListener('click', () => switchSettingsTab(tab.dataset.settingsTab)); });
    document.querySelectorAll('.modal').forEach(modal => { modal.addEventListener('click', (e) => { if (e.target === modal) closeAllModals(); }); });
    document.addEventListener('click', (e) => { const favoritesPanel = document.getElementById('favoritesPanel'); const favoritesLink = document.getElementById('favoritesLink'); if (favoritesPanel?.classList.contains('active') && !favoritesPanel.contains(e.target) && !favoritesLink?.contains(e.target)) { favoritesPanel.classList.remove('active'); } });
    window.addEventListener('scroll', () => { const navbar = document.querySelector('.navbar'); if (navbar) { navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0, 0, 0, 0.12)' : '0 2px 30px rgba(0, 0, 0, 0.08)'; navbar.style.padding = window.scrollY > 50 ? '14px 0' : '18px 0'; } });
    window.addEventListener('scroll', () => { const scrolled = window.pageYOffset; document.querySelectorAll('.particle').forEach((particle, index) => { const speed = (index + 1) * 0.3; particle.style.transform = `translateY(${scrolled * speed}px)`; }); });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function(e) { e.preventDefault(); const target = document.querySelector(this.getAttribute('href')); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });
});

if (typeof module !== 'undefined' && module.exports) { module.exports = { skillsData, renderSkills, createSkillCard, showToast }; }
