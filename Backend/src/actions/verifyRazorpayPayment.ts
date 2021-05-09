import razorpay  from './initRazorpay' 
import crypto from "crypto";


async function VerifyRazorpayPaymet (  razorpayOrderId : any, razorpayPaymentId: any, razorpaySignature:any) 
{


    // var o = await razorpay.payments.fetch(razorpayPaymentId);
    // var orderid = o["order_id"]
    //         var amount = parseInt(o["amount"]) / 100;

    var secret : string = process.env.RAZORPAY_TEST_SECRET ? process.env.RAZORPAY_TEST_SECRET : ""
   
    try{
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        let generatedSignature = hmac.digest('hex');
        let isSignatureValid = generatedSignature == razorpaySignature;
        if(isSignatureValid) return true
        else return false;

    }catch(e)
    {
        return false;
    }


}
export default VerifyRazorpayPaymet;