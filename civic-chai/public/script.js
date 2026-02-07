// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#report') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Close modal functionality
    const modal = document.getElementById('priority-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// Show priority information modal
function showPriorityInfo(priority) {
    const modal = document.getElementById('priority-modal');
    const modalBody = document.getElementById('modal-body');
    
    const priorityInfo = {
        critical: {
            title: '🟥 CRITICAL Priority',
            color: '#DC2626',
            sla: 'Response: Within Hours',
            examples: [
                'Overflowing sewage near public areas',
                'Broken water mains flooding roads',
                'Electrical hazards in public spaces',
                'Major health and safety risks'
            ],
            escalation: 'Escalates to Senior Officials if not addressed within SLA'
        },
        high: {
            title: '🟧 HIGH Priority',
            color: '#F97316',
            sla: 'Response: Within 1 Day',
            examples: [
                'Broken streetlights on main roads',
                'Large potholes affecting traffic',
                'Non-functional public toilets',
                'Safety issues requiring urgent attention'
            ],
            escalation: 'Escalates after 24 hours of inaction'
        },
        medium: {
            title: '🟨 MEDIUM Priority',
            color: '#FBBF24',
            sla: 'Response: Within Few Days',
            examples: [
                'Potholes on side streets',
                'Damaged park benches',
                'Minor drainage issues',
                'Non-urgent maintenance needs'
            ],
            escalation: 'Escalates after 3 days of inaction'
        },
        low: {
            title: '🟩 LOW Priority',
            color: '#10B981',
            sla: 'Response: Within a Week',
            examples: [
                'Graffiti on walls',
                'Overgrown vegetation',
                'Cosmetic improvements',
                'Minor aesthetic issues'
            ],
            escalation: 'Escalates after 7 days of inaction'
        }
    };
    
    const info = priorityInfo[priority];
    
    modalBody.innerHTML = `
        <h2 style="color: ${info.color}; font-family: 'Poppins', sans-serif; margin-bottom: 1rem;">
            ${info.title}
        </h2>
        <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
            <strong style="color: #6B4423;">⏱️ ${info.sla}</strong>
        </div>
        <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2C1810;">Examples:</h3>
        <ul style="margin-left: 1.5rem; line-height: 1.8; color: #666;">
            ${info.examples.map(ex => `<li>${ex}</li>`).join('')}
        </ul>
        <div style="background: #FFF8F0; padding: 1rem; border-left: 4px solid ${info.color}; margin-top: 1.5rem; border-radius: 5px;">
            <strong style="color: #6B4423;">Auto-Escalation:</strong><br>
            ${info.escalation}
        </div>
    `;
    
    modal.style.display = 'block';
}

// Form validation and submission
function validateReportForm() {
    const form = document.getElementById('report-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const issueTypeInput = document.getElementById('issue-type');
        const locationInput = document.getElementById('location');
        const descriptionInput = document.getElementById('description');
        const aiIssueType = document.getElementById('ai-issue-type');
        const aiPriorityBadge = document.getElementById('ai-priority');
        const photoInput = document.getElementById('photo');

        const issueType = issueTypeInput ? issueTypeInput.value.trim() : '';
        const location = locationInput ? locationInput.value.trim() : '';
        const description = descriptionInput ? descriptionInput.value.trim() : '';
        const fallbackIssueType = aiIssueType ? aiIssueType.textContent.trim() : 'other';
        const priorityMatch = aiPriorityBadge ? aiPriorityBadge.className.match(/badge-(\w+)/) : null;
        const priority = priorityMatch ? priorityMatch[1] : '';
        const photo = photoInput && photoInput.files ? photoInput.files[0] : null;

        if (!location || !description) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Simulate form submission
        submitReport({
            issueType: issueType || fallbackIssueType,
            location,
            description,
            priority,
            photo
        });
    });
}

function submitReport(data) {
    // Show loading
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    }
    
    // Simulate API call
    setTimeout(() => {
        const reportId = 'CC' + Date.now().toString().slice(-8);
        
        // Store report in localStorage
        const reports = JSON.parse(localStorage.getItem('civic_reports') || '[]');
        const newReport = {
            id: reportId,
            ...data,
            status: 'pending',
            priority: data.priority || calculatePriority(data.issueType),
            timestamp: new Date().toISOString(),
            photo: data.photo ? data.photo.name : null
        };
        reports.push(newReport);
        localStorage.setItem('civic_reports', JSON.stringify(reports));
        
        // Redirect to success page with report ID
        window.location.href = `report-success.html?id=${reportId}`;
    }, 1500);
}

function calculatePriority(issueType) {
    const criticalIssues = ['sewage', 'electrical', 'water-main', 'health-hazard'];
    const highIssues = ['streetlight', 'pothole-major', 'public-toilet'];
    const mediumIssues = ['pothole-minor', 'drainage', 'damaged-property'];
    
    if (criticalIssues.includes(issueType)) return 'critical';
    if (highIssues.includes(issueType)) return 'high';
    if (mediumIssues.includes(issueType)) return 'medium';
    return 'low';
}

// Track issue functionality
function searchIssue() {
    const issueId = document.getElementById('issue-id').value.trim();
    
    if (!issueId) {
        alert('Please enter an issue ID');
        return;
    }
    
    const reports = JSON.parse(localStorage.getItem('civic_reports') || '[]');
    const report = reports.find(r => r.id === issueId);
    
    const resultsDiv = document.getElementById('search-results');
    
    if (!report) {
        resultsDiv.innerHTML = `
            <div class="card" style="text-align: center; padding: 3rem;">
                <h3 style="color: #DC2626; margin-bottom: 1rem;">Issue Not Found</h3>
                <p style="color: #666;">No issue found with ID: ${issueId}</p>
                <p style="color: #666; margin-top: 1rem;">Please check the ID and try again.</p>
            </div>
        `;
        return;
    }
    
    displayIssueDetails(report);
}

function displayIssueDetails(report) {
    const resultsDiv = document.getElementById('search-results');
    const priorityColors = {
        critical: '#DC2626',
        high: '#F97316',
        medium: '#FBBF24',
        low: '#10B981'
    };
    
    const statusClass = `status-${report.status.replace(' ', '-')}`;
    const priorityEmoji = {
        critical: '🟥',
        high: '🟧',
        medium: '🟨',
        low: '🟩'
    };
    
    resultsDiv.innerHTML = `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem;">
                <div>
                    <h2 style="font-family: 'Poppins', sans-serif; color: #2C1810; margin-bottom: 0.5rem;">
                        Issue #${report.id}
                    </h2>
                    <p style="color: #666;">Reported on ${new Date(report.timestamp).toLocaleDateString()}</p>
                </div>
                <div style="text-align: right;">
                    <div class="priority-badge badge-${report.priority}" style="margin-bottom: 0.5rem;">
                        ${priorityEmoji[report.priority]} ${report.priority.toUpperCase()}
                    </div>
                    <div class="status-badge ${statusClass}">
                        ${report.status.toUpperCase()}
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 0.5rem; color: #6B4423;">Issue Type</h3>
                <p style="color: #666;">${report.issueType}</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 0.5rem; color: #6B4423;">Location</h3>
                <p style="color: #666;">${report.location}</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 0.5rem; color: #6B4423;">Description</h3>
                <p style="color: #666;">${report.description}</p>
            </div>
            
            <div style="background: #FFF8F0; padding: 1.5rem; border-radius: 10px; border-left: 4px solid ${priorityColors[report.priority]};">
                <h3 style="margin-bottom: 1rem; color: #6B4423;">Timeline</h3>
                <div style="display: grid; gap: 1rem;">
                    <div style="display: flex; align-items: start; gap: 1rem;">
                        <span style="color: ${priorityColors[report.priority]}; font-size: 1.5rem;">●</span>
                        <div>
                            <strong style="color: #2C1810;">Reported</strong>
                            <p style="color: #666; margin: 0;">${new Date(report.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                    ${report.status !== 'pending' ? `
                        <div style="display: flex; align-items: start; gap: 1rem;">
                            <span style="color: ${priorityColors[report.priority]}; font-size: 1.5rem;">●</span>
                            <div>
                                <strong style="color: #2C1810;">In Progress</strong>
                                <p style="color: #666; margin: 0;">Being reviewed by authorities</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Contact form submission
function submitContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulate submission
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        form.reset();
    });
}

// Analytics display
function displayAnalytics() {
    const reports = JSON.parse(localStorage.getItem('civic_reports') || '[]');
    
    if (reports.length === 0) {
        const analyticsDiv = document.getElementById('analytics-content');
        if (analyticsDiv) {
            analyticsDiv.innerHTML = `
                <div class="card" style="text-align: center; padding: 3rem;">
                    <h3 style="color: #6B4423;">No Data Available</h3>
                    <p style="color: #666; margin-top: 1rem;">Analytics will appear once issues are reported.</p>
                    <a href="report.html" class="btn btn-primary" style="margin-top: 2rem;">Report First Issue</a>
                </div>
            `;
        }
        return;
    }
    
    // Calculate statistics
    const stats = {
        total: reports.length,
        critical: reports.filter(r => r.priority === 'critical').length,
        high: reports.filter(r => r.priority === 'high').length,
        medium: reports.filter(r => r.priority === 'medium').length,
        low: reports.filter(r => r.priority === 'low').length,
        resolved: reports.filter(r => r.status === 'resolved').length,
        pending: reports.filter(r => r.status === 'pending').length,
        inProgress: reports.filter(r => r.status === 'in-progress').length
    };
    
    const analyticsDiv = document.getElementById('analytics-content');
    if (analyticsDiv) {
        analyticsDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                <div class="card" style="text-align: center;">
                    <h2 style="font-size: 3rem; color: #FF6B35; margin-bottom: 0.5rem;">${stats.total}</h2>
                    <p style="color: #666;">Total Issues Reported</p>
                </div>
                <div class="card" style="text-align: center;">
                    <h2 style="font-size: 3rem; color: #10B981; margin-bottom: 0.5rem;">${stats.resolved}</h2>
                    <p style="color: #666;">Issues Resolved</p>
                </div>
                <div class="card" style="text-align: center;">
                    <h2 style="font-size: 3rem; color: #F97316; margin-bottom: 0.5rem;">${stats.inProgress}</h2>
                    <p style="color: #666;">In Progress</p>
                </div>
                <div class="card" style="text-align: center;">
                    <h2 style="font-size: 3rem; color: #FBBF24; margin-bottom: 0.5rem;">${stats.pending}</h2>
                    <p style="color: #666;">Pending</p>
                </div>
            </div>
            
            <div class="card">
                <h3 style="font-family: 'Poppins', sans-serif; margin-bottom: 1.5rem; color: #2C1810;">
                    Issues by Priority
                </h3>
                <div style="display: grid; gap: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #666;"><span class="priority-badge badge-critical">🟥 Critical</span></span>
                        <strong style="color: #2C1810;">${stats.critical}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #666;"><span class="priority-badge badge-high">🟧 High</span></span>
                        <strong style="color: #2C1810;">${stats.high}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #666;"><span class="priority-badge badge-medium">🟨 Medium</span></span>
                        <strong style="color: #2C1810;">${stats.medium}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #666;"><span class="priority-badge badge-low">🟩 Low</span></span>
                        <strong style="color: #2C1810;">${stats.low}</strong>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-top: 2rem;">
                <h3 style="font-family: 'Poppins', sans-serif; margin-bottom: 1.5rem; color: #2C1810;">
                    Recent Issues
                </h3>
                <div style="display: grid; gap: 1rem;">
                    ${reports.slice(-5).reverse().map(report => `
                        <div style="padding: 1rem; background: #FFF8F0; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="color: #2C1810;">#${report.id}</strong>
                                <p style="color: #666; margin: 0.25rem 0 0 0; font-size: 0.9rem;">${report.issueType}</p>
                            </div>
                            <div style="text-align: right;">
                                <div class="priority-badge badge-${report.priority}" style="font-size: 0.75rem; padding: 0.25rem 0.75rem;">
                                    ${report.priority.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    validateReportForm();
    submitContactForm();
    
    // Check if we're on the analytics page
    if (document.getElementById('analytics-content')) {
        displayAnalytics();
    }
    
    // Check if we're on the report success page
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id');
    if (reportId && document.getElementById('report-id-display')) {
        document.getElementById('report-id-display').textContent = reportId;
    }
});
