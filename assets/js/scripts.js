document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to the portfolio!");
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
        "My interest in problem-solving and technology inspired me to pursue a career in computer science. Over time, I found myself drawn toward the transformative potential of artificial intelligence.",
        "A major turning point was shifting focus from traditional career plans to exploring AI-driven solutions with the potential for social impact.",
        "Early challenges included navigating uncertainty, adapting during the pandemic, and overcoming self-doubt. These experiences strengthened resilience and clarified my direction.",
        "Currently, I dedicate my time to continuous learning, building projects, and exploring the practical applications of AI in everyday life.",
        "My journey began with exploration and has gradually moved toward a clear focus on using technology to create meaningful change."
    ],
    "education": [
        "A foundation in computer science provided both theoretical knowledge and practical skills necessary for pursuing advanced roles in technology.",
        "Valuable skills include programming (Python, SQL), AI and data science tools (Pandas, Scikit-learn, PyTorch), web development (HTML, Flask), as well as strong communication and problem-solving abilities.",
        "Specialized certifications and industry-led programs have been instrumental in deepening expertise in AI and data science.",
        "Resources such as GitHub, Kaggle, open-source projects, and educational platforms have significantly shaped my learning process.",
        "I stay updated by following technology communities, reading industry blogs, and participating in webinars and discussions."
    ],
    "achievements": [
        "One of my proudest academic achievements has been consistent performance with top grades and recognition during my studies.",
        "A memorable project involved designing an AI-powered tool to analyze student well-being during the pandemic, which achieved strong accuracy in sentiment analysis and demonstrated practical social value.",
        "Experiences of failure, such as missed opportunities, reinforced resilience and adaptability, motivating me to re-align with new goals.",
        "My contributions so far include developing projects that apply AI to real-world challenges and sharing knowledge within peer networks.",
        "My career path has evolved from broad exploration to a focused vision of leveraging AI for innovation and impact."
    ],
    "future": [
        "Over the next five years, I aim to build a career in AI, work on socially impactful projects, and contribute to research and innovation.",
        "I am particularly interested in roles such as Machine Learning Engineer, AI Developer, or Lecturer, with a focus on technology for social good.",
        "To stay relevant, I plan to continue learning, collaborating with professionals, and working on impactful projects that reflect industry advancements.",
        "Trends such as ethical AI, sustainability, and cross-domain AI integration will play a major role in shaping the industry.",
        "My long-term aspiration is to use AI to solve meaningful problems, empower communities, and foster knowledge-sharing for collective progress."
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