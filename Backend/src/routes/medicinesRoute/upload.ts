const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.awsAccessKey,
    secretAccessKey: process.env.awsSecretKey
});



const uploadFile = async (fileName : string, awsPath : string) => {
    // Read content from the file
   try{
     const fileContent = fs.readFileSync(fileName);
     // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.bucket_name,
        Key: awsPath, // File name you want to save as in S3
        Body: fileContent
    }; 
  s3.upload(params, function(err : any, data : any) {
        console.log("PDF uploading")
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        try{
           fs.unlinkSync(fileName)
 
        }catch(e)
        {
            console.log(e)
        }

    });

    // Uploading files to the bucket
   }catch(e)
   {
console.log(e)
   }

    
  };

export default uploadFile;

