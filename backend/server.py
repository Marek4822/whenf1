from flask import Flask, jsonify, request  
from flask_cors import CORS
import sqlite3
import subprocess

app = Flask(__name__)
CORS(app)  
DATABASE_NAME = "../f1_data.db"

@app.route("/api/sessions", methods=["GET"])
def get_sessions():
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessions")
    sessions = cursor.fetchall()
    conn.close()
    return jsonify(sessions)

@app.route("/api/sessions/<grand_prix_name>", methods=["GET"])
def get_sessions_by_grand_prix(grand_prix_name):
    session_type = request.args.get("session_type")
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    if session_type:
        cursor.execute(
            "SELECT pos, no, driver, car, time, gap, laps FROM sessions WHERE grand_prix_name = ? AND session_type = ?",
            (grand_prix_name, session_type),
        )
    else:
        cursor.execute(
            "SELECT pos, no, driver, car, time, gap, laps FROM sessions WHERE grand_prix_name = ?",
            (grand_prix_name,),
        )
    sessions = cursor.fetchall()
    conn.close()

    session_data = [
        {
            "pos": row[0],
            "no": row[1],
            "driver": row[2],
            "car": row[3],
            "time": row[4],
            "gap": row[5],
            "laps": row[6],
        }
        for row in sessions
    ]
    return jsonify(session_data)


@app.route("/api/driver_standings", methods=["GET"])
def get_driver_standings():
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM driver_standings")
    standings = cursor.fetchall()
    conn.close()

    standings_data = [
        {
            "position": row[1],
            "driver": row[2],
            "nationality": row[3],
            "team": row[4],
            "points": row[5]
        }
        for row in standings
    ]
    return jsonify(standings_data)

@app.route("/api/team_standings", methods=["GET"])
def get_team_standings():
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM team_standings")
    standings = cursor.fetchall()
    conn.close()

    standings_data = [
        {
            "position": row[1], 
            "team": row[2],   
            "points": row[3] 
        }
        for row in standings
    ]
    return jsonify(standings_data)

if __name__ == "__main__":
    app.run(debug=True)