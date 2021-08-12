import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

pool.query(`SELECT 1`, (err) => {
    
    if (err) return console.log(err)
    
    return console.log(`Successful connection to database`)
})

export default pool.promise()
