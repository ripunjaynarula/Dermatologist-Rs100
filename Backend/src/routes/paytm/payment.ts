 const PaytmChecksum = require('paytmchecksum');

import express from 'express';
 import consultations from '../../models/payments';

const router = express.Router();

router.post('/', async (req, res) => {



        try{
  

var paytmParams :any;
if(process.env.PHASE === "dev")
paytmParams = {

    MID : process.env.PAYTM_MERCHENT_ID,
    WEBSITE : process.env.PAYTM_WEBSITE,
    INDUSTRY_TYPE_ID : process.env.PAYTM_INDUSTRY_TYPE,
    CHANNEL_ID : process.env.PAYTM_CHANNEL_ID,
    ORDER_ID : "adadsad",
    CUST_ID : "ads",
    MOBILE_NO : "4444444444",
    EMAIL : "cds@dsd.com",
    TXN_AMOUNT : "100.00",
    CALLBACK_URL:"",
    


}
else
 paytmParams = {

    mid : process.env.PAYTM_PROD_MERCHENT_ID,
    websiteName : process.env.PAYTM_PROD_WEBSITE,
    INDUSTRY_TYPE_ID : process.env.PAYTM_PROD_INDUSTRY_TYPE,
    CHANNEL_ID : process.env.PAYTM_PROD_CHANNEL_ID,
    orderId : "",
    CUST_ID : "",
    MOBILE_NO : "",
    EMAIL : "",
    TXN_AMOUNT : "",
    CALLBACK_URL:""
    


}
var paytmChecksum =  PaytmChecksum.generateSignature(paytmParams, process.env.PHASE === "dev" ?process.env.PAYTM_MERCHANT_KEY:process.env.PAYTM_PROD_MERCHANT_KEY );
paytmChecksum.then(function(result :any){
	console.log("generateSignature Returns: " + result);
	var verifyChecksum =  PaytmChecksum.verifySignature(paytmParams, process.env.PHASE === "dev" ?process.env.PAYTM_MERCHANT_KEY:process.env.PAYTM_PROD_MERCHANT_KEY,result);

	console.log("verifySignature Returns: " + verifyChecksum);


    return res.send({success: true, checksum : result, ...paytmParams});


}).catch(function(error : any){
	console.log(error);
});


    }catch(e){

    return res.send({success: false});
    }
});

export default router;