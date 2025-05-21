import sqlite3
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/players")
def players():
    con = sqlite3.connect("histobowl.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM players")
    players = cur.fetchall()
    con.close()
    return render_template("players.html", players=players)

@app.route("/tournaments")
def tournaments():
    return render_template("tournaments.html")

@app.route("/about")
def about():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True)