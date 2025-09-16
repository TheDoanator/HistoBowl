# app/__init__.py
from flask import Flask
from dotenv import load_dotenv
from .routes import bp as routes_bp
import os, sys

load_dotenv()

DB_PATH = os.getenv("HISTOBOWL_DB_PATH")
if not DB_PATH:
  sys.stderr.write(
    "[HistoBowl] HISTOBOWL_DB_PATH is not set.\n"
    "Set it in a .env file or as an environment variable.\n"
  )
  sys.exit(1)
    
def create_app():
  app = Flask(__name__)
  app.register_blueprint(routes_bp)
  return app