# backend/config.py

import os

class Config:
    """
    Application configuration. Uses environment variables when available.
    """
    # Turn on debug mode if FLASK_DEBUG environment variable is "true" (case-insensitive).
    DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"

    # CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
