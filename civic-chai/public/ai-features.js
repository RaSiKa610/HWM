// AI Features for Civic Chai
// Simulates AI-powered functionality for demo purposes

let isRecording = false;
let currentLanguage = 'en';
let aiAnalysisTimeout = null;

// Language setter
function setLanguage(lang, event) {
    currentLanguage = lang;
    document.querySelectorAll('.language-toggle button').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Update placeholder based on language
    const placeholders = {
        'en': 'Type naturally... e.g., "MG Road toilet overflow, bad smell"',
        'mr': 'नैसर्गिकपणे टाइप करा... उदा., "MG Road वर गटर overflow झालाय"',
        'hi': 'स्वाभाविक रूप से टाइप करें... जैसे, "MG Road पर toilet overflow ho gaya hai"'
    };
    const descField = document.getElementById('description');
    if (descField) {
        descField.placeholder = placeholders[lang];
    }
}

// Voice Input Toggle
function toggleVoiceInput() {
    const voiceBtn = document.getElementById('voice-btn');
    const voiceIcon = document.getElementById('voice-icon');
    const voiceText = document.getElementById('voice-text');
    const transcript = document.getElementById('voice-transcript');
    
    if (!isRecording) {
        // Start recording
        isRecording = true;
        voiceBtn.classList.add('recording');
        voiceIcon.textContent = '⏹️';
        voiceText.textContent = 'Recording... Tap to stop';
        
        // Simulate voice recognition after 3 seconds
        setTimeout(() => {
            if (isRecording) {
                stopRecording();
            }
        }, 3000);
    } else {
        stopRecording();
    }
}

function stopRecording() {
    const voiceBtn = document.getElementById('voice-btn');
    const voiceIcon = document.getElementById('voice-icon');
    const voiceText = document.getElementById('voice-text');
    const transcript = document.getElementById('voice-transcript');
    const transcriptText = document.getElementById('transcript-text');
    
    isRecording = false;
    voiceBtn.classList.remove('recording');
    voiceIcon.textContent = '🎤';
    voiceText.textContent = 'Tap to speak again';
    
    // Simulate AI transcription
    const sampleTranscripts = {
        'en': 'There is a major pothole on MG Road near the City Mall entrance. It is very dangerous for vehicles.',
        'mr': 'MG Road वर City Mall जवळ खड्डा आहे. गाड्यांना धोका आहे.',
        'hi': 'MG Road पर City Mall के पास बहुत बड़ा गड्ढा है, गाड़ियों को बहुत तकलीफ हो रही है।'
    };
    
    transcriptText.textContent = sampleTranscripts[currentLanguage];
    transcript.style.display = 'block';
    
    // Auto-fill description
    document.getElementById('description').value = sampleTranscripts[currentLanguage];
    
    // Trigger AI analysis
    analyzeDescription();
}

// AI Description Analysis (real-time as user types)
function analyzeDescription() {
    const description = document.getElementById('description').value;
    
    // Clear existing timeout
    if (aiAnalysisTimeout) {
        clearTimeout(aiAnalysisTimeout);
    }
    
    // Only analyze if there's enough text
    if (description.length < 10) {
        document.getElementById('ai-analysis').classList.remove('active');
        return;
    }
    
    // Debounce - wait 1 second after user stops typing
    aiAnalysisTimeout = setTimeout(() => {
        performAIAnalysis(description);
    }, 1000);
}

function performAIAnalysis(description) {
    const lowerDesc = description.toLowerCase();
    
    // AI Issue Type Detection
    let issueType = 'General Complaint';
    let priority = 'low';
    
    if (lowerDesc.includes('sewage') || lowerDesc.includes('gutter') || lowerDesc.includes('overflow') || lowerDesc.includes('गटर') || lowerDesc.includes('नाली')) {
        issueType = 'Sewage Overflow';
        priority = 'critical';
    } else if (lowerDesc.includes('pothole') || lowerDesc.includes('खड्डा') || lowerDesc.includes('गड्ढा')) {
        if (lowerDesc.includes('major') || lowerDesc.includes('big') || lowerDesc.includes('large') || lowerDesc.includes('मोठा') || lowerDesc.includes('बड़ा')) {
            issueType = 'Major Pothole';
            priority = 'high';
        } else {
            issueType = 'Pothole';
            priority = 'medium';
        }
    } else if (lowerDesc.includes('light') || lowerDesc.includes('streetlight') || lowerDesc.includes('दिवा') || lowerDesc.includes('बत्ती')) {
        issueType = 'Broken Streetlight';
        priority = 'high';
    } else if (lowerDesc.includes('toilet') || lowerDesc.includes('bathroom') || lowerDesc.includes('शौचालय')) {
        issueType = 'Public Toilet Issue';
        priority = 'high';
    } else if (lowerDesc.includes('garbage') || lowerDesc.includes('trash') || lowerDesc.includes('कचरा')) {
        issueType = 'Garbage Pile';
        priority = 'medium';
    } else if (lowerDesc.includes('graffiti') || lowerDesc.includes('wall paint')) {
        issueType = 'Graffiti/Vandalism';
        priority = 'low';
    }
    
    // Extract location
    let location = 'Location not detected';
    const locationPatterns = [
        /(?:at|near|on|in)\s+([A-Z][A-Za-z\s]+(?:Road|Street|Circle|Nagar|Market))/i,
        /([A-Z][A-Za-z\s]+(?:Road|Street|Circle|Nagar|Market))/i
    ];
    
    for (const pattern of locationPatterns) {
        const match = description.match(pattern);
        if (match) {
            location = match[1].trim();
            break;
        }
    }
    
    // Update UI
    document.getElementById('ai-issue-type').textContent = issueType;
    document.getElementById('ai-location').textContent = location;
    
    const priorityBadges = {
        critical: '<span class="priority-badge badge-critical">🟥 CRITICAL</span>',
        high: '<span class="priority-badge badge-high">🟧 HIGH</span>',
        medium: '<span class="priority-badge badge-medium">🟨 MEDIUM</span>',
        low: '<span class="priority-badge badge-low">🟩 LOW</span>'
    };
    document.getElementById('ai-priority').innerHTML = priorityBadges[priority];
    
    // Auto-fill location if detected
    if (location !== 'Location not detected') {
        const locationField = document.getElementById('location');
        if (!locationField.value) {
            locationField.value = location + ', Mumbai';
        }
    }
    
    // Show AI analysis
    document.getElementById('ai-analysis').classList.add('active');
    
    // Check for duplicates (simulated)
    if (priority === 'critical' || priority === 'high') {
        setTimeout(() => {
            checkDuplicates(issueType, location);
        }, 500);
    }
}

// Duplicate Detection
function checkDuplicates(issueType, location) {
    // Simulate 30% chance of finding a duplicate
    if (Math.random() < 0.3) {
        const duplicateWarning = document.getElementById('duplicate-warning');
        if (duplicateWarning) {
            duplicateWarning.classList.add('active');
        }
    }
}

function viewDuplicate() {
    alert('This would show you the similar issue that was reported earlier. In production, this would link to the actual duplicate report.');
}

function linkAndReport() {
    const duplicateWarning = document.getElementById('duplicate-warning');
    if (duplicateWarning) {
        duplicateWarning.classList.remove('active');
    }
    alert('Your report will be linked with the existing similar issue to show increased severity. Both reports will be tracked together.');
}

function reportAnyway() {
    const duplicateWarning = document.getElementById('duplicate-warning');
    if (duplicateWarning) {
        duplicateWarning.classList.remove('active');
    }
}

// Use Current Location
function useCurrentLocation() {
    if (navigator.geolocation) {
        const btn = event.target;
        btn.disabled = true;
        btn.textContent = '📍 Getting location...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Simulate reverse geocoding
                const locations = [
                    'MG Road, Andheri West, Mumbai',
                    'SV Road, Bandra, Mumbai',
                    'Linking Road, Khar, Mumbai',
                    'Hill Road, Bandra West, Mumbai',
                    'Carter Road, Bandra, Mumbai'
                ];
                
                const randomLocation = locations[Math.floor(Math.random() * locations.length)];
                document.getElementById('location').value = randomLocation;
                
                btn.disabled = false;
                btn.textContent = '📍 Location Updated';
                
                setTimeout(() => {
                    btn.textContent = '📍 Use Current GPS Location';
                }, 2000);
            },
            (error) => {
                btn.disabled = false;
                btn.textContent = '📍 Location Access Denied';
                alert('Please enable location access to use this feature.');
                
                setTimeout(() => {
                    btn.textContent = '📍 Use Current GPS Location';
                }, 2000);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Image Verification
function verifyImage() {
    const file = document.getElementById('photo').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result;
            document.getElementById('photo-preview').style.display = 'block';
            
            // Simulate AI verification after 2 seconds
            setTimeout(() => {
                document.getElementById('image-verification').style.display = 'block';
            }, 2000);
        };
        reader.readAsDataURL(file);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set up description field listener
    const descField = document.getElementById('description');
    if (descField) {
        descField.addEventListener('input', analyzeDescription);
    }
    
    // Set up photo upload listener
    const photoField = document.getElementById('photo');
    if (photoField) {
        photoField.addEventListener('change', verifyImage);
    }
    
    // Demo mode - show AI analysis after 3 seconds on page load
    setTimeout(() => {
        if (descField && !descField.value) {
            // Optionally show a demo
            // descField.value = 'MG Road वर toilet overflow झालाय, बदबू येतेय';
            // analyzeDescription();
        }
    }, 3000);
});

// Predictive Escalation Check (called before form submission)
function checkPredictiveEscalation(issueData) {
    // Simulate AI prediction of authority response
    // This would analyze historical data in production
    
    const riskScore = Math.random();
    
    if (riskScore > 0.7) {
        return {
            needsEscalation: true,
            reason: 'AI predicts this authority has 65% chance of delayed response based on past performance',
            recommendation: 'Issue will be pre-escalated to senior officials'
        };
    }
    
    return {
        needsEscalation: false,
        confidence: 'High confidence of timely response'
    };
}

// Enhanced form submission with AI features
const originalSubmitReport = window.submitReport;
window.submitReport = function(data) {
    // Add AI analysis to the report
    const aiAnalysis = {
        issueType: document.getElementById('ai-issue-type')?.textContent || 'Not analyzed',
        priority: document.getElementById('ai-priority')?.textContent || 'Not set',
        detectedLocation: document.getElementById('ai-location')?.textContent || 'Not detected',
        language: currentLanguage,
        aiVerified: true,
        imageVerified: document.getElementById('image-verification')?.style.display !== 'none',
        predictiveEscalation: checkPredictiveEscalation(data)
    };
    
    // Merge AI data with form data
    const enhancedData = {
        ...data,
        aiAnalysis
    };
    
    // Call original submit function with enhanced data
    if (originalSubmitReport) {
        originalSubmitReport(enhancedData);
    }
};

console.log('🤖 Civic Chai AI Features Loaded');
console.log('✓ Auto-severity detection');
console.log('✓ Marathi/Hinglish NLP');
console.log('✓ Duplicate detection');
console.log('✓ Image verification');
console.log('✓ Predictive escalation');
console.log('✓ Smart resolution verification');
