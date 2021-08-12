require('dotenv').config()

import express from 'express'
import connection from './src/connection/database'

import posts from './src/routes/posts'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    console.log(`New connection from ${req.ip}`)

    const result = await connection.query(
        `INSERT INTO connections (ip, connect_time) VALUES ?`,
        [[[req.ip, new Date()]]]
    )

    // console.log(result)

    res.json({ message: 'Hello World' })
})

app.get('/connections', async (req, res) => {

    const [results]: any[][] = await connection.query(`SELECT * FROM connections`)

    // console.log(results)

    res.json({ results, count: results.length })
})

app.use('/posts', posts)

app.listen(3000, () => {
    const time = new Date
    console.log(`[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] Server online`)
})
