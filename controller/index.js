const s3 = require('../modules/s3');

const getIndexData = async (creds, bucketName = "", prefix = "") => {

    try {

        if (prefix && String(prefix).trim().length && prefix.charAt(prefix.length - 1) != "/") {
            prefix += "/"
        }

        let result = await s3.getAllFiles(creds, bucketName, prefix);

        result = result.map(data => {

            data.original = data.Key;

            data.Key = String(data.Key).charAt(0) == '/' ? String(data.Key).substring(1) : data.Key;
            data.Key = String(data.Key).replace(prefix,'');

            if (String(data.Key).includes('/')) {

                data.Key = String(data.Key).split('/')[0];
                data.isFolder = true;
            }

            return data;
        });

        const uniqueResult = Array.from(new Set(result.map(item => item.Key)))
        .map(item => {
            return result.find(data => data.Key == item);
        });

        return {
            pageTitle: 'S3 Access',
            listOf: `${bucketName}/${prefix.length ? `${prefix}`: ''}`,
            bucket: bucketName,
            prefix,
            result: uniqueResult
        }

    }
    catch (error) {

        console.error(_line, error);
        return {
            pageTitle: 'S3 Access',
            listOf: bucketName,
            bucket: bucketName,
            prefix,
            result: []
        }
    }
}

const bucketList = async (creds) => {

    try {

        let result = await s3.getAllBuckets(creds);

        return {
            pageTitle: 'S3 Access',
            listOf: 'Buckets',
            result
        }
    }
    catch (error) {

        console.error(_line, error);

        return {
            pageTitle: 'S3 Access',
            listOf: 'Buckets',
            result: []
        }
    }
}

const getFileLink = async (creds, bucket, filePath) => {

    try {

        filePath = String(filePath).charAt(0) == '/' ? String(filePath).substring(1) : filePath;

        let link = await s3.getFileLink(creds, bucket, filePath);

        return link;
    }
    catch (error) {
        
        console.error(_line, error);
        return `about:blank`;
    }
}

module.exports = {
    getIndexData,
    bucketList,
    getFileLink
}