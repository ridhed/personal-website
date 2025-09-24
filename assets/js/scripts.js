// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to my portfolio!");
    initAnalytics();
});

// Define analytics functions first
function initAnalytics() {
    // Track total visits
    let totalVisits = localStorage.getItem('totalVisits') || 0;
    totalVisits = parseInt(totalVisits) + 1;
    localStorage.setItem('totalVisits', totalVisits);
    
    // Track daily visits
    const today = new Date().toLocaleDateString();
    let dailyVisits = JSON.parse(localStorage.getItem('dailyVisits') || '{}');
    dailyVisits[today] = (dailyVisits[today] || 0) + 1;
    localStorage.setItem('dailyVisits', JSON.stringify(dailyVisits));
    
    // Track first visit
    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', new Date().toISOString());
        console.log('🌟 First time visitor! Welcome!');
    }
    
    // Display analytics in console
    console.log('📊 Visitor Analytics:');
    console.log(`Total Visits: ${totalVisits}`);
    console.log(`Today's Visits: ${dailyVisits[today]}`);
    console.log(`First Visit: ${localStorage.getItem('firstVisit')}`);
}

function trackEvent(eventName, eventData = {}) {
    const events = JSON.parse(localStorage.getItem('userEvents') || '[]');
    events.push({
        name: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });
    localStorage.setItem('userEvents', JSON.stringify(events));
    console.log(`🎯 Event: ${eventName}`, eventData);
}

function trackSlideView(slideNumber) {
    let slideViews = JSON.parse(localStorage.getItem('slideViews') || '{"slide1":0, "slide2":0, "slide3":0}');
    slideViews[`slide${slideNumber}`] = (slideViews[`slide${slideNumber}`] || 0) + 1;
    localStorage.setItem('slideViews', JSON.stringify(slideViews));
    
    trackEvent('slide_view', {
        slide_number: slideNumber,
        view_count: slideViews[`slide${slideNumber}`]
    });
    
    console.log(`📄 Slide ${slideNumber} viewed: ${slideViews[`slide${slideNumber}`]} times`);
}

// Slideshow functionality
const slides = document.querySelectorAll('.slide');
const nextButtons = document.querySelectorAll('.next-btn');
const backButtons = document.querySelectorAll('.back-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    // Track slide view
    trackSlideView(index + 1);
}

// Initialize slideshow
if (slides.length > 0) {
    showSlide(currentSlide);
    
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
                
                trackEvent('slide_navigation', {
                    direction: 'next',
                    from_slide: currentSlide - 1,
                    to_slide: currentSlide
                });
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
                
                trackEvent('slide_navigation', {
                    direction: 'back',
                    from_slide: currentSlide + 1,
                    to_slide: currentSlide
                });
            }
        });
    });
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .next-btn, .back-btn, .treasure')) {
        const buttonText = e.target.textContent || e.target.innerText;
        
        trackEvent('button_click', {
            button_text: buttonText.substring(0, 50),
            page_location: window.location.pathname
        });
        
        console.log(`🖱️ Button clicked: ${buttonText}`);
    }
});


let pageLoadTime = Date.now();
let activeTime = 0;
let lastActiveTime = Date.now();

setInterval(() => {
    const now = Date.now();
    if (document.visibilityState === 'visible') {
        activeTime += (now - lastActiveTime);
    }
    lastActiveTime = now;
}, 1000);

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        const totalTime = Math.round((Date.now() - pageLoadTime) / 1000);
        const activeTimeSeconds = Math.round(activeTime / 1000);
        
        trackEvent('page_engagement', {
            total_time_seconds: totalTime,
            active_time_seconds: activeTimeSeconds,
            page: window.location.pathname
        });
        
        console.log(`⏱️ Page Engagement - Total: ${totalTime}s, Active: ${activeTimeSeconds}s`);
    }
});

const topics = {
    "career": [
        "What inspired Riddhi to pursue her career path?",
        "Can you describe a major turning point in Riddhi's journey?",
        "What challenges did Riddhi face early on?",
        "What does a typical day look like for Riddhi?",
        "How has Riddhi's journey shaped her focus now?"
    ],
    "education": [
        "Can you summarize Riddhi's educational journey?",
        "Which academic achievements is Riddhi proud of?",
        "Which technical or soft skills have been most valuable to Riddhi?",
        "Have leadership roles influenced Riddhi's outlook?",
        "How have certifications helped Riddhi's growth?"
    ],
        "certifications": [
        "Which certifications has Riddhi earned?",
        "Which certification had the most impact on her skills?",
        "How do certifications help Riddhi in her career?",
        "Does Riddhi plan to pursue more certifications in the future?"
    ],
    "projects": [
        "Tell me about a key project Riddhi has worked on.",
        "Which project challenged Riddhi the most?",
        "How did Riddhi's projects impact users or organizations?",
        "Which tools and technologies does Riddhi use?",
        "How do these projects reflect Riddhi's career growth?"
    ],
    "future": [
        "What are Riddhi's goals for the next five years?",
        "Are there any roles or industries Riddhi would like to explore?",
        "How does Riddhi plan to stay relevant in her field?",
        "Which trends will shape Riddhi's industry?",
        "What long-term impact does Riddhi hope to make?"
    ]
};
const answers = {
    "career": [
        "Riddhi has always enjoyed problem-solving and working with numbers. Technology offered a larger canvas for her curiosity, and AI became a passion once she saw its potential to transform lives.",
        "A turning point for Riddhi was receiving an offer from Northeastern University for higher studies. Although she had to defer the plan due to visa issues, this recognition validated her capabilities and inspired her to focus on creating impact through technology locally.",
        "Early challenges included adapting to unexpected changes, pandemic disruptions, and moments of self-doubt. These obstacles helped her grow more resilient and focused.",
        "Riddhi's days are a mix of learning new skills, building projects, and exploring AI applications — always connecting theory with practical solutions.",
        "Overall, Riddhi's journey has progressed from uncertainty to clarity, focusing on leveraging technology for meaningful change."
    ],
    "education": [
        "Riddhi started with a Diploma in Computer Technology, followed by a B.E. in Computer Science, and is now pursuing an M.Tech in Computer Science. Each step added layers of technical depth and problem-solving skills.",
        "She is proud of her B.E. achievements — CGPA 8.46/10, Second Rank in Nagpur University — and being active as a class representative for three years. Additionally, getting 8 Band in IELTS was a major personal achievement that reflects her academic dedication.",
        "Technical skills like Python, SQL, ML/NLP, and data visualization have been key, alongside soft skills like communication, adaptability, and teamwork.",
        "Leadership roles taught Riddhi how to coordinate teams, solve problems collaboratively, and gain confidence in guiding peers.",
        "Certifications like OdinSchool Data Science, TECHSAKSHAM, and SAP Conversational AI enhanced her practical knowledge and kept her industry-ready. IELTS certificate showed her proficiency in English, crucial for global opportunities."
    ],
    "certifications": [
        "Riddhi has earned several certifications, including:\n- OdinSchool Certified Data Science Professional\n- TECHSAKSHAM Program by Edunet in partnership with SAP and Microsoft\n- How to Build Chatbots with SAP Conversational AI\n- From Media Computation to Data Science\n- IELTS with an Overall Band Score of 8.0",
        "The Data Science Professional certification by OdinSchool had a significant impact, helping Riddhi apply machine learning and data analysis techniques effectively in her projects.",
        "Certifications help Riddhi strengthen practical skills, stay updated with industry-relevant tools, and enhance her confidence in applying technology to real-world challenges.",
        "Yes, Riddhi is actively planning to pursue more certifications in the future. Her roadmap includes:\n- Amazon Web Services (AWS) for cloud and data solutions\n- IBM SQL for Data Science and AI-focused programs\n- Google certifications like Google Analytics and TensorFlow.\nThese will keep her industry-ready and deepen her expertise in AI, data science, and cloud technologies."
    ],
    "projects": [
        "For instance, Riddhi built the 'Axon Classic Vehicles Sales Dashboard' which uncovered market trends and actionable insights using Power BI and DAX.",
        "The 'Accumulated Report Analysis of Youth (A-RAY)' project was particularly challenging, analyzing student stress during COVID-19 while balancing accuracy and meaningful insights.",
        "Projects like 'Credit Card Approval Prediction' reduced manual review by 40%, while 'ALAG' supported students' emotional well-being — demonstrating real-world impact.",
        "Riddhi works primarily with Python, SQL, Flask, ML libraries (Pandas, Scikit-learn, NLTK), and visualization tools (Power BI, Matplotlib, Streamlit). Git ensures smooth version control and collaboration.",
        "These projects showcase Riddhi's growth from technical learning to applying AI to real-world problems, aligning with her goal of meaningful technological impact."
    ],
    "future": [
        "Over the next five years, Riddhi aims to work in AI, build socially impactful projects, and contribute to research and innovation.",
        "She is interested in roles like Machine Learning Engineer, AI Developer, or mentoring/teaching opportunities where technology meets social good.",
        "Riddhi plans to stay relevant through continuous learning, hands-on projects, and engagement with the industry.",
        "She believes trends like ethical AI, sustainability, and cross-domain AI applications will shape the future, and she wants to contribute to this change.",
        "Ultimately, Riddhi hopes to leverage AI to empower communities, solve real problems, and foster knowledge-sharing for long-term impact."
    ]
};

// Example: start chat for career
// startChat('career');
let currentTopic = null;

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim().toLowerCase();
    const chatBox = document.getElementById("chat-box");

    if (!userInput) return;

    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerHTML = `<span class="bold-text">You:</span> ${userInput}`;
    chatBox.appendChild(userMessage);

    // Track chatbot usage
    trackEvent('chatbot_interaction', {
        user_input: userInput.substring(0, 100),
        current_topic: currentTopic
    });

    // Bot's response logic
    if (userInput === "topics") {
        const topicList = Object.keys(topics).join(", ");
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerHTML = `<span class="bold-text">Bot:</span> Available topics: <span class="topic">${topicList}</span>. Type a topic to see questions.`;
        chatBox.appendChild(botMessage);
    } else if (Object.keys(topics).includes(userInput)) {
        currentTopic = userInput;
        const questions = topics[userInput].join("<br>");
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerHTML = `<span class="bold-text">Bot:</span> Here are the questions for <span class="topic">${userInput}</span>:<br><span class="question">${questions}</span><br>Type the question number to get the answer.`;
        chatBox.appendChild(botMessage);
    } else if (currentTopic && !isNaN(userInput)) {
        const questionIndex = parseInt(userInput) - 1;
        if (answers[currentTopic] && answers[currentTopic][questionIndex]) {
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.innerHTML = `<span class="bold-text">Bot:</span> <span class="answer">${answers[currentTopic][questionIndex]}</span>`;
            chatBox.appendChild(botMessage);
        } else {
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.innerHTML = `<span class="bold-text">Bot:</span> <span class="error">Sorry, I don't have an answer for that.</span>`;
            chatBox.appendChild(botMessage);
        }
    } else {
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerHTML = `<span class="bold-text">Bot:</span> <span class="instruction">I didn't understand that. Type <span class="highlight">topics</span> to see available topics.</span>`;
        chatBox.appendChild(botMessage);
    }

    document.getElementById("user-input").value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Navigation menu functionality
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    window.toggleMenu = function () {
        if (hamburger && navLinks) {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            trackEvent('menu_toggle');
        }
    };

    console.log("🚀 Portfolio loaded successfully!");
});

// Prevent image dragging
document.addEventListener('dragstart', event => event.preventDefault());