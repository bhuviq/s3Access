const AWS           = require('aws-sdk');
const s3            = new AWS.S3();

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

        console.error(error);
        return Promise.reject(error);
    }
}


const getAllFiles = (creds, myBucket, filePath='', StartAfter=false) => {

    try {

        s3.config.update({accessKeyId: creds.key, secretAccessKey: creds.secret})
    
        return new Promise((resolve, reject) => {
    
            let obj = {
                Bucket: myBucket,
                Prefix: filePath
            }

            if (StartAfter) {
                obj.StartAfter = StartAfter;
            }

            let finalResult = [];
            s3.listObjectsV2(obj, async (err, result) => {

                if (err)
                    return reject(err)
    
                console.log(`${JSON.stringify(result)}`)
                finalResult = [...finalResult, ...result.Contents];
                let contentLength = result.Contents.length;
                console.log('total length: ',contentLength);
                // if (result.KeyCount < 1000) {
                    return resolve(finalResult);
                // }
                // let recursive = await getAllFiles(filePath, finalResult, result.Contents[contentLength-1].Key);
            })
        })

    }
    catch (error) {

        console.error(error);
        return Promise.reject(error);
    }
}

module.exports = {
    getAllBuckets,
    getAllFiles
}