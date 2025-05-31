# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS

from responses import RESPONSES

app = Flask(__name__)
# Allow all origins for /chat
CORS(app, resources={r"/chat": {"origins": "*"}})


# ───   simple synonyms dictionary ───────────────────────────────────
SYNONYMS = {
    "skillset": ["skills"],
    "competencies": ["skills"],
    "expertise": ["skills"],
    "cv": ["resume"],         
    "profile": ["resume"],
    "devops": ["docker", "kubernetes"],
    "containers": ["docker", "kubernetes"],
    "cloud": ["aws", "lambda", "azure"],
    "uni": ["study", "education", "school"],
    "degree": ["education"],
    "hobby": ["hobbies"],
    "interest": ["hobbies"],
}


# ───  Helper to expand the raw prompt with synonyms ─────────────────────────
def expand_with_synonyms(prompt: str) -> str:
    """
    Given a raw prompt (string), look at each word. If any word appears in our
    SYNONYMS dict, append its mapped synonyms to the end of the prompt.
    Returns a single string (lowercased).
    """
    lower_prompt = prompt.lower()
    words = lower_prompt.split()
    extras = []

    for w in words:
        if w in SYNONYMS:
            extras.extend(SYNONYMS[w])

    if extras:
        # Append extra keywords so find_reply(...) can match them as if they were typed
        return lower_prompt + " " + " ".join(extras)
    else:
        return lower_prompt


# ───   reply‐lookup function  ──────────────────
def find_reply(expanded_prompt: str) -> str:
    """
    Look through RESPONSES, which is a dict mapping a tuple of keywords to a reply.
    The first reply whose ALL keywords appear in expanded_prompt is returned.
    If no match, return a default fallback.
    """
    for keyword_tuple, reply_text in RESPONSES.items():
        # Check if every keyword in the tuple is present as a substring in expanded_prompt
        if all(k in expanded_prompt for k in keyword_tuple):
            return reply_text

    # If nothing matched, return a generic fallback:
    return (
        "Sorry, I don't have an answer for that yet. "
        "Feel free to ask about my education, technical skills, projects, "
        "or specific technologies like Docker, Kubernetes, or AWS."
    )


# ───  /chat endpoint ─────────────────
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)
    raw_prompt = data.get("prompt", "").strip()

    if not raw_prompt:
        return jsonify({"reply": "Please type a question."}), 400

    # Expand with synonyms before running find_reply logic:
    expanded = expand_with_synonyms(raw_prompt)
    # Find reply from RESPONSES
    reply = find_reply(expanded)

    return jsonify({"reply": reply})


if __name__ == "__main__":
    # Running in debug mode for development; remove debug=True in production
    app.run(host="127.0.0.1", port=5000, debug=True)
