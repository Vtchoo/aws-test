import aws from 'aws-sdk'

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
    },
    region: process.env.AWS_S3_DEFAULT_REGION,
})

export default s3
