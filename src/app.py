from transformers import pipeline
from huggingface_hub import login
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
import os
os.environ["HUGGINGFACE_HUB_TOKEN"] = "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"


# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

generator = pipeline(
    "text-generation", 
    model="gpt2", 
    tokenizer="gpt2",  # Specify tokenizer explicitly
    use_auth_token=os.getenv("HUGGINGFACE_HUB_TOKEN"),
    truncation=True  # Explicitly enable truncation
)




@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    user_query = data.get("query")

    if not user_query:
        return jsonify({"error": "Query is required"}), 400

    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        # Generate response using LLaMA model
        response = generator(user_query, max_length=150, truncation=True)


        answer = response[0]['generated_text'].strip()
        return jsonify({
            "response": answer,
            "date": current_date
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
