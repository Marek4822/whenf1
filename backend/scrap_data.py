import sqlite3
import requests
import datetime
from bs4 import BeautifulSoup
from data.gp_data import *
from data.gp_mapping import *

DATABASE_NAME = "/home/benek/react-native/whenf1/f1_data.db"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}

def create_database():
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                grand_prix_name TEXT,
                session_type TEXT,
                pos TEXT,
                no TEXT,
                driver TEXT,
                car TEXT,
                time TEXT,
                gap TEXT,
                laps TEXT
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS driver_standings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pos TEXT,
                driver TEXT,
                nationality TEXT,
                car TEXT,
                pts TEXT
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS team_standings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pos TEXT,
                team TEXT,
                pts TEXT
            )
        """)
        conn.commit()

def scrape_table_data(url, columns):
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        return None
    soup = BeautifulSoup(response.content, "html.parser")
    table = soup.find("table", class_="f1-table f1-table-with-data w-full")
    if not table:
        return None
    data = []
    rows = table.find("tbody").find_all("tr")
    for row in rows:
        cells = row.find_all("td")
        if len(cells) <= max(columns):
            continue
        row_data = [cells[i].get_text(strip=True) for i in columns]
        data.append(row_data)
    return data

def scrape_session_data(url):
    return scrape_table_data(url, [0, 1, 2, 3, 4, 5, 6])

def scrape_driver_standings(url):
    return scrape_table_data(url, [0, 1, 2, 3, 4])

def scrape_team_standings(url):
    return scrape_table_data(url, [0, 1, 2])

def save_to_database(grand_prix_name, session_type, data):
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            DELETE FROM sessions
            WHERE grand_prix_name = ? AND session_type = ?
        """, (grand_prix_name, session_type))
        if data:
            data_to_insert = [(grand_prix_name, session_type, *entry) for entry in data]
            cursor.executemany("""
                INSERT INTO sessions (grand_prix_name, session_type, pos, no, driver, car, time, gap, laps)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, data_to_insert)
        conn.commit()

def save_driver_standings_to_database(data):
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM driver_standings")
        if data:
            cursor.executemany("""
                INSERT INTO driver_standings (pos, driver, nationality, car, pts)
                VALUES (?, ?, ?, ?, ?)
            """, data)
        conn.commit()

def save_team_standings_to_database(data):
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM team_standings")
        if data:
            cursor.executemany("""
                INSERT INTO team_standings (pos, team, pts)
                VALUES (?, ?, ?)
            """, data)
        conn.commit()

def get_gp_race_dates():
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT grand_prix, full_datetime 
            FROM calendar 
            WHERE event_type = 'Grand Prix'
        """)
        rows = cursor.fetchall()
    
    gp_races = []
    for row in rows:
        gp_name = row[0]
        datetime_str = row[1]
        try:
            race_datetime = datetime.datetime.strptime(datetime_str, "%Y-%m-%d %H:%M")
        except ValueError:
            continue
        gp_races.append((gp_name, race_datetime))
    
    gp_races.sort(key=lambda x: x[1])
    return gp_races

def get_previous_next_gp():
    gp_races = get_gp_race_dates()
    current_datetime = datetime.datetime.now()
    
    prev_gp = None
    next_gp = None
    
    for gp_name, race_datetime in gp_races:
        if race_datetime <= current_datetime:
            prev_gp = gp_name
        else:
            if next_gp is None:
                next_gp = gp_name
            break
    
    return prev_gp, next_gp

def automate_scraping():
    create_database()
    
    prev_gp, next_gp = get_previous_next_gp()
    relevant_gp_names = []
    if prev_gp:
        relevant_gp_names.append(prev_gp)
    if next_gp:
        relevant_gp_names.append(next_gp)
    
    relevant_gps = [gp for gp in grands_prix if gp["name"] in relevant_gp_names]
    
    for gp in relevant_gps:
        gp_name = gp["name"]
        gp_id = gp["id"]
        url_friendly_name = GRAND_PRIX_URL_MAPPING.get(gp_name, gp_name.replace(' ', '-').lower())
        
        for event in gp["events"]:
            session_type = event["type"]
            url_suffix = event["url_suffix"]
            url = f"https://www.formula1.com/en/results/2025/races/{gp_id}/{url_friendly_name}/{url_suffix}"
            print(f"Scraping data from: {url}")
            data = scrape_session_data(url)
            if data:
                save_to_database(gp_name, session_type, data)
                print(f"Data saved to database for {gp_name} - {session_type}")
            else:
                print(f"No data found for {gp_name} - {session_type}")
    
    # Scrape driver standings
    driver_standings_url = "https://www.formula1.com/en/results.html/2025/drivers.html"
    print(f"Scraping driver standings from: {driver_standings_url}")
    driver_standings_data = scrape_driver_standings(driver_standings_url)
    if driver_standings_data:
        save_driver_standings_to_database(driver_standings_data)
        print("Driver standings data saved to database")
    else:
        print("No driver standings data found")

    # Scrape team standings
    team_standings_url = "https://www.formula1.com/en/results.html/2025/team.html"
    print(f"Scraping team standings from: {team_standings_url}")
    team_standings_data = scrape_team_standings(team_standings_url)
    if team_standings_data:
        save_team_standings_to_database(team_standings_data)
        print("Team standings data saved to database")
    else:
        print("No team standings data found")

automate_scraping()