const AWS           = require('aws-sdk');
const s3            = new AWS.S3({
    signatureVersion: 'v4'
});

const getAllBuckets = (creds) => {

    try {

        s3.config.update({accessKeyId: creds.key, secretAccessKey: creds.secret})

        return new Promise((resolve, reject) => {

            s3.listBuckets( async (err, result) => {
    
                if (err) {

                    return reject(err);
                }
                else {

                    return resolve(result.Buckets);
                }
            })
        })

    }
    catch (error) {

        console.error(_line, error);
        return Promise.reject(error);
    }
}


const getAllFiles = (creds, myBucket, prefix='', StartAfter=false) => {

    try {

        s3.config.update({accessKeyId: creds.key, secretAccessKey: creds.secret})
    
        return new Promise((resolve, reject) => {
    
            let obj = {
                Bucket: myBucket,
                Prefix: prefix
            }

            if (StartAfter) {
                obj.StartAfter = StartAfter;
            }

            let finalResult = [];
            s3.listObjectsV2(obj, async (err, result) => {

                if (err)
                    return reject(err)
    
                finalResult = [...finalResult, ...result.Contents];
                let contentLength = result.Contents.length;

                // if (result.KeyCount < 1000) {
                    return resolve(finalResult);
                // }
                // let recursive = await getAllFiles(filePath, finalResult, result.Contents[contentLength-1].Key);
            })
        })

    }
    catch (error) {

        console.error(_line, error);
        return Promise.reject(error);
    }
}

const getFileLink = (creds, myBucket, filePath='', minutes = 1) => {

    try {

        s3.config.update({accessKeyId: creds.key, secretAccessKey: creds.secret})

        const signedUrlExpireSeconds = 60 * minutes;
    
        return new Promise((resolve, reject) => {
    
            s3.getSignedUrl('getObject', {
                Bucket: myBucket,
                Key: filePath,
                Expires: signedUrlExpireSeconds
            }, (err, result) => {

                if (err)
                    return reject(err)

                resolve(result);
            })
        })

    }
    catch (error) {

        console.error(_line, error);
        return Promise.reject(error);
    }

}

module.exports = {
    getAllBuckets,
    getAllFiles,
    getFileLink
}