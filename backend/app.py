# backend/app.py

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Import RESPONSES dictionary and configuration
from responses import RESPONSES
from config import Config

def find_reply(prompt: str) -> str:
    """
    Look for the first key in RESPONSES whose keywords are ALL found in the prompt.
    - lowercase everything for a case-insensitive match.
    - If none match, return a default fallback.
    """
    prompt_lower = prompt.lower()

    for keywords, answer in RESPONSES.items():
        # Check if every keyword is contained in the prompt
        if all(keyword in prompt_lower for keyword in keywords):
            return answer

    # Fallback response if no keywords match
    return (
        "Sorry, I don’t have an answer for that yet. "
        "Feel free to ask about my projects, skills, education, or hobbies!"
    )

# ─── Create Flask app ───────────────────────────────────────────────────────────
app = Flask(__name__)
# Load config from config.py (e.g., DEBUG flag)
app.config.from_object(Config)

# Allow any origin to access /chat 
CORS(app, resources={r"/chat": {"origins": "*"}})

# ─── Define the /chat endpoint ───────────────────────────────────────────────────
@app.route("/chat", methods=["POST"])
def chat():
    """
    Expects JSON: { "prompt": "<user's question>" }
    Returns JSON: { "reply": "<bot's response>" }
    """
    # Parse JSON from the request body
    data = request.get_json(force=True)

    # If the client didn’t send JSON or it’s malformed, return a 400
    if not data or "prompt" not in data:
        return jsonify({"error": "Missing 'prompt' field in JSON body."}), 400

    user_prompt = data["prompt"]
    # Compute the best reply based on keyword detection
    bot_reply = find_reply(user_prompt)

    # Return as JSON
    return jsonify({"reply": bot_reply})


# ─── Run the app ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    # Use PORT env var if provided (e.g., for hosting); default to 5000
    port = int(os.getenv("PORT", 5000))
    # FLASK_DEBUG is handled by Config.DEBUG via .env
    app.run(host="0.0.0.0", port=port, debug=app.config["DEBUG"])
