import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

pool.query(`SELECT NOW() AS time`, (err, result) => {
    
    if (err) return console.log(err)
    
    const [{ time }] = result as mysql.RowDataPacket[]

    return console.log(`[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] Database connection estabilished`)
})

export default pool.promise()
