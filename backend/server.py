from flask import Flask, jsonify, request  
from flask_cors import CORS
import sqlite3

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

if __name__ == "__main__":
    app.run(debug=True)