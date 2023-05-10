import psycopg2

conn = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)

cur = conn.cursor()

cur.execute('''
    CREATE TABLE services (
        sid SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        dsc VARCHAR(400) NOT NULL
    );
    CREATE TABLE subservices (
        ssid SERIAL PRIMARY KEY,
        sid INT NOT NULL,
        name VARCHAR(50) NOT NULL UNIQUE,
        dsc VARCHAR(400) NOT NULL,
        columns VARCHAR(700) NOT NULL
    );
    CREATE TABLE resources (
        id SERIAL PRIMARY KEY,
        sid INT NOT NULL,
        ssid INT NOT NULL,
        name VARCHAR(50) NOT NULL UNIQUE,
        params VARCHAR(4000) NOT NULL
    );
    CREATE TABLE cloudusers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL
    );
''')

# for message in cur:
#     print(message)

conn.commit()

cur.close()
conn.close()