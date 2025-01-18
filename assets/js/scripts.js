document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Riddhi Hedaoo's portfolio!");
});

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
        "My proudest achievement is overcoming setbacks like canceled MS plans to realign my goals and build impactful projects.",
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


function showAnswer() {
    const activeTab = document.querySelector(".questions-container.active");
    const userInput = document.getElementById("user-input").value.trim();
    const chatBox = document.getElementById("chat-box");

    if (activeTab && userInput) {
        // Find the currently selected question in the active tab
        const questions = activeTab.querySelectorAll(".question");
        const selectedQuestion = questions[userInput - 1]?.textContent || "Sorry, I don't have that question.";

        // Display user message (the selected question)
        chatBox.innerHTML += `
            <div class="user-message">
                <span class="bold-text">You:</span> ${selectedQuestion}
            </div>`;
        
        // Display bot's response
        if (answers[activeTab.id] && answers[activeTab.id][userInput - 1]) {
            chatBox.innerHTML += `
                <div class="bot-message">
                    <span class="bold-text">Bot:</span> ${answers[activeTab.id][userInput - 1]}
                </div>`;
        } else {
            // Default message if no answer is found
            chatBox.innerHTML += `
                <div class="bot-message">
                    <span class="bold-text">Bot:</span> Sorry, I don't have an answer for that.
                </div>`;
        }
        
        // Scroll to the bottom of the chat
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear the input field
        document.getElementById("user-input").value = '';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Default to the Career tab when the page loads
    showTab('career');
});

function showTab(tabId) {
    // Get all tabs and remove the 'active' class from them
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add 'active' class to the clicked tab
    const clickedTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
    clickedTab.classList.add('active');

    // Hide all question containers and show the selected one
    const questionContainers = document.querySelectorAll('.questions-container');
    questionContainers.forEach(container => {
        container.classList.remove('active');
    });

    // Show the selected question container
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        showAnswer();
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


