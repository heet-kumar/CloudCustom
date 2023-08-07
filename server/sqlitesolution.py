import sqlite3

# Exception handling and raise the error
class handle_exception(Exception):
    pass

def get_db_connection():
    conn = sqlite3.connect('cloud.db')
    # conn.row_factory = sqlite3.Row
    return conn

def close_db_connection(conn,cur):
    cur.close()
    conn.close()

'''
    Sign-In
'''

def create_user(name,email,password):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "INSERT into cloudusers(name,email,password) VALUES (?,?,?);"
        cur.execute(query,(name,email,password))
        conn.commit()
        close_db_connection(conn,cur)
        return "User Created Successfully"
    except sqlite3.IntegrityError as e:
        print("Exception Message : ",e)
        raise handle_exception(str(e))
    except Exception as e:
        print("General Error : ",e)
        raise handle_exception(str(e))

'''
    Login
'''

def login_user(email,password):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "SELECT * from cloudusers where email = ? and password = ?;"
        cur.execute(query,(email,password))
        rows = cur.fetchall()
        close_db_connection(conn,cur)
        # print("Testing :",rows)
        if(len(rows)):
            return {"UserName":rows[0][1],"Email":rows[0][2]}
        else:
            raise handle_exception("User Not Found, Kindly Create Account")
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

'''
    Service
'''

# create service
def create_services(name,dsc):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "INSERT into services(name,dsc) values(?,?);"
        cur.execute(query,(name,dsc))
        conn.commit()
        close_db_connection(conn,cur)
        return "New Service Created Successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# all services
def all_services():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "SELECT * from services;"
        cur.execute(query)
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "name": row[1],
                "desc": row[2]
            })
        print("All Services : ",result)
        close_db_connection(conn,cur)
        return result
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# delete services

def delete_services(id):
    try: 
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("PRAGMA foreign_keys = ON;")
        query = "DELETE from services where id=?;"
        cur.execute(query,(id,))
        conn.commit()
        close_db_connection(conn,cur)
        return "Service Deleted Successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))


# edit services

def edit_services(id,name,dsc):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "UPDATE services SET name = ? , dsc = ? WHERE id = ?;"
        cur.execute(query,(name,dsc,id))
        conn.commit()
        close_db_connection(conn,cur)
        return "Service Updated Successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))


# Service By Name

def service_by_name(name):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "SELECT * from services where name = ?;"
        cur.execute(query,(name,))
        rows = cur.fetchall()
        close_db_connection(conn,cur)
        if len(rows) != 0:
            result = []
            for row in rows:
                result.append({
                    "id": row[0],
                    "name": row[1],
                    "dsc": row[2]
                })
            return result;
        else:
            return "Not Found"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))


''' Sub Services '''

# All Sub Service
def all_subservices():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "Select * from subservices;"
        cur.execute(query)
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "sid": row[1],
                "name": row[2],
                "dsc": row[3],
                "columns": row[4]
            })
        close_db_connection(conn,cur)
        return result
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))


# Create Sub Service
def create_subservices(sid,name,dsc,columns):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "Insert into subservices (sid,name,dsc,columns) values (?,?,?,?);"
        cur.execute(query,(sid,name,dsc,columns))
        conn.commit()
        close_db_connection(conn,cur)
        return "Subservices Inserted Successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# Delete Sub Service
def delete_subservices(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("PRAGMA foreign_keys = ON;")
        query = "Delete from subservices where id = ?;"
        cur.execute(query,(id,))
        conn.commit()
        close_db_connection(conn,cur)
        return "Subservices Deleted Successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# sub Service By Name
def subservices_by_name(name):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "Select * from subservices where name = ?;"
        cur.execute(query,(name,))
        rows = cur.fetchall()
        close_db_connection(conn,cur)
        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "sid": row[1],
                "name": row[2],
                "dsc": row[3],
                "columns": row[4]
            })
        return result
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# Sub service edit
def edit_subservices(name,dsc,columns,id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "update subservices set name = ?, dsc = ?, columns = ? where id = ?;"
        cur.execute(query,(name,dsc,columns,id))
        conn.commit()
        close_db_connection(conn,cur)
        return "SubService Updated successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))


''' Resources '''

# all resouces
def all_resources(ssid):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "SELECT id, group_concat(key || ' : ' || value, ',') as attributes from resources where ssid = ? group by id;"
        cur.execute(query,(ssid,))
        rows = cur.fetchall()
        print("After Grouping :", rows)
        return rows
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# create resources
def create_resources(id,sid,ssid,data):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        for key,value in data.items():
            query = "INSERT into resources(id,sid,ssid,key,value) values(?,?,?,?,?);"
            cur.execute(query,(id,sid,ssid,key,value))
        conn.commit()
        close_db_connection(conn,cur)
        return "Resource Created successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# edit resources

# delete resources
def delete_resources(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "Delete from resources where id = ?;"
        cur.execute(query,(id,))
        conn.commit()
        close_db_connection(conn,cur)
        return "Resource Deleted Successfully"
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

# id of the last resource created
def last_resources():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        query = "Select id from resources order by id desc limit 1;"
        cur.execute(query)
        rows = cur.fetchall()
        l = len(rows)
        if(l == 0):
            return 0
        return rows[0][0]
    except sqlite3.IntegrityError as e:
        raise handle_exception(str(e))
    except Exception as e:
        raise handle_exception(str(e))

