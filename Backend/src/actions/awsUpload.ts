 const AWS = require('aws-sdk');

 function generateUploadSignedUrl(params : any) {

        let { region, bucket, path, expires = 4 * 60, acl = 'private', contentType = 'application/octet-stream', accessKeyId = process.env.awsAccessKey, secretAccessKey = process.env.awsSecretKey } = params


        const S3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
            s3ForcePathStyle: true,
            signatureVersion: 'v4'
        })
        const Params = { Bucket: bucket, Key: path, Expires: expires, ACL: acl, ContentType: contentType };
return new Promise(function(resolve, reject) {
            S3.getSignedUrl('putObject', Params, function(err : any, url : string) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(url);
                }
            });
        })



 }
  
export default generateUploadSignedUrl;