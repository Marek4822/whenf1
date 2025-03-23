import sqlite3
import requests
from bs4 import BeautifulSoup
from data.gp_data import *
from data.gp_mapping import *

DATABASE_NAME = "f1_data.db"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}

def create_database():
    conn = sqlite3.connect(DATABASE_NAME)
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
    conn.close()

def scrape_session_data(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        table = soup.find("table", class_="f1-table f1-table-with-data w-full")
        if table:
            data = []
            rows = table.find("tbody").find_all("tr")
            for row in rows:
                cells = row.find_all("td")
                pos = cells[0].get_text(strip=True)
                no = cells[1].get_text(strip=True)
                driver = cells[2].get_text(strip=True)
                car = cells[3].get_text(strip=True)
                time = cells[4].get_text(strip=True)
                gap = cells[5].get_text(strip=True)
                laps = cells[6].get_text(strip=True)
                data.append([pos, no, driver, car, time, gap, laps])
            return data
    return None

def scrape_driver_standings(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        table = soup.find("table", class_="f1-table f1-table-with-data w-full")
        if table:
            data = []
            rows = table.find("tbody").find_all("tr")
            for row in rows:
                cells = row.find_all("td")
                pos = cells[0].get_text(strip=True)
                driver = cells[1].get_text(strip=True)
                nationality = cells[2].get_text(strip=True)
                car = cells[3].get_text(strip=True)
                pts = cells[4].get_text(strip=True)
                data.append([pos, driver, nationality, car, pts])
            return data
    return None

def scrape_team_standings(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        table = soup.find("table", class_="f1-table f1-table-with-data w-full")
        if table:
            data = []
            rows = table.find("tbody").find_all("tr")
            for row in rows:
                cells = row.find_all("td")
                pos = cells[0].get_text(strip=True)
                team = cells[1].get_text(strip=True)
                pts = cells[2].get_text(strip=True)
                data.append([pos, team, pts])
            return data
    return None

def save_to_database(grand_prix_name, session_type, data):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    cursor.execute("""
        DELETE FROM sessions
        WHERE grand_prix_name = ? AND session_type = ?
    """, (grand_prix_name, session_type))
    
    for entry in data:
        cursor.execute("""
            INSERT INTO sessions (grand_prix_name, session_type, pos, no, driver, car, time, gap, laps)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (grand_prix_name, session_type, *entry))
    
    conn.commit()
    conn.close()

def save_driver_standings_to_database(data):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM driver_standings")
    
    for entry in data:
        cursor.execute("""
            INSERT INTO driver_standings (pos, driver, nationality, car, pts)
            VALUES (?, ?, ?, ?, ?)
        """, entry)
    
    conn.commit()
    conn.close()

def save_team_standings_to_database(data):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM team_standings")
    
    for entry in data:
        cursor.execute("""
            INSERT INTO team_standings (pos, team, pts)
            VALUES (?, ?, ?)
        """, entry)
    
    conn.commit()
    conn.close()

def automate_scraping():
    create_database() 
    for gp in grands_prix:
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