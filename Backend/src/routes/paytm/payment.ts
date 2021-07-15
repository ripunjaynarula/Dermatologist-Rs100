 const PaytmChecksum = require('paytmchecksum');

import express from 'express';
 import consultations from '../../models/payments';
import https from 'https';

const router = express.Router();

router.post('/', async (req, res) => {



        try{
  

var paytmParams :any = {};
if(process.env.PHASE === "dev"){
// paytmParams = {

//     MID : process.env.PAYTM_MERCHENT_ID,
//     WEBSITE : process.env.PAYTM_WEBSITE,
//     INDUSTRY_TYPE_ID : process.env.PAYTM_INDUSTRY_TYPE,
//     CHANNEL_ID : process.env.PAYTM_CHANNEL_ID,
//     ORDER_ID : "adadsad",
//     CUST_ID : "ads",
//     MOBILE_NO : "4444444444",
//     EMAIL : "cds@dsd.com",
//     TXN_AMOUNT : "100.00",
//     CALLBACK_URL:"",
    


// }


paytmParams.body = {
    "requestType"   : "Payment",
    "mid"           : "UlYyJJ68894954901885",
    "websiteName"   : "WEBSTAGING",
    "orderId"       : "adadsad",
    "callbackUrl"   : "https://merchant.com/callback",
    "txnAmount"     : {
        "value"     : "100.00",
        "currency"  : "INR",
    },
    "userInfo"      : {
        "custId"    : "CUST_001",
    },
};


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



 var paytmChecksum =  PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PHASE === "dev" ?process.env.PAYTM_MERCHANT_KEY:process.env.PAYTM_PROD_MERCHANT_KEY );
 paytmChecksum.then(function(result :any){
	console.log("generateSignature Returns: " + result);
      paytmParams.head = {
        "signature"    : result
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: '/theia/api/v1/initiateTransaction?mid=UlYyJJ68894954901885&orderId=' + paytmParams.body.orderId,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            console.log(paytmParams.body.mid)
            console.log(options.path)
            console.log('Response: ', response);
            console.log('Response: ', response);
        });
    });

    console.log(post_data)
    post_req.write(post_data);
    post_req.end();





	// var verifyChecksum =  PaytmChecksum.verifySignature(JSON.stringify(paytmParams.body), process.env.PHASE === "dev" ?process.env.PAYTM_MERCHANT_KEY:process.env.PAYTM_PROD_MERCHANT_KEY,result);

	// console.log("verifySignature Returns: " + verifyChecksum);


    return res.send({success: true, checksum : result, ...paytmParams});


}).catch(function(error : any){
	console.log(error);
});


    }catch(e){

    return res.send({success: false});
    }
});

export default router;