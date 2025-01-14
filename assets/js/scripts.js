document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Riddhi Hedaoo's portfolio!");
});

const answers = {
    "career": [
        "I was inspired by [answer here].",
        "My first steps were [answer here].",
        "A major turning point was [answer here].",
        "Challenges included [answer here].",
        "A typical day looks like [answer here]."
    ],
    "education": [
        "My education background is [answer here].",
        "The most valuable skills are [answer here].",
        "Certifications like [answer here] helped.",
        "Resources like [answer here] impacted me.",
        "I keep up with trends by [answer here]."
    ],
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

document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Riddhi Hedaoo's portfolio!");
});

const projectDetails = [
    {
        id: 1,
        title: "Credit Card Approval Prediction",
        image: "assets/images/projects/credit-card.webp",
        date: "2024",
        tools: "Python, Machine Learning",
        overview: "A model that predicts credit card approval based on income and other factors.",
        link: "https://github.com/ridhed/Credit-Card-Approval-Prediction"
    },
    {
        id: 2,
        title: "Academic Life Assistance",
        image: "assets/images/projects/academic-life.jpeg",
        date: "2023",
        tools: "Python, Flask, NLP",
        overview: "A website to assist students with personalized academic guidance.",
        link: "https://github.com/ridhed/ALAG"
    },
    {
        id: 3,
        title: "Accumulated Report Analysis of Youth",
        image: "assets/images/projects/accumulated-report.jpeg",
        date: "2022",
        tools: "Python, Flask, ML Models",
        overview: "Analyzed emotional well-being trends of youth with interactive visualizations.",
        link: "https://github.com/ridhed/A-RAY"
    },
    {
        id: 4,
        title: "Gesture Controlled Car",
        image: "assets/images/projects/gesture-car.jpg",
        date: "2019",
        tools: "C#, Gesture Recognition",
        overview: "Developed a system for controlling a car using hand gestures.",
        link: "https://drive.google.com/file/d/18stOoIu0-Wv9eOsM6sfbgWvIDxAEt3uS/view"
    }
];

