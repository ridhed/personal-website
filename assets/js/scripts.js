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

// Function to toggle the navigation menu visibility on small screens
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // This toggles the 'active' class on nav-links
}
