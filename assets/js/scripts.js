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

// Track page engagement time
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

// Chatbot functionality
const topics = {
    "career": [
        "1. What inspired you to pursue your career path?",
        "2. Can you describe a major turning point in your journey?",
        "3. What challenges did you face in the early stages of your career?",
        "4. What does a typical day in your professional life look like?"
    ],
    "education": [
        "1. What educational background helped prepare you for your career?",
        "2. Which technical or soft skills have been most valuable to you?",
        "3. Are there any certifications or courses that significantly contributed to your growth?",
        "4. What resources have influenced your learning the most?",
        "5. How do you stay updated with trends in your industry?"
    ],
    "achievements": [
        "1. What is your proudest professional achievement so far?",
        "2. Can you share a memorable project or experience you've worked on?",
        "3. Have you experienced failure? How did you handle it, and what did you learn?",
        "4. What is the most significant contribution you have made in your field?",
        "5. How has your professional journey evolved over time?"
    ],
    "future": [
        "1. What are your goals for the next five years?",
        "2. Are there any industries or roles you aspire to explore in the future?",
        "3. How do you plan to stay relevant in your field as it evolves?",
        "4. What trends do you think will shape your industry in the coming decade?",
        "5. What impact do you hope to make through your work?"
    ]
};

const answers = {
    "career": [
        "I've always enjoyed problem-solving and working with numbers. Over time, I realized technology gave me a bigger canvas to explore those interests. What started as curiosity grew into a genuine passion, especially after I discovered the potential of AI to transform how we live and work.",
        "A major turning point for me was when I had to take gap year and rethink my goals. Instead of seeing it as a setback, I took it as an opportunity to refocus and align my career with creating meaningful impact through technology.",
        "The biggest challenges came during uncertain phases — dealing with sudden changes in plans, adapting to the pandemic, and sometimes struggling with self-doubt. Looking back, those challenges actually shaped my resilience and gave me more clarity about where I want to go.",
        "Right now, my days are a mix of upskilling, experimenting with projects, and staying connected with the tech community. AI and its applications are at the center of what I explore daily.",
        "If I sum it up, my journey has gone from confusion to clarity. I've learned to embrace change, keep learning, and stay focused on building something meaningful."
    ],
    "education": [
        "My academic background gave me a solid base in computer science and helped me understand how technology really works behind the scenes.",
        "Skills that have been most valuable for me include programming (Python, SQL), working with AI and data science libraries, building small web apps, and just as importantly — communication, adaptability, and curiosity.",
        "Certifications and hands-on programs have played a big role in sharpening my technical knowledge and keeping me industry-ready.",
        "Platforms like GitHub, Kaggle, and YouTube, along with open-source projects, have been some of the best resources for me to learn and grow.",
        "I stay updated by following tech blogs, joining webinars, and engaging with communities on platforms like LinkedIn and Twitter."
    ],
    "achievements": [
        "One of my proudest academic moments was consistently performing well throughout my studies and being recognized for it.",
        "A project close to my heart was building an AI tool to analyze student well-being during the pandemic. It wasn't just about the accuracy — it was about creating something that actually addressed a real problem.",
        "I've had my fair share of failures — moments where things didn't go the way I planned. But each time, I learned to adapt and come back stronger, which has shaped the way I look at challenges now.",
        "So far, my biggest contributions have been projects that bridge technology with real-world issues, especially in areas where tech can make life easier or more supportive for people.",
        "My journey has shifted from exploring different options to building a clear vision — using AI and data to create impact and open new possibilities."
    ],
    "future": [
        "In the next five years, I see myself working in AI — building projects that solve real problems, contributing to research, and growing into a role where I can also guide and share knowledge with others.",
        "I'm excited about roles like Machine Learning Engineer or AI Developer, and I also see myself exploring teaching or mentoring in the future.",
        "To stay relevant, I'll keep learning, working on projects, and staying connected with what's happening in the industry.",
        "Trends like ethical AI, sustainable tech, and cross-industry AI adoption will definitely shape the future, and I want to be a part of that change.",
        "My bigger goal is to use technology not just to advance my career, but to empower communities and make a lasting impact."
    ]
};

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