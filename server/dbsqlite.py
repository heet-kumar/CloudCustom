import sqlite3

def create_database():
    conn = sqlite3.connect("cloud.db")
    cursor = conn.cursor()

    # cursor.execute('''
    #     CREATE TABLE IF NOT EXISTS cloudusers(
    #         id INTEGER PRIMARY KEY AUTOINCREMENT,
    #         name VARCHAR(50) NOT NULL,
    #         email VARCHAR(100) NOT NULL UNIQUE,
    #         password VARCHAR(50) NOT NULL
    #     );
    # ''')

    # cursor.execute('''
    #     CREATE TABLE IF NOT EXISTS services (
    #         id INTEGER PRIMARY KEY AUTOINCREMENT,
    #         name VARCHAR(50) NOT NULL UNIQUE,
    #         dsc VARCHAR(400) NOT NULL
    #     );
    # ''')

    # cursor.execute('''
    #     Create table if not exists subservices (
    #         id INTEGER PRIMARY KEY AUTOINCREMENT,
    #         sid INTEGER NOT NULL,
    #         name VARCHAR(50) NOT NULL UNIQUE,
    #         dsc VARCHAR(500) NOT NULL,
    #         columns VARCHAR(700) NOT NULL,
    #         FOREIGN KEY (sid) REFERENCES services(id) ON DELETE CASCADE
    #     );
    # ''')

    cursor.execute('''
        Create table if not exists resources(
            id INTEGER NOT NULL,
            sid INTEGER NOT NULL,
            ssid INTEGER NOT NULL,
            key VARCHAR(100) NOT NULL,
            value VARCHAR(1000) NOT NULL,
            PRIMARY KEY (id,sid,ssid,key),
            FOREIGN KEY (sid) REFERENCES services(id) ON DELETE CASCADE,
            FOREIGN KEY (ssid) REFERENCES subservices(id) ON Delete Cascade
        )
    ''')

    # cursor.execute('''
    #     DROP table subservices;
    # ''')

    conn.commit()
    conn.close()

    return "Table Created Successfully !!!!"

if __name__ == "__main__":
    create_database();