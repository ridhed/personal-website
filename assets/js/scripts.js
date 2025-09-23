document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to my portfolio!");
});

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
        "2. Can you share a memorable project or experience you’ve worked on?",
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
        "I’ve always enjoyed problem-solving and working with numbers. Over time, I realized technology gave me a bigger canvas to explore those interests. What started as curiosity grew into a genuine passion, especially after I discovered the potential of AI to transform how we live and work.",
        "A major turning point for me was when I had to take gap year and rethink my goals. Instead of seeing it as a setback, I took it as an opportunity to refocus and align my career with creating meaningful impact through technology.",
        "The biggest challenges came during uncertain phases — dealing with sudden changes in plans, adapting to the pandemic, and sometimes struggling with self-doubt. Looking back, those challenges actually shaped my resilience and gave me more clarity about where I want to go.",
        "Right now, my days are a mix of upskilling, experimenting with projects, and staying connected with the tech community. AI and its applications are at the center of what I explore daily.",
        "If I sum it up, my journey has gone from confusion to clarity. I’ve learned to embrace change, keep learning, and stay focused on building something meaningful."
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
        "A project close to my heart was building an AI tool to analyze student well-being during the pandemic. It wasn’t just about the accuracy — it was about creating something that actually addressed a real problem.",
        "I’ve had my fair share of failures — moments where things didn’t go the way I planned. But each time, I learned to adapt and come back stronger, which has shaped the way I look at challenges now.",
        "So far, my biggest contributions have been projects that bridge technology with real-world issues, especially in areas where tech can make life easier or more supportive for people.",
        "My journey has shifted from exploring different options to building a clear vision — using AI and data to create impact and open new possibilities."
    ],
    "future": [
        "In the next five years, I see myself working in AI — building projects that solve real problems, contributing to research, and growing into a role where I can also guide and share knowledge with others.",
        "I’m excited about roles like Machine Learning Engineer or AI Developer, and I also see myself exploring teaching or mentoring in the future.",
        "To stay relevant, I’ll keep learning, working on projects, and staying connected with what’s happening in the industry.",
        "Trends like ethical AI, sustainable tech, and cross-industry AI adoption will definitely shape the future, and I want to be a part of that change.",
        "My bigger goal is to use technology not just to advance my career, but to empower communities and make a lasting impact."
    ]
};


let currentTopic = null;

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim().toLowerCase();
    const chatBox = document.getElementById("chat-box");

    if (!userInput) return; // Exit if input is empty

    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerHTML = `<span class="bold-text">You:</span> ${userInput}`;
    chatBox.appendChild(userMessage);

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

    // Clear input field and scroll to bottom
    document.getElementById("user-input").value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Function to toggle the menu
    window.toggleMenu = function () {
        if (hamburger && navLinks) {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        } else {
            console.error("Hamburger or nav-links not found!");
        }
    };

    // Ensure any additional code does not access null elements
    console.log("Script loaded successfully.");
});

const slides = document.querySelectorAll('.slide');
const nextButtons = document.querySelectorAll('.next-btn');
const backButtons = document.querySelectorAll('.back-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
});

document.addEventListener('dragstart', event => event.preventDefault());