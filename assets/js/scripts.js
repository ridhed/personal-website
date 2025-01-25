document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Riddhi Hedaoo's portfolio!");
});

const topics = {
    "career": [
        "1. What inspired you to choose your career path?",
        "2. Can you describe a major turning point in your career?",
        "3. What challenges did you face early in your career?",
        "4. What does a typical day in your life look like?"
    ],
    "education": [
        "1. What educational background prepared you for your career?",
        "2. What technical or soft skills are most valuable to you?",
        "3. Are there any certifications or courses that helped you excel?",
        "4. What resources have impacted your learning?",
        "5. How do you keep up with trends in your industry?"
    ],
    "achievements": [
        "1. What is your proudest professional achievement?",
        "2. Can you share a memorable project or experience you’ve worked on?",
        "3. Have you ever failed at something? How did you handle it, and what did you learn?",
        "4. What’s the most significant contribution you’ve made in your field?",
        "5. How has your career evolved over the years?"
    ],
    "future": [
        "1. What are your goals for the next five years?",
        "2. Are there any industries or roles you’d like to explore in the future?",
        "3. How do you plan to stay relevant in your field over the years?",
        "4. What trends do you think will shape your industry in the next decade?",
        "5. What impact do you hope to make on the world through your work?"
    ]
};

const answers = {
    "career": [
        "I was initially drawn to commerce due to my love for math, but by 10th grade, I sought a unique path. My father introduced me to polytechnic studies, which fit academically and financially as a twin sibling. Initially aspiring to aeronautical engineering, I pivoted to computer technology due to my aptitude. My scores led me to a government engineering college in Nagpur. A gap year in 2024 reignited my curiosity and passion, especially for AI and its transformative potential.",
        "A major turning point was the cancellation of my MS plans in Canada, which prompted me to refocus on creating a social impact through technology.",
        "Challenges included educational confusion, the COVID-19 pandemic disrupting studies, canceled MS plans in Canada, and self-doubt. These obstacles helped me rediscover my drive.",
        "Currently, I focus on upskilling, building projects, and networking within the tech industry, exploring AI and its applications daily.",
        "I started with a lack of direction but have gradually gained clarity and focus, preparing to create meaningful change."
    ],
    "education": [
        "A polytechnic diploma in computer technology introduced me to technical fundamentals, while a bachelor's in Computer Science and Engineering solidified my knowledge.",
        "Valuable skills include Python, MySQL, AI tools (Pandas, Scikit-learn, PyTorch), web development (HTML, Flask), and soft skills like communication, resilience, and curiosity.",
        "Certifications like OdinSchool's Data Science program, TECHSAKSHAM, and SAP Conversational AI have been crucial in enhancing my technical expertise.",
        "Resources like GitHub, Kaggle, YouTube, and educational platforms have significantly impacted my learning.",
        "I keep up with trends by following tech blogs, attending webinars, and staying active on platforms like Twitter and LinkedIn."
    ],
    "achievements": [
        "My proudest achievement is getting first class distinction in both my degress (Diploma & B.E) plus getting Second University ranker in B.E",
        "A memorable project is 'Accumulated Report Analysis of Youth (A-RAY),' which used AI to analyze student stress during the pandemic, achieving 97% training accuracy in sentiment analysis.",
        "Failing to pursue an MS in Canada taught me resilience and adaptability, motivating me to focus on local impact through technology.",
        "My contributions so far include knowledge-building and projects aimed at solving real-world problems, like student mental health analysis.",
        "My career has evolved from uncertainty to a focus on leveraging AI to create meaningful social change."
    ],
    "future": [
        "In the next five years, I aim to establish a career in AI, work on socially impactful projects, and possibly pursue higher studies in cutting-edge fields.",
        "I’m interested in roles like Machine Learning Engineer, AI Developer, and Lecturer, focusing on tech for social good.",
        "I plan to stay relevant through continuous learning, networking, and building impactful projects.",
        "Key trends shaping my industry include ethical AI, sustainability, and AI-driven innovation across domains.",
        "I aspire to harness AI to solve critical problems, empower communities, and contribute to India's progress by sharing knowledge and fostering innovation."
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