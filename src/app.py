from flask import Flask, render_template, request, jsonify
import pandas as pd
import os

# Set paths for templates and static files
template_path = os.path.abspath("src")
static_path = os.path.abspath("src/assets")

app = Flask(__name__, template_folder=template_path, static_folder=static_path)

# Load the Excel file
faq_df = pd.read_excel(os.path.join(template_path, "faq.xlsx"))

# Function to search for an answer based on the user's question
def get_answer(question):
    for _, row in faq_df.iterrows():
        if question.lower() in row['Question'].lower():
            return row['Answer']
    return "Sorry, I don't have an answer to that."

# Home Page Route
@app.route('/')
def index():
    return render_template('index.html')

# About Page Route
@app.route('/about')
def about():
    return render_template('about.html')

# Projects Page Route 
@app.route('/project')
def project():
    return render_template('project.html')

# Gallery Page Route
@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

# Serve the chatbot response
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['user_message']
    bot_response = get_answer(user_message)
    return jsonify({'bot_response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
