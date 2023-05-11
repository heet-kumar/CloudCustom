import psycopg2
from psycopg2 import IntegrityError

conn = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)

cur = conn.cursor()

class CustomException(Exception):
    def __init__(self, message):
        self.message = message


''' Login '''

def create_user(name,email,password):
    try:
        str_service = "INSERT into cloudusers(name,email,password) VALUES('" + name + "','" + email + "','" + password + "');"
        print(str_service)
        cur.execute(str_service)
        conn.commit()
        return "Success"
    except IntegrityError as e:
        error_message = f"Error: {e}"
        conn.rollback()
        raise CustomException(error_message)


''' Service '''

def create_services(servicename,servicedesc):
    str_service = "INSERT INTO services(name,dsc) VALUES('"+servicename+"','"+servicedesc+"');"
    print(str_service)
    cur.execute(str_service)
    conn.commit()
    return "Resource Created Successfully"

def delete_services(id):
    str_service = "DELETE from services where sid="+str(id)+";"
    print(str_service)
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
    result = []
    for row in rows:
        result.append({
            "sid": row[0],
            "name": row[1],
            "desc": row[2]
        })
    print(result)
    return result

''' SubService '''

def all_subservices():
    str_services = "SELECT * FROM subservices;"
    cur.execute(str_services)
    rows = cur.fetchall()
    result = []
    for row in rows:
        result.append({
            "ssid": row[0],
            "sid": row[1],
            "name": row[2],
            "desc": row[3],
            "columns": row[4]
        })
    print(result)
    return result

def create_subservices(sid,name,desc,columns):
    str_service = "INSERT INTO services(sid,name,dsc,columns) VALUES('" + sid + "','" + name +"','" + desc + "','"+ columns +"');"
    print(str_service)
    cur.execute(str_service)
    conn.commit()
    return "Resource Created Successfully"

def delete_subservices(id):
    str_service = "DELETE from services where ssid=" + str(id) + ";"
    print(str_service)
    cur.execute(str_service)
    conn.commit()
    return "Subservice deleted Successfully"

def delete_subservice_sid(id):
    str_service = "DELETE from services where sid=" + str(id) + ";"
    print(str_service)
    cur.execute(str_service)
    conn.commit()
    return "Service deleted Successfully from Subservices"



def close():
    cur.close()
    conn.close()