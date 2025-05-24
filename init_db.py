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
    CREATE TABLE IF NOT EXISTS tournaments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event TEXT NOT NULL,
    airdate TEXT,
    prelim_dates TEXT,
    city TEXT,
    oil TEXT,
    winner TEXT,
    prize_money TEXT,
    season TEXT
  );
""")
cur.execute("""
    INSERT INTO players (name, nationality, active_years, titles, image_url) VALUES
    ('Norm Duke', 'America', '1982-2022', 40, 'http://example.com/player1.jpg');
""")
cur.execute("""
    INSERT INTO tournaments (event, airdate, prelim_dates, city, oil, winner, prize_money, season) VALUES
    ('PBA Delaware Classic', 'January 25, 2025', 'January 20-24, 2025', 'Middletown, DE', 'Cheetah', 'Graham Fach (2)', '$30,000', '2025');
""")
con.commit()
con.close()