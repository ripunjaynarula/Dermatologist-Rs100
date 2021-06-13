var http = require("https");

export default function sendSMS(phone : any, message : any){





try{


const data = JSON.stringify({
  to: '+918077781807',
  sender : "KLRHXA",
  source : "API",
  body :"Welcome to Kaleyra! You have used free credits to send this transactional message. Explore our product for more features!",
  type : "TXN",
  template_id : "1107160129068911217"
})

console.log(data)
const options = {
  hostname: 'api.kaleyra.io',
  port: 443,
  path: '/v1/HXIN1701811715IN/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key':'A9e365cc72b428311abfdf993f4843f4e'
  }
}

const req = http.request(options, (res :any)=> {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d : any) => {
    process.stdout.write(d)
  })
})

req.on('error', (error : any) => {
  console.error(error)
})

req.write(data)
req.end()

}
catch(e)
{
  console.log(e)
}





























var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v5/flow/",
  "headers": {
    "authkey": "361829AZH8IEk38rUU60b7e81aP1",
    "content-type": "application/JSON"
  }
};

try{

var req = http.request(options, function (res:any) {
  var chunks:any = [];

  res.on("data", function (chunk:any) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write("{\n  \"flow_id\": \"EnterflowID\",\n  \"sender\": \"EnterSenderID\",\n  \"mobiles\": \"919XXXXXXXXX\",\n  \"VAR1\": \"VALUE 1\",\n  \"VAR2\": \"VALUE 2\"\n}");
req.end();



}catch(e){
  
}
}