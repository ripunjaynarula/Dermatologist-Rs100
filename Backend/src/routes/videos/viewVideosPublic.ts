import express from 'express'
import generateUploadSignedUrl from '../../actions/awsUpload';
import videos from '../../models/videos'
import { nanoid } from 'nanoid'

const router = express.Router();

router.post('/', async (req, res) => {


  
 


    try {


 

 
          
                 return res.send({
          
                isError : false,
                status : "saved"
              

            })
   




    } catch(e) {
        console.error(e);
        return res.send({status: 'technical_error', isError : true});
    }
 
});


 

export default router;

 
