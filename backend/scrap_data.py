import sqlite3
import requests
from bs4 import BeautifulSoup
from data.gp_data import *
from data.gp_mapping import *

DATABASE_NAME = "f1_data.db"

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
    conn.commit()
    conn.close()

def scrape_session_data(url):
    response = requests.get(url)
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

automate_scraping()