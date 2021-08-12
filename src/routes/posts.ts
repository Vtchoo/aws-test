import { Router } from 'express'
import connection from '../connection/database'
import s3 from '../connection/s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { v4 as uuid } from 'uuid'

interface MulterS3File extends Express.Multer.File {
    location?: string
    key: string
}


const storage = multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => cb(null, `${uuid()} - ${file.originalname}`)
})

const upload = multer({
    storage
})

const router = Router({ mergeParams: true })

router.get('/', async (req, res, next) => {

    try {
        
        const [results] = await connection.query(`SELECT * FROM posts`)

        res.json({ results })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

router.post('/', upload.single('file'), async (req, res, next) => {
    
    const { file } = req

    try {

        console.log(file)
        const post = JSON.parse(req.body.post || '{}')
        
        const result = await connection.query(
            `INSERT INTO posts (file, description) VALUES ?`,
            [[[(file as MulterS3File)?.location, post.description]]]
        )

        res.json({ post, file })

    } catch (error) {

        if (file) {
            s3.deleteObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME as string,
                Key: (file as MulterS3File).key,
            })
        }

        console.log(error)
        res.sendStatus(500)
    }

})

export default router
