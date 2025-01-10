from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load the Excel file
faq_df = pd.read_excel('faq.xlsx')

# Function to search for an answer based on the user's question
def get_answer(question):
    for _, row in faq_df.iterrows():
        if question.lower() in row['Question'].lower():
            return row['Answer']
    return "Sorry, I don't have an answer to that."

@app.route('/')
def home():
    return render_template('about.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['user_message']
    bot_response = get_answer(user_message)
    return jsonify({'bot_response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
