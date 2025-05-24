import sqlite3
from flask import Flask, render_template, request

app = Flask(__name__)

SEASONS = [
    "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016",
    "2015", "2014",
    "2012–13", "2011–12", "2010–11", "2009–10", "2008–09", "2007–08",
    "2006–07", "2005–06", "2004–05", "2003–04", "2002–03", "2001–02",
    "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991",
    "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981",
    "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971",
    "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961",
    "1960", "1959"
]

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
    season = request.args.get("season", default="2025")
    con = sqlite3.connect("histobowl.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM tournaments WHERE season = ?", (season,))
    tournaments = cur.fetchall()
    con.close()
    return render_template("tournaments.html", tournaments=tournaments, selected_season=season, seasons=SEASONS)

@app.route("/tournament/<int:tournament_id>")
def tournament_details(tournament_id):
    con = sqlite3.connect("histobowl.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM tournaments WHERE id = ?", (tournament_id,))
    tournament = cur.fetchone()
    con.close()
    return render_template("tournament_details.html", tournament=tournament)

@app.route("/tournament_input")
def tournament_input():
    return render_template("tournament_input.html")

@app.route("/about")
def about():
    return render_template("about.html")
if __name__ == "__main__":
    app.run(debug=True)