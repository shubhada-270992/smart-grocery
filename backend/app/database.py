import os
import sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'grocery.db')

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create products table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        )
    ''')
    
    # Check if table is empty
    cursor.execute('SELECT COUNT(*) FROM products')
    count = cursor.fetchone()[0]
    
    if count == 0:
        sample_products = [
            ("Rice", "Grains", 2.50, 25),
            ("Sugar", "Pantry", 1.80, 8),  # Low Stock (< 10)
            ("Milk", "Dairy", 3.20, 15),
            ("Oil", "Cooking", 10.50, 5),  # Low Stock (< 10)
            ("Biscuits", "Snacks", 1.20, 50)
        ]
        cursor.executemany('''
            INSERT INTO products (name, category, price, quantity)
            VALUES (?, ?, ?, ?)
        ''', sample_products)
        conn.commit()
        
    conn.close()
