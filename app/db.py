# app/db.py
import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    path = os.getenv("HISTOBOWL_DB_PATH")
    if not path:
        raise RuntimeError("HISTOBOWL_DB_PATH is not set.")
    con = sqlite3.connect(path, check_same_thread=False)
    con.row_factory = sqlite3.Row
    return con