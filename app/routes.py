# bp/routes.py
from flask import Blueprint, render_template, request
from app.db import get_db

bp = Blueprint("main", __name__)

SEASONS = [
    "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016",
    "2015", "2014",
    "2012-13", "2011-12", "2010-11", "2009-10", "2008-09", "2007-08",
    "2006-07", "2005-06", "2004-05", "2003-04", "2002-03", "2001-02",
    "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991",
    "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981",
    "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971",
    "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961",
    "1960", "1959"
]

@bp.route("/")
def home():
  return render_template("index.html")

@bp.route("/players")
def players():
  con = get_db()
  cur = con.cursor()
  cur.execute("SELECT * FROM players")
  players = cur.fetchall()
  con.close()
  return render_template("players.html", players=players)

@bp.route("/tournaments")
def tournaments():
  season = request.args.get("season", default="2025")
  con = get_db()
  cur = con.cursor()
  cur.execute('PRAGMA database_list;')
  print("[HistoBowl] Active DBs:", cur.fetchall())
  cur.execute("SELECT * FROM tournaments WHERE season = ?", (season,))
  tournaments = cur.fetchall()
  con.close()
  return render_template("tournaments.html", tournaments=tournaments, selected_season=season, seasons=SEASONS)

@bp.route("/tournament/<int:tournament_id>")
def tournament_details(tournament_id):
  con = get_db()
  cur = con.cursor()
  cur.execute("SELECT * FROM tournaments WHERE id = ?", (tournament_id,))
  tournament = cur.fetchone()
  cur.execute("""
      SELECT match_number, player1_name, player1_seed, player1_score,
              player2_name, player2_seed, player2_score, is_rolloff, id, parent_match_id, winner_name
      FROM matches
      WHERE tournament_id = ?
      ORDER BY match_number
  """, (tournament_id,))
  matches = cur.fetchall()
  con.close()
  return render_template("tournament_details.html", tournament=tournament, matches=matches)

@bp.route("/stepladder_5")
def stepladder_5():
  return render_template("stepladder_5.html")

@bp.route("/about")
def about():
  return render_template("about.html")