import psycopg2

conn = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)

cur = conn.cursor()

def create_services():
    str_service = "INSERT INTO services(name,dsc) VALUES('big query','Big Query is used to handle the larbge data like pdf,image,text,etc.');"
    cur.execute(str_service)
    conn.commit()

def delete_services():
    str_service = "DELETE from services where name='big query';"
    cur.execute(str_service)
    conn.commit()



if __name__ == '__main__':

    create_services()

    cur.close()
    conn.close()