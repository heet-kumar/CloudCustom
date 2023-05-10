import psycopg2
import json

conn = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)

cur = conn.cursor()

def create_services(servicename,servicedesc):
    str_service = "INSERT INTO services(name,dsc) VALUES('"+servicename+"','"+servicedesc+"');"
    print(str_service)
    cur.execute(str_service)
    conn.commit()
    return "Resource Created Successfully"

def delete_services(name):
    str_service = "DELETE from services where name='"+name+"';"
    cur.execute(str_service)
    conn.commit()
    return "Resource deleted Successfully"

def all_services():
    str_services = "SELECT * FROM services;"
    cur.execute(str_services)
    rows = cur.fetchall()
    result = []
    for row in rows:
        result.append({
            "sid": row[0],
            "name": row[1],
            "desc": row[2]
        })
    print(result)
    return result

def name_service(name):
    str_service = "SELECT * FROM services WHERE name='"+name+"';"
    cur.execute(str_service)
    rows = cur.fetchall()
    data = {
        "sid": rows[0][0],
        "name": rows[0][1],
        "desc": rows[0][2]
    }
    print(rows)
    return data

def close():
    cur.close()
    conn.close()