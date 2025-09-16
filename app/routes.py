# bp/routes.py
from flask import Blueprint, render_template, request
from app.db import get_db

bp = Blueprint("main", __name__)

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