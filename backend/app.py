from flask import Flask, jsonify, request  
from flask_cors import CORS
import sqlite3
import subprocess
from waitress import serve


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

@app.route("/api/grands_prix", methods=["GET"])
def get_grands_prix():
    try:
        conn = sqlite3.connect(DATABASE_NAME)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT DISTINCT grand_prix 
            FROM calendar 
            ORDER BY datetime(full_datetime)
        """)
        grand_prix_names = [row[0] for row in cursor.fetchall()]
        
        grands_prix = []
        for name in grand_prix_names:
            cursor.execute("""
                SELECT 
                    event_type,
                    event_date,
                    event_time,
                    full_datetime 
                FROM calendar 
                WHERE grand_prix = ? 
                ORDER BY datetime(full_datetime)
            """, (name,))
            
            events = []
            for row in cursor.fetchall():
                events.append({
                    "type": row[0],      
                    "date": row[1],       
                    "time": row[2],       
                    "datetime": row[3]    
                })
            
            grands_prix.append({
                "name": name,
                "events": events
            })
        
        conn.close()
        return jsonify({"GrandsPrix": grands_prix})
    
    except sqlite3.Error as e:
        print(f"Database error: {str(e)}")
        return jsonify({"error": "Database error", "details": str(e)}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Server error", "details": str(e)}), 500
    

@app.route('/api/refresh-data', methods=['POST'])
def refresh_data():
    try:
        result = subprocess.run(
            ['python3', 'scrap_data.py'],
            capture_output=True,
            text=True,
            check=True
        )
        return jsonify({
            "status": "success",
            "output": result.stdout,
            "error": result.stderr
        })
    except subprocess.CalledProcessError as e:
        return jsonify({
            "status": "error",
            "error": f"Script failed with code {e.returncode}",
            "output": e.stdout,
            "error_details": e.stderr
        }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

if __name__ == "__main__":
    serve(app, host="127.0.0.1")