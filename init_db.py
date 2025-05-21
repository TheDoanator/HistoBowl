import sqlite3

con = sqlite3.connect("histobowl.db")
cur = con.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nationality TEXT,
    active_years TEXT,
    titles INTEGER,
    image_url TEXT
  );
""")
cur.execute("""
    INSERT INTO players (name, nationality, active_years, titles, image_url) VALUES
    ('Norm Duke', 'America', '1982-2022', 40, 'http://example.com/player1.jpg');
""")
print("Inserted player successfully.")
con.commit()
con.close()